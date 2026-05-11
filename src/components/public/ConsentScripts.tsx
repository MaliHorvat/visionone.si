"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();

function loadMetaPixel(pixelId: string) {
  if (typeof window.fbq === "function") return;
  if (document.getElementById("vo-meta-pixel-snippet")) return;
  const fb = document.createElement("script");
  fb.id = "vo-meta-pixel-snippet";
  fb.text = `
(function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
`;
  document.head.appendChild(fb);
  const t = window.setInterval(() => {
    if (typeof window.fbq === "function") {
      window.clearInterval(t);
      window.fbq!("consent", "grant");
      window.fbq!("init", pixelId);
      window.fbq!("track", "PageView");
    }
  }, 50);
  window.setTimeout(() => window.clearInterval(t), 10000);
}

function ensureGa4(measurementId: string, marketing: boolean) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };

  if (!document.getElementById("vo-gtag-loader")) {
    const s = document.createElement("script");
    s.async = true;
    s.id = "vo-gtag-loader";
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(s);
  }

  window.gtag!("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });

  window.gtag!("consent", "update", {
    analytics_storage: "granted",
    ...(marketing
      ? { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" }
      : { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }),
  });
  window.gtag!("js", new Date());
  window.gtag!("config", measurementId, { anonymize_ip: true });
}

export function ConsentScripts() {
  const { consent } = useCookieConsent();
  const metaStarted = useRef(false);
  const gaConfigured = useRef(false);

  useEffect(() => {
    if (!consent.decided) return;

    if (META_PIXEL_ID) {
      if (consent.marketing) {
        if (!metaStarted.current) {
          metaStarted.current = true;
          loadMetaPixel(META_PIXEL_ID);
        } else if (typeof window.fbq === "function") {
          window.fbq("consent", "grant");
          window.fbq("track", "PageView");
        }
      } else if (typeof window.fbq === "function") {
        try {
          window.fbq("consent", "revoke");
        } catch {
          /* ignore */
        }
      }
    }

    if (GA4_ID) {
      if (consent.analytics) {
        if (!gaConfigured.current) {
          gaConfigured.current = true;
          ensureGa4(GA4_ID, consent.marketing);
        } else if (typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
            ...(consent.marketing
              ? { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" }
              : { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }),
          });
        }
      } else if (typeof window.gtag === "function") {
        try {
          window.gtag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
          });
        } catch {
          /* ignore */
        }
        gaConfigured.current = false;
      }
    }
  }, [consent.decided, consent.analytics, consent.marketing]);

  return null;
}
