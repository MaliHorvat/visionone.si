"use client";

import { useCookieConsent } from "@/context/CookieConsentContext";

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  const { openPreferences } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={() => openPreferences()}
      className={`text-left hover:text-[var(--vo-accent)] ${className}`}
    >
      Upravljanje piškotkov
    </button>
  );
}
