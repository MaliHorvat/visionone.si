import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/site/pages/HomePage";
import { ServicesPage } from "@/components/site/pages/ServicesPage";
import { PortalPage, ProductsPage, SurveyPage } from "@/components/site/pages/ProductPages";
import { ContactPage } from "@/components/site/pages/ContactPage";
import { CookiesPage, PrivacyPage } from "@/components/site/pages/LegalPages";
import { LOCALE_META, LOCALES, parseLocaleFromSlug, type Locale } from "@/i18n/config";
import { getCopy, href, TOPICS, type SiteCopy, type TopicId } from "@/site";

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type PageKey = "home" | keyof SiteCopy["meta"]["pages"];

const ROUTES: Record<string, PageKey> = {
  "": "home",
  storitve: "storitve",
  produkti: "produkti",
  "produkti/portal": "portal",
  "produkti/anketa": "anketa",
  kontakt: "kontakt",
  zasebnost: "zasebnost",
  piskotki: "piskotki",
};

function resolve(slug: string[] | undefined): { locale: Locale; path: string; page: PageKey | undefined } {
  const { locale, slugPath } = parseLocaleFromSlug(slug);
  const path = slugPath.join("/");
  return { locale, path, page: ROUTES[path] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, path, page } = resolve((await params).slug);
  if (!page) return {};
  const t = getCopy(locale);
  const m = page === "home" ? { title: t.meta.title, description: t.meta.description } : t.meta.pages[page];
  const languages = Object.fromEntries(LOCALES.map((l) => [LOCALE_META[l].hrefLang, href(l, `/${path}`)]));
  return {
    title: page === "home" ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: { canonical: href(locale, `/${path}`), languages },
    openGraph: {
      title: m.title,
      description: m.description,
      siteName: "VisionOne",
      locale: LOCALE_META[locale].hrefLang,
      type: "website",
      images: [{ url: "/img/foto/kamere.webp", width: 1400, height: 934 }],
    },
  };
}

function topicFrom(sp: Record<string, string | string[] | undefined>): TopicId {
  const raw = [sp.tema, sp.product].flat().find(Boolean);
  return raw && (TOPICS as string[]).includes(raw) ? (raw as TopicId) : "cctv";
}

export default async function Page({ params, searchParams }: Props) {
  const { locale, page } = resolve((await params).slug);
  switch (page) {
    case "home":
      return <HomePage locale={locale} />;
    case "storitve":
      return <ServicesPage locale={locale} />;
    case "produkti":
      return <ProductsPage locale={locale} />;
    case "portal":
      return <PortalPage locale={locale} />;
    case "anketa":
      return <SurveyPage locale={locale} />;
    case "kontakt":
      return <ContactPage locale={locale} topic={topicFrom(await searchParams)} />;
    case "zasebnost":
      return <PrivacyPage locale={locale} />;
    case "piskotki":
      return <CookiesPage locale={locale} />;
    default:
      notFound();
  }
}
