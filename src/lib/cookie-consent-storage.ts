/** Lokalno shranjeno soglasje za piškotke / sledenje (marketing stran). */

export const COOKIE_CONSENT_STORAGE_KEY = "vo_cookie_consent_v1";

export type StoredCookieConsent = {
  version: 1;
  decidedAt: string;
  analytics: boolean;
  marketing: boolean;
};

export function parseStoredConsent(raw: string | null): StoredCookieConsent | null {
  if (!raw) return null;
  try {
    const j = JSON.parse(raw) as Partial<StoredCookieConsent>;
    if (j.version !== 1) return null;
    if (typeof j.analytics !== "boolean" || typeof j.marketing !== "boolean") return null;
    if (typeof j.decidedAt !== "string") return null;
    return {
      version: 1,
      decidedAt: j.decidedAt,
      analytics: j.analytics,
      marketing: j.marketing,
    };
  } catch {
    return null;
  }
}

export function readConsentFromStorage(): StoredCookieConsent | null {
  if (typeof window === "undefined") return null;
  return parseStoredConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
}

export function writeConsentToStorage(value: Omit<StoredCookieConsent, "version" | "decidedAt"> & { decidedAt?: string }) {
  const payload: StoredCookieConsent = {
    version: 1,
    decidedAt: value.decidedAt ?? new Date().toISOString(),
    analytics: value.analytics,
    marketing: value.marketing,
  };
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event("vo-cookie-consent-changed"));
}

export function clearConsentFromStorage() {
  localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  window.dispatchEvent(new Event("vo-cookie-consent-changed"));
}
