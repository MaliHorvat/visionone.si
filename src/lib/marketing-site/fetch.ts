import { DEFAULT_MARKETING_SITE_CONTENT } from "./default-content";
import { mergeMarketingContent } from "./merge";
import type { MarketingSiteContent } from "./types";

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

export async function getMarketingSiteContent(): Promise<MarketingSiteContent> {
  const url =
    process.env.MARKETING_CONTENT_URL?.trim() ||
    process.env.NEXT_PUBLIC_MARKETING_CONTENT_URL?.trim() ||
    "";
  if (!url) return DEFAULT_MARKETING_SITE_CONTENT;
  try {
    const res = await fetch(url, { next: { revalidate: 60, tags: ["marketing-site"] } });
    if (!res.ok) return DEFAULT_MARKETING_SITE_CONTENT;
    const j = (await res.json()) as { content?: unknown };
    return mergeMarketingContent(j.content ?? null);
  } catch {
    return DEFAULT_MARKETING_SITE_CONTENT;
  }
}

export function imageSrc(site: MarketingSiteContent, key: string): string | null {
  const cfg = site.images[key];
  if (!cfg?.src) return null;
  return resolveMarketingImageSrc(cfg.src);
}
