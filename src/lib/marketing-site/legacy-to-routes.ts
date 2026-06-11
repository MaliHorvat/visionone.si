import type { MarketingBlock, MarketingPageContent, MarketingPageId, MarketingRoute, MarketingSiteContent } from "./types";
import { createBlock } from "./helpers";

function pageHeroFrom(content: MarketingPageContent): MarketingBlock | null {
  const h = content.hero;
  if (!h) return null;
  if ("trustPills" in h) return null;
  return {
    id: "blk_page_hero",
    type: "pageHero",
    eyebrow: h.eyebrow,
    title: h.title,
    description: h.description,
  };
}

function blocksFromLegacy(pageId: MarketingPageId, content: MarketingPageContent): MarketingBlock[] {
  const blocks: MarketingBlock[] = [];
  const homeHero = content.hero;
  if (pageId === "home" && homeHero && "trustPills" in homeHero) {
    blocks.push({
      id: "blk_home_hero",
      type: "hero",
      eyebrow: homeHero.eyebrow,
      title: homeHero.title,
      titleHighlight: homeHero.titleHighlight,
      description: homeHero.description,
      imageKey: "MARKETING_IMG_HERO",
      ctaPrimary: homeHero.ctaPrimary,
      ctaPrimaryHref: "/kontakt#ponudba",
      ctaSecondary: homeHero.ctaSecondary,
      ctaSecondaryHref: "/produkti",
      trustPills: homeHero.trustPills,
    });
  } else {
    const ph = pageHeroFrom(content);
    if (ph) blocks.push(ph);
  }
  if (content.splitCctv) {
    const splitImageKey =
      pageId === "produkti" ? "MARKETING_IMG_PORTAL_SOFTWARE" : "MARKETING_IMG_CCTV";
    blocks.push({
      id: `blk_split_${pageId}`,
      type: "split",
      imageKey: splitImageKey,
      kicker: content.splitCctv.kicker ?? "",
      title: content.splitCctv.title,
      body: content.splitCctv.body,
      linkLabel: content.splitCctv.linkLabel ?? "",
      linkHref: content.splitCctv.linkHref ?? "",
    });
  }
  if (content.whyIntro && pageId === "home") {
    blocks.push({
      id: "blk_why_intro",
      type: "split",
      imageKey: "MARKETING_IMG_DOMOV_ZAKAJ_INTRO",
      kicker: content.whyIntro.kicker ?? "",
      title: content.whyIntro.title,
      body: content.whyIntro.body,
      linkLabel: content.whyIntro.linkLabel ?? "Oglej si portal",
      linkHref: content.whyIntro.linkHref ?? "/produkti",
    });
  }
  if (content.stats?.length) {
    blocks.push({ id: `blk_stats_${pageId}`, type: "stats", items: content.stats });
  }
  if (content.cards?.items.length) {
    blocks.push({
      id: `blk_cards_${pageId}`,
      type: "cards",
      kicker: content.cards.kicker,
      title: content.cards.title,
      subtitle: content.cards.subtitle,
      items: content.cards.items,
    });
  }
  if (content.serviceBlocks?.length) {
    blocks.push({ id: `blk_svc_${pageId}`, type: "serviceBlocks", items: content.serviceBlocks });
  }
  if (pageId === "kontakt") {
    blocks.push({
      id: "blk_contact",
      type: "contactForm",
      intro: content.contactIntro ?? "",
    });
  }
  if (pageId === "home") {
    blocks.push({
      id: "blk_home_cta",
      type: "ctaBand",
      title: "Pripravljeni na varnejši objekt?",
      body: "Brezplačen posvet in okvirna ponudba — odgovorimo v enem delovnem dnevu.",
      buttons: [
        {
          id: "btn_home_cta",
          label: "Zahtevajte ponudbo",
          href: "/kontakt#ponudba",
          variant: "primary",
        },
        {
          id: "btn_home_cta2",
          label: "Poglej storitve",
          href: "/storitve",
          variant: "outline",
        },
      ],
    });
  }
  if (pageId === "storitve" || pageId === "produkti") {
    blocks.push({
      id: `blk_${pageId}_cta`,
      type: "ctaBand",
      title: pageId === "produkti" ? "Želite predstavitev portala?" : "Potrebujete ponudbo ali ogled lokacije?",
      body:
        pageId === "produkti"
          ? "Povežemo se z vami in pokažemo, kako portal deluje na vašem tipu objekta."
          : "Na kratko opišite objekt in želene sisteme — odgovorimo z naslednjimi koraki.",
      buttons: [
        {
          id: `btn_${pageId}_cta`,
          label: pageId === "produkti" ? "Rezervirajte klic" : "Kontakt in ponudba",
          href: "/kontakt#ponudba",
          variant: "primary",
        },
      ],
    });
  }
  return blocks;
}

/** Zgradi routes iz legacy pages, če v CMS še ni routes. */
export function routesFromLegacyContent(content: Pick<MarketingSiteContent, "pages">): MarketingRoute[] {
  const defs: { id: string; slug: string; label: string; pageId: MarketingPageId; order: number }[] = [
    { id: "route_home", slug: "", label: "Domov", pageId: "home", order: 0 },
    { id: "route_storitve", slug: "storitve", label: "Storitve", pageId: "storitve", order: 1 },
    { id: "route_produkti", slug: "produkti", label: "Produkti", pageId: "produkti", order: 2 },
    { id: "route_kontakt", slug: "kontakt", label: "Kontakt", pageId: "kontakt", order: 3 },
  ];
  return defs.map((d) => ({
    id: d.id,
    slug: d.slug,
    label: d.label,
    parentId: null,
    showInNav: true,
    navOrder: d.order,
    published: true,
    blocks: blocksFromLegacy(d.pageId, content.pages[d.pageId] ?? {}),
  }));
}
