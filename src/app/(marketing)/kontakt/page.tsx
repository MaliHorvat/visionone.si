import type { Metadata } from "next";
import { MarketingImageSlot } from "@/components/public/MarketingImageSlot";
import { MARKETING_IMG_KONTAKT_UVOD } from "@/lib/marketing-images";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:px-6">
      <h1 className="text-balance text-3xl font-bold text-[var(--vo-fg)]">Kontakt</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--vo-muted)]">
        Pišite nam za ogled, ponudbo ali intervencijo. Kontakt je po e-pošti.
      </p>

      {/* SLIKA: MARKETING_IMG_KONTAKT_UVOD — marketing-images.ts */}
      <div className="mt-8">
        <MarketingImageSlot
          codeLabel="MARKETING_IMG_KONTAKT_UVOD"
          src={MARKETING_IMG_KONTAKT_UVOD}
          alt="VisionOne — kontakt"
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,320px)]">
        <ContactForm />

        <div className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)] lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">E-pošta</h2>
          <p className="mt-3 text-sm text-[var(--vo-muted)]">
            Za ponudbe, vprašanja in dogovor o ogledu nam pišite na:
          </p>
          <a
            className="mt-4 inline-block break-all text-lg font-semibold text-[var(--vo-accent)] hover:underline sm:break-normal"
            href="mailto:info@visionone.si"
          >
            info@visionone.si
          </a>
        </div>
      </div>
    </div>
  );
}
