"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/types";

const LocaleContext = createContext<{ locale: Locale; dict: SiteDictionary } | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: SiteDictionary;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={{ locale, dict }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale outside LocaleProvider");
  return ctx;
}
