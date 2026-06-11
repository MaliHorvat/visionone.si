import type { Locale } from "./config";
import type { SiteDictionary } from "./types";
import { deUi } from "./content/de-ui";
import { en } from "./content/en";
import { hrUi } from "./content/hr-ui";
import { itUi } from "./content/it-ui";
import { sl } from "./content/sl";
import { mergeDict } from "./merge-dict";

const MAP: Record<Locale, SiteDictionary> = {
  sl,
  en,
  de: mergeDict(en, deUi),
  it: mergeDict(en, itUi),
  hr: mergeDict(en, hrUi),
};

export function getDictionary(locale: Locale): SiteDictionary {
  return MAP[locale] ?? MAP.sl;
}
