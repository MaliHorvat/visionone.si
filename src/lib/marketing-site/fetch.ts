import { DEFAULT_MARKETING_SITE_CONTENT } from "./default-content";
import { buildNavLinks, findRouteBySlugPath, routePublicPath } from "./helpers";
import { mergeMarketingContent } from "./merge";
import type { MarketingSiteContent } from "./types";

export { buildNavLinks, findRouteBySlugPath, routePublicPath };

/** Osnova URL za slike naložene prek portala (/marketing/...). */
export function getMarketingMediaBase(): string {
  const base =
    process.env.MARKETING_MEDIA_BASE?.trim() ||
    process.env.NEXT_PUBLIC_MARKETING_MEDIA_BASE?.trim() ||
    process.env.NEXT_PUBLIC_PORTAL_URL?.trim() ||
    "";
  return base.replace(/\/$/, "");
}

export function resolveMarketingImageSrc(src: string): string {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/marketing/")) {
    const base = getMarketingMediaBase();
    return base ? `${base}${src}` : src;
  }
  return src.startsWith("/") ? src : `/${src}`;
}

/** Realistične fotografije — CMS naj ne obdrži starih AI/stock overlay slik. */
const REALISTIC_PHOTOS: Record<string, string> = {
  MARKETING_IMG_HERO: "/images/cctv.jpg",
  MARKETING_IMG_CCTV: "/images/warehouse.jpg",
  MARKETING_IMG_DOMOV_ZAKAJ_INTRO: "/images/noc.jpg",
  MARKETING_IMG_DOMOV_KAJ_NUDIMO: "/images/warehouse.jpg",
  MARKETING_IMG_DOMOV_PODPORA: "/images/tech.jpg",
  MARKETING_IMG_STORITVE_ALARM: "/images/alarm.jpg",
  MARKETING_IMG_STORITVE_POZAR: "/images/fire.jpg",
  MARKETING_IMG_STORITVE_DOMOFON: "/images/intercom.jpg",
  MARKETING_IMG_STORITVE_MREZA: "/images/cabling.jpg",
  MARKETING_IMG_STORITVE_WIFI: "/images/office.jpg",
  MARKETING_IMG_STORITVE_SERVIS: "/images/electrical.jpg",
  MARKETING_IMG_STORITVE_OSTALO: "/images/tech.jpg",
};

export function imageSrc(site: MarketingSiteContent, key: string): string | null {
  if (REALISTIC_PHOTOS[key]) return REALISTIC_PHOTOS[key];
  const cfg = site.images[key];
  if (!cfg?.src) return null;
  return resolveMarketingImageSrc(cfg.src);
}

const CMS_REVALIDATE_SEC = Number(process.env.MARKETING_CONTENT_REVALIDATE_SEC ?? "15") || 15;

export async function getMarketingSiteContent(): Promise<MarketingSiteContent> {
  const url =
    process.env.MARKETING_CONTENT_URL?.trim() ||
    process.env.NEXT_PUBLIC_MARKETING_CONTENT_URL?.trim() ||
    "";
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[marketing] MARKETING_CONTENT_URL ni nastavljen — prikazane so privzete vsebine.");
    }
    return DEFAULT_MARKETING_SITE_CONTENT;
  }
  try {
    const res = await fetch(url, {
      next: { revalidate: CMS_REVALIDATE_SEC, tags: ["marketing-site"] },
    });
    if (!res.ok) {
      console.warn(`[marketing] API ${url} → ${res.status}, uporabljam privzete vsebine.`);
      return DEFAULT_MARKETING_SITE_CONTENT;
    }
    const j = (await res.json()) as { content?: unknown };
    return mergeMarketingContent(j.content ?? null);
  } catch (e) {
    console.warn("[marketing] Napaka pri branju CMS:", e);
    return DEFAULT_MARKETING_SITE_CONTENT;
  }
}

