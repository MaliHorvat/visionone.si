import { DEFAULT_LOCALE, isLocale, localizedPath, type Locale } from "@/i18n/config";
import { de } from "./copy/de";
import { en } from "./copy/en";
import { hr } from "./copy/hr";
import { it } from "./copy/it";
import { sl } from "./copy/sl";
import type { ServiceId, SiteCopy, TopicId } from "./copy/types";

export type { ServiceId, SiteCopy, TopicId } from "./copy/types";
export { SOFTWARE, SOFTWARE_LINKS, type SoftwareCopy, type SoftwareId } from "./copy/software";
import { SOFTWARE } from "./copy/software";

export function getSoftware(locale: Locale) {
  return SOFTWARE[locale] ?? SOFTWARE[DEFAULT_LOCALE];
}

const COPY: Record<Locale, SiteCopy> = { sl, en, de, it, hr };

export function getCopy(locale: Locale): SiteCopy {
  return COPY[locale] ?? COPY[DEFAULT_LOCALE];
}

/** Notranja povezava z jezikovno predpono (sl brez nje); ohrani #sidro in ?poizvedbo. */
export function href(locale: Locale, path: string): string {
  const cut = path.search(/[?#]/);
  const base = cut >= 0 ? path.slice(0, cut) : path;
  const rest = cut >= 0 ? path.slice(cut) : "";
  return `${localizedPath(locale, base || "/")}${rest}`;
}

export function toLocale(raw: string | null | undefined): Locale {
  return raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
}

export const PORTAL_URL = "https://portal.visionone.si";
export const SURVEY_URL = "https://anketa.visionone.si";
export const INQUIRY_URL =
  process.env.NEXT_PUBLIC_INQUIRY_URL?.trim() || "https://portal.visionone.si/api/public/inquiry";

/** Tema v obrazcu, ki se izbere, ko pridete s podstrani storitve. */
export const SERVICE_TOPIC: Record<ServiceId, TopicId> = {
  videonadzor: "cctv",
  alarm: "alarm",
  pozar: "pozar",
  domofon: "domofon",
  mreza: "mreza",
  wifi: "mreza",
  servis: "servis",
  ostalo: "general",
};

export const TOPICS: TopicId[] = ["cctv", "alarm", "pozar", "domofon", "mreza", "servis", "portal", "anketa", "razvoj", "general"];
