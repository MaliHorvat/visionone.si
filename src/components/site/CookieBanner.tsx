"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { getCopy, href } from "@/site";

export function CookieBanner({ locale }: { locale: Locale }) {
  const t = getCopy(locale).cookie;
  const { consent, acceptAll, rejectNonEssential, savePreferences, preferencesOpen, closePreferences, openPreferences } =
    useCookieConsent();
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  // izbiro preberemo iz brskalnika šele po nalaganju; do takrat pasice ne kažemo, da ne utripne
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!preferencesOpen) return;
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
    dialogRef.current?.querySelector<HTMLElement>("input,button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePreferences();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preferencesOpen, consent.analytics, consent.marketing, closePreferences]);

  if (!ready || (consent.decided && !preferencesOpen)) return null;

  if (preferencesOpen) {
    return (
      <div className="s-modal-backdrop" onClick={(e) => e.target === e.currentTarget && closePreferences()}>
        <div className="s-modal" role="dialog" aria-modal="true" aria-labelledby="s-cookie-title" ref={dialogRef}>
          <h2 id="s-cookie-title">{t.prefsTitle}</h2>
          <p>{t.prefsBody}</p>
          <ul className="s-toggles">
            <li>
              <div>
                <strong>{t.necessary}</strong>
                <span>{t.necessaryBody}</span>
              </div>
              <em>{t.alwaysOn}</em>
            </li>
            <li>
              <label htmlFor="s-ck-analytics">
                <strong>{t.analytics}</strong>
                <span>{t.analyticsBody}</span>
              </label>
              <input id="s-ck-analytics" type="checkbox" role="switch" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            </li>
            <li>
              <label htmlFor="s-ck-marketing">
                <strong>{t.marketing}</strong>
                <span>{t.marketingBody}</span>
              </label>
              <input id="s-ck-marketing" type="checkbox" role="switch" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            </li>
          </ul>
          <div className="s-btns end">
            <button type="button" className="s-btn s-btn-line" onClick={() => closePreferences()}>
              {consent.decided ? t.close : t.cancel}
            </button>
            <button type="button" className="s-btn s-btn-primary" onClick={() => savePreferences({ analytics, marketing })}>
              {t.save}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="s-cookie" role="region" aria-label={t.title}>
      <div className="s-wrap">
        <p>
          {t.body}{" "}
          <Link href={href(locale, "/piskotki")} className="s-link">
            {t.policy}
          </Link>
        </p>
        <div className="s-btns">
          <button type="button" className="s-btn s-btn-ghost" onClick={() => openPreferences()}>
            {t.settings}
          </button>
          <button type="button" className="s-btn s-btn-line" onClick={() => rejectNonEssential()}>
            {t.reject}
          </button>
          <button type="button" className="s-btn s-btn-primary" onClick={() => acceptAll()}>
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
