"use client";

import { useCookieConsent } from "@/context/CookieConsentContext";

export function CookieSettingsLink({ label, className = "linklike" }: { label: string; className?: string }) {
  const { openPreferences } = useCookieConsent();
  return (
    <button type="button" className={className} onClick={() => openPreferences()}>
      {label}
    </button>
  );
}
