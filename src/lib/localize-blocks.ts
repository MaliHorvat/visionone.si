import { localizedPath, type Locale } from "@/i18n/config";
import type { MarketingBlock } from "@/lib/marketing-site/types";

function locHref(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const hashIdx = href.indexOf("#");
  const path = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  return `${localizedPath(locale, path)}${hash}`;
}

export function localizeBlocks(blocks: MarketingBlock[], locale: Locale): MarketingBlock[] {
  return blocks.map((block) => {
    switch (block.type) {
      case "hero":
        return {
          ...block,
          ctaPrimaryHref: locHref(locale, block.ctaPrimaryHref),
          ctaSecondaryHref: locHref(locale, block.ctaSecondaryHref),
        };
      case "split":
        return { ...block, linkHref: block.linkHref ? locHref(locale, block.linkHref) : "" };
      case "buttons":
        return {
          ...block,
          items: block.items.map((b) => ({ ...b, href: locHref(locale, b.href) })),
        };
      case "ctaBand":
        return {
          ...block,
          buttons: block.buttons.map((b) => ({ ...b, href: locHref(locale, b.href) })),
        };
      default:
        return block;
    }
  });
}

export function pageIdFromSlugParts(slugPath: string[]): string | null {
  const path = slugPath.join("/");
  if (!path) return "home";
  if (path === "storitve" || path === "produkti" || path === "kontakt") return path;
  return null;
}
