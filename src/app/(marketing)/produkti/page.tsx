import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImageSlot } from "@/components/public/MarketingImageSlot";
import { PageHero } from "@/components/public/PageHero";
import { ProductShowcaseCard } from "@/components/public/ProductShowcaseCard";
import { getMarketingSiteContent, imageSrc } from "@/lib/marketing-site/fetch";

export const metadata: Metadata = {
  title: "Produkti",
  description: "Programska oprema in rešitve VisionOne — vključno z VisionOne portalom za nadzor objektov.",
};

export default async function ProduktiPage() {
  const site = await getMarketingSiteContent();
  const produkti = site.pages.produkti;
  const hero = produkti?.hero && "description" in produkti.hero ? produkti.hero : null;
  const imgPortal = imageSrc(site, "MARKETING_IMG_PORTAL_SOFTWARE") ?? "/vo-produkti-portal-card.png";
  const imgPod = imageSrc(site, "MARKETING_IMG_PRODUKTI_POD_KARTO");

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Produkti"}
        title={hero?.title ?? "Rešitve, ki jih ponujamo"}
        description={hero?.description ?? ""}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:px-6">
        <div className="space-y-16">
          <ProductShowcaseCard
            priorityImage
            imageSrc={imgPortal}
            imageAlt="Pregled nadzorne plošče in analitike na prenosniku"
            label="Produkt"
            title="VisionOne portal"
            description="Spletni portal za spremljanje videonadzora in infrastrukture: stanje kamer, snemalnikov (NVR), stikal in diskov v realnem času, opomniki, zahtevki in telemetrija z agenta na lokaciji. Namenjen je podjetjem in vzdrževalcem, ki želijo enoten pregled več objektov."
            ctaHref="/kontakt#ponudba"
            ctaLabel="Spoznajte več"
          />
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl shadow-[var(--vo-card-shadow)]">
          <MarketingImageSlot
            codeLabel="MARKETING_IMG_PRODUKTI_POD_KARTO"
            src={imgPod}
            alt="VisionOne produkti — analitika in nadzor"
            className="rounded-2xl border-0"
          />
        </div>

        <p className="mt-12 text-center text-sm text-[var(--vo-muted)]">
          Želite predstavitev portala?{" "}
          <Link href="/kontakt#ponudba" className="font-bold text-[var(--vo-accent)] hover:underline">
            Kontaktirajte nas
          </Link>
          .
        </p>
      </div>
    </>
  );
}
