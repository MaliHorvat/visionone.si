"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearConsentFromStorage,
  readConsentFromStorage,
  writeConsentToStorage,
  type StoredCookieConsent,
} from "@/lib/cookie-consent-storage";

export type CookieConsent = {
  /** Uporabnik je že izbral (banner ni več obvezen). */
  decided: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultConsent: CookieConsent = {
  decided: false,
  analytics: false,
  marketing: false,
};

function storedToConsent(s: StoredCookieConsent | null): CookieConsent {
  if (!s) return defaultConsent;
  return {
    decided: true,
    analytics: s.analytics,
    marketing: s.marketing,
  };
}

type Ctx = {
  consent: CookieConsent;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
  resetConsent: () => void;
  /** Odpri modal za spreminjanje (iz noge / strani piškotki). */
  openPreferences: () => void;
  preferencesOpen: boolean;
  closePreferences: () => void;
};

const CookieConsentContext = createContext<Ctx | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  useEffect(() => {
    setConsent(storedToConsent(readConsentFromStorage()));
  }, []);

  useEffect(() => {
    const onChange = () => setConsent(storedToConsent(readConsentFromStorage()));
    window.addEventListener("vo-cookie-consent-changed", onChange);
    return () => window.removeEventListener("vo-cookie-consent-changed", onChange);
  }, []);

  const acceptAll = useCallback(() => {
    writeConsentToStorage({ analytics: true, marketing: true });
    setConsent(storedToConsent(readConsentFromStorage()));
    setPreferencesOpen(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    writeConsentToStorage({ analytics: false, marketing: false });
    setConsent(storedToConsent(readConsentFromStorage()));
    setPreferencesOpen(false);
  }, []);

  const savePreferences = useCallback((prefs: { analytics: boolean; marketing: boolean }) => {
    writeConsentToStorage({ analytics: prefs.analytics, marketing: prefs.marketing });
    setConsent(storedToConsent(readConsentFromStorage()));
    setPreferencesOpen(false);
  }, []);

  const resetConsent = useCallback(() => {
    clearConsentFromStorage();
    setConsent(defaultConsent);
    setPreferencesOpen(true);
  }, []);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo(
    () => ({
      consent,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      resetConsent,
      openPreferences,
      preferencesOpen,
      closePreferences,
    }),
    [
      consent,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      resetConsent,
      openPreferences,
      preferencesOpen,
      closePreferences,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const v = useContext(CookieConsentContext);
  if (!v) throw new Error("useCookieConsent outside CookieConsentProvider");
  return v;
}
