"use client";

import { useEffect } from "react";
import { syncDocumentThemeClassFromStorage } from "@/components/theme/ThemeProvider";

/** Odstrani `dark` z `<html>`; ob zapuščanju portala obnovi shranjeno temo (javna stran). */
export function PortalForceLightDocument() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    return () => {
      syncDocumentThemeClassFromStorage();
    };
  }, []);
  return null;
}
