import type { MarketingBlock } from "@/lib/marketing-site/types";
import type { SiteDictionary } from "./types";

export function blocksForPage(dict: SiteDictionary, pageId: string): MarketingBlock[] {
  return dict.blocks[pageId] ?? [];
}

export function navFromDict(dict: SiteDictionary, localePrefix: string) {
  return dict.routes.map((r) => ({
    href: r.slug === "" ? localePrefix || "/" : `${localePrefix}/${r.slug}`.replace("//", "/"),
    label: r.label,
  }));
}
