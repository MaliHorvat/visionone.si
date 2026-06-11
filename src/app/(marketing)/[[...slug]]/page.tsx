import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MarketingBlocksRenderer } from "@/components/public/MarketingBlocksRenderer";
import { LOCALE_META, parseLocaleFromSlug, type Locale } from "@/i18n/config";
import { blocksForPage } from "@/i18n/build-blocks";
import { getDictionary } from "@/i18n/get-dictionary";
import { getMarketingSiteContent } from "@/lib/marketing-site/fetch";
import { localizeBlocks, pageIdFromSlugParts } from "@/lib/localize-blocks";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { locale, slugPath } = parseLocaleFromSlug(slug ?? []);
  const dict = getDictionary(locale);
  const pageId = pageIdFromSlugParts(slugPath);
  const title = pageId && pageId !== "home" ? dict.routes.find((r) => r.slug === pageId)?.label : dict.meta.title;
  return {
    title: title ?? dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(
        (["sl", "en", "de", "it", "hr"] as Locale[]).map((l) => [LOCALE_META[l].hrefLang, `/${l === "sl" ? "" : l}`]),
      ),
    },
  };
}

export default async function MarketingCmsPage({ params }: Props) {
  const { slug } = await params;
  const { locale, slugPath } = parseLocaleFromSlug(slug ?? []);
  const pageId = pageIdFromSlugParts(slugPath);
  if (!pageId) notFound();

  const dict = getDictionary(locale);
  const site = await getMarketingSiteContent();
  const blocks = localizeBlocks(blocksForPage(dict, pageId), locale);

  return <MarketingBlocksRenderer blocks={blocks} site={site} locale={locale} dict={dict} pageId={pageId} />;
}
