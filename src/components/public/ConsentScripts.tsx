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
/** Google Ads / konverzije (gtag) — npr. AW-18157157679 */
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();

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

function ensureDataLayerAndGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
}

function loadGtagJsOnce(firstId: string) {
  if (document.getElementById("vo-gtag-loader")) return;
  const s = document.createElement("script");
  s.async = true;
  s.id = "vo-gtag-loader";
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(firstId)}`;
  document.head.appendChild(s);
}

/**
 * gtag.js: GA4 ob soglasju za analitiko, Google Ads (AW-) ob soglasju za marketing.
 * Skripta se naloži enkrat; prvi parameter v URL je GA4 (če je aktiven), sicer AW.
 */
function syncGtag(opts: { analytics: boolean; marketing: boolean }) {
  const runGa = Boolean(GA4_ID && opts.analytics);
  const runAds = Boolean(GOOGLE_ADS_ID && opts.marketing);

  if (!runGa && !runAds) {
    if (typeof window.gtag === "function") {
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
    }
    return;
  }

  ensureDataLayerAndGtag();

  const loaderId = runGa ? GA4_ID! : GOOGLE_ADS_ID!;
  loadGtagJsOnce(loaderId);

  window.gtag!("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });

  window.gtag!("consent", "update", {
    analytics_storage: opts.analytics ? "granted" : "denied",
    ...(opts.marketing
      ? { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" }
      : { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }),
  });

  window.gtag!("js", new Date());

  if (runGa) {
    window.gtag!("config", GA4_ID!, { anonymize_ip: true });
  }
  if (runAds) {
    window.gtag!("config", GOOGLE_ADS_ID!);
  }
}

export function ConsentScripts() {
  const { consent } = useCookieConsent();
  const metaStarted = useRef(false);
  const gtagSynced = useRef(false);

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

    if (GA4_ID || GOOGLE_ADS_ID) {
      if (consent.analytics || consent.marketing) {
        if (!gtagSynced.current) {
          gtagSynced.current = true;
          syncGtag({ analytics: consent.analytics, marketing: consent.marketing });
        } else if (typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: consent.analytics ? "granted" : "denied",
            ...(consent.marketing
              ? { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" }
              : { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }),
          });
          if (GA4_ID && consent.analytics) {
            window.gtag("config", GA4_ID, { anonymize_ip: true });
          }
          if (GOOGLE_ADS_ID && consent.marketing) {
            window.gtag("config", GOOGLE_ADS_ID);
          }
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
        gtagSynced.current = false;
      }
    }
  }, [consent.decided, consent.analytics, consent.marketing]);

  return null;
}
