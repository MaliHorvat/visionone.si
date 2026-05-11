"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

export function CookieBanner() {
  const { consent, acceptAll, rejectNonEssential, savePreferences, preferencesOpen, closePreferences, openPreferences } =
    useCookieConsent();
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (preferencesOpen) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [preferencesOpen, consent.analytics, consent.marketing]);

  if (consent.decided && !preferencesOpen) return null;

  return (
    <>
      {!consent.decided && !preferencesOpen ? (
        <div
          className="vo-safe-bottom fixed inset-x-0 bottom-0 z-[100] border-t border-[var(--vo-border)] bg-[var(--vo-surface)] p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] sm:p-4 md:p-5"
          role="dialog"
          aria-label="Piškotki in zasebnost"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 text-sm text-[var(--vo-fg)]">
              <p className="font-semibold">Piškotki in sledenje</p>
              <p className="mt-1 text-[var(--vo-muted)]">
                Nujne piškotke uporabljamo za delovanje strani. Analitiko in marketing (npr. Meta, Google) naložimo
                šele, če soglašate. Več v{" "}
                <Link href="/piskotki" className="text-[var(--vo-accent)] hover:underline">
                  politiki piškotkov
                </Link>{" "}
                in{" "}
                <Link href="/zasebnost" className="text-[var(--vo-accent)] hover:underline">
                  zasebnosti
                </Link>
                .
              </p>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => openPreferences()}
                className="min-h-11 w-full rounded-lg border border-[var(--vo-border)] px-4 py-2.5 text-sm font-medium text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)] sm:w-auto sm:min-h-10 sm:py-2"
              >
                Nastavitve
              </button>
              <button
                type="button"
                onClick={() => rejectNonEssential()}
                className="min-h-11 w-full rounded-lg border border-[var(--vo-border)] px-4 py-2.5 text-sm font-medium text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)] sm:w-auto sm:min-h-10 sm:py-2"
              >
                Zavrni ne-nujne
              </button>
              <button
                type="button"
                onClick={() => acceptAll()}
                className="min-h-11 w-full rounded-lg bg-[var(--vo-accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--vo-accent-hover)] sm:w-auto sm:min-h-10 sm:py-2"
              >
                Sprejmi vse
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {preferencesOpen ? (
        <div className="fixed inset-0 z-[101] flex items-end justify-center bg-black/50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4">
          <div
            className="max-h-[min(90dvh,32rem)] w-full max-w-lg overflow-y-auto overscroll-y-contain rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-4 shadow-xl sm:max-h-[90vh] sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vo-cookie-prefs-title"
          >
            <h2 id="vo-cookie-prefs-title" className="text-lg font-semibold text-[var(--vo-fg)]">
              Nastavitve piškotkov
            </h2>
            <p className="mt-2 text-sm text-[var(--vo-muted)]">
              Izberite kategorije. Nujnih piškotkov ne morete izklopiti (seja, varnost, shranjena izbira soglasja).
            </p>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start justify-between gap-3 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-3">
                <div>
                  <p className="font-medium text-[var(--vo-fg)]">Nujno</p>
                  <p className="text-xs text-[var(--vo-muted)]">Delovanje strani in shranjevanje vaše izbire.</p>
                </div>
                <span className="text-xs font-semibold text-[var(--vo-ok)]">Vklopljeno</span>
              </li>
              <li className="flex items-start justify-between gap-3 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-3">
                <div className="min-w-0">
                  <p className="font-medium text-[var(--vo-fg)]">Analitika</p>
                  <p className="text-xs text-[var(--vo-muted)]">Google Analytics 4 — obiskanost in napake (če je v .env nastavljen ID).</p>
                </div>
                <label className="flex shrink-0 items-center gap-2">
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4" />
                </label>
              </li>
              <li className="flex items-start justify-between gap-3 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-3">
                <div className="min-w-0">
                  <p className="font-medium text-[var(--vo-fg)]">Marketing / družbena omrežja</p>
                  <p className="text-xs text-[var(--vo-muted)]">
                    Meta Pixel in podobno — merjenje oglasov in remarketing (če je v .env nastavljen ID).
                  </p>
                </div>
                <label className="flex shrink-0 items-center gap-2">
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-4 w-4" />
                </label>
              </li>
            </ul>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() => closePreferences()}
                className="min-h-11 w-full rounded-lg border border-[var(--vo-border)] px-4 py-2.5 text-sm font-medium sm:w-auto sm:min-h-10 sm:py-2"
              >
                {consent.decided ? "Zapri" : "Prekliči"}
              </button>
              <button
                type="button"
                onClick={() => savePreferences({ analytics, marketing })}
                className="min-h-11 w-full rounded-lg bg-[var(--vo-accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--vo-accent-hover)] sm:w-auto sm:min-h-10 sm:py-2"
              >
                Shrani izbiro
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-[var(--vo-muted)]">
              <Link href="/zasebnost" className="text-[var(--vo-accent)] hover:underline">
                Zasebnost
              </Link>
              {" · "}
              <Link href="/piskotki" className="text-[var(--vo-accent)] hover:underline">
                Piškotki
              </Link>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
