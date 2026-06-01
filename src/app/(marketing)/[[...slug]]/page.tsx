import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MarketingBlocksRenderer } from "@/components/public/MarketingBlocksRenderer";
import { findRouteBySlugPath, getMarketingSiteContent } from "@/lib/marketing-site/fetch";

/** Vedno beri CMS ob zahtevi (ne zamrzni vsebine ob buildu). */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getMarketingSiteContent();
  const route = findRouteBySlugPath(slug ?? [], site.routes);
  if (!route) return { title: "Stran ni najdena" };
  return { title: route.label };
}

export default async function MarketingCmsPage({ params }: Props) {
  const { slug } = await params;
  const site = await getMarketingSiteContent();
  const route = findRouteBySlugPath(slug ?? [], site.routes);
  if (!route) notFound();

  return <MarketingBlocksRenderer blocks={route.blocks} site={site} />;
}
