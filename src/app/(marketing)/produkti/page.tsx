import type { Metadata } from "next";
import Link from "next/link";
import { ProductShowcaseCard } from "@/components/public/ProductShowcaseCard";
import { MARKETING_IMG_PORTAL_SOFTWARE } from "@/lib/marketing-images";

export const metadata: Metadata = {
  title: "Produkti",
  description: "Programska oprema in rešitve VisionOne — vključno z VisionOne portalom za nadzor objektov.",
};

export default function ProduktiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-[var(--vo-accent)]">Produkti</p>
      <h1 className="mt-2 text-3xl font-bold text-[var(--vo-fg)] md:text-4xl">Rešitve, ki jih ponujamo</h1>
      <p className="mt-4 max-w-2xl text-[var(--vo-muted)]">
        Tukaj objavljamo lastne produkte in platforme. Za montažo, alarmne sisteme in omrežne storitve glejte tudi
        razdelek{" "}
        <Link href="/storitve" className="font-medium text-[var(--vo-accent)] hover:underline">
          Storitve
        </Link>
        .
      </p>

      <div className="mt-14 space-y-16">
        <ProductShowcaseCard
          priorityImage
          imageSrc={MARKETING_IMG_PORTAL_SOFTWARE}
          imageAlt="Pregled nadzorne plošče in analitike na prenosniku"
          label="Produkt"
          title="VisionOne portal"
          description="Spletni portal za spremljanje videonadzora in infrastrukture: stanje kamer, snemalnikov (NVR), stikal in diskov v realnem času, opomniki, zahtevki in telemetrija z agenta na lokaciji. Namenjen je podjetjem in vzdrževalcem, ki želijo enoten pregled več objektov."
          ctaHref="/kontakt#ponudba"
          ctaLabel="Spoznajte več"
        />
      </div>

      <p className="mt-12 text-center text-sm text-[var(--vo-muted)]">
        Želite predstavitev portala?{" "}
        <Link href="/kontakt#ponudba" className="font-semibold text-[var(--vo-accent)] hover:underline">
          Kontaktirajte nas
        </Link>
        .
      </p>
    </div>
  );
}
