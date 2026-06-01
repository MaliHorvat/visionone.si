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

export function imageSrc(site: MarketingSiteContent, key: string): string | null {
  const cfg = site.images[key];
  if (!cfg?.src) return null;
  return resolveMarketingImageSrc(cfg.src);
}
