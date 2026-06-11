export const LOCALES = ["sl", "en", "de", "it", "hr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "sl";

export const LOCALE_META: Record<
  Locale,
  { label: string; native: string; hrefLang: string; flag: string }
> = {
  sl: { label: "Slovenščina", native: "SL", hrefLang: "sl-SI", flag: "🇸🇮" },
  en: { label: "English", native: "EN", hrefLang: "en", flag: "🇬🇧" },
  de: { label: "Deutsch", native: "DE", hrefLang: "de", flag: "🇩🇪" },
  it: { label: "Italiano", native: "IT", hrefLang: "it", flag: "🇮🇹" },
  hr: { label: "Hrvatski", native: "HR", hrefLang: "hr", flag: "🇭🇷" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** sl brez predpone; ostali z /en, /de, … */
export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized === "//" ? "/" : normalized;
  if (normalized === "/" || normalized === "") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function parseLocaleFromSlug(slug: string[] | undefined): { locale: Locale; slugPath: string[] } {
  const parts = slug ?? [];
  if (parts.length > 0 && isLocale(parts[0])) {
    return { locale: parts[0], slugPath: parts.slice(1) };
  }
  return { locale: DEFAULT_LOCALE, slugPath: parts };
}

export function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const lower = acceptLanguage.toLowerCase();
  if (lower.includes("sl")) return "sl";
  if (lower.includes("de")) return "de";
  if (lower.includes("it")) return "it";
  if (lower.includes("hr")) return "hr";
  return "en";
}
