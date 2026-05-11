"use client";

import { useEffect } from "react";

export const VISIONONE_THEME_STORAGE_KEY = "visionone_theme";

/**
 * Stran je vedno v svetli temi: odstrani `dark` z `<html>` in staro shranjeno izbiro teme.
 * (Prejšnji klic `syncDocumentThemeClassFromStorage` — obdržimo kot no-op združljivost.)
 */
export function syncDocumentThemeClassFromStorage() {
  if (typeof document === "undefined") return;
  try {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem(VISIONONE_THEME_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    syncDocumentThemeClassFromStorage();
  }, []);

  return <>{children}</>;
}
