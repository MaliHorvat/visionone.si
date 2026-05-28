import type { Metadata } from "next";
import { PageHero } from "@/components/public/PageHero";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Pogovorimo se o vašem objektu"
        description="Pišite nam za ogled lokacije, ponudbo ali hitri servis. Odgovorimo v najkrajšem možnem času."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,320px)]">
          <ContactForm />

          <div className="vo-card-hover rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)] lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-lg font-bold text-[var(--vo-fg)]">E-pošta</h2>
            <p className="mt-3 text-sm text-[var(--vo-muted)]">Za ponudbe, vprašanja in dogovor o ogledu nam pišite na:</p>
            <a
              className="mt-4 inline-block break-all text-lg font-bold text-[var(--vo-accent)] hover:underline sm:break-normal"
              href="mailto:info@visionone.si"
            >
              info@visionone.si
            </a>
            <p className="mt-6 rounded-xl bg-[var(--vo-accent-muted)] px-4 py-3 text-xs leading-relaxed text-[var(--vo-muted)]">
              Tip: v obrazcu pod <strong className="text-[var(--vo-fg)]">#ponudba</strong> opišite število kamer, tip objekta in
              ali potrebujete tudi alarm ali omrežje.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
