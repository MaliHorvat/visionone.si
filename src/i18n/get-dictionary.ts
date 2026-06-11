import type { Locale } from "./config";
import type { SiteDictionary } from "./types";
import { de } from "./content/de";
import { en } from "./content/en";
import { hr } from "./content/hr";
import { it } from "./content/it";
import { sl } from "./content/sl";

const MAP: Record<Locale, SiteDictionary> = {
  sl,
  en,
  de,
  it,
  hr,
};

export function getDictionary(locale: Locale): SiteDictionary {
  return MAP[locale] ?? MAP.sl;
}
