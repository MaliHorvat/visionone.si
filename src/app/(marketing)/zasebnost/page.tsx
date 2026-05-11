import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zasebnost",
  description: "Politika zasebnosti spletne strani VisionOne.",
};

export default function ZasebnostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold text-[var(--vo-fg)]">Politika zasebnosti</h1>
      <p className="mt-2 text-sm text-[var(--vo-muted)]">
        Zadnja posodobitev: {new Date().toLocaleDateString("sl-SI")}. Besedilo je informativno — za pravno revizijo
        se obrnite na odvetnika.
      </p>

      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-sm text-[var(--vo-muted)] [&_strong]:text-[var(--vo-fg)]">
        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Upravljavec</h2>
          <p>
            VisionOne (kontakt:{" "}
            <a href="mailto:info@visionone.si" className="text-[var(--vo-accent)] hover:underline">
              info@visionone.si
            </a>
            ).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Katere podatke obdelujemo</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Kontaktni obrazec:</strong> podatki, ki jih sami vnesete (npr. ime, e-pošta, sporočilo).
            </li>
            <li>
              <strong>Piškotki in orodja tretjih oseb:</strong> samo, če za to date soglasje — npr. Google Analytics 4,
              Meta Pixel (oglaševanje / merjenje). ID-ji se nastavijo v okolju strežnika (
              <code className="rounded bg-[var(--vo-surface-2)] px-1">NEXT_PUBLIC_GA4_MEASUREMENT_ID</code>,{" "}
              <code className="rounded bg-[var(--vo-surface-2)] px-1">NEXT_PUBLIC_META_PIXEL_ID</code>).
            </li>
            <li>
              <strong>Prijava v portal (Clerk):</strong> če uporabljate prijavo prek Clerk, veljajo tudi njihovi pogoji.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Pravna podlaga</h2>
          <p>
            Obdelava zaradi povpraševanja: pogosto <strong>zakoniti interes</strong> ali <strong>pogodba</strong> v
            pripravi. Soglasje za ne-nujne piškotke in sledenje: <strong>soglasje</strong> (izbira v bannerju).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Hramba</h2>
          <p>
            Hramba je omejena na čas, ki je potreben za odgovor in morebitno sklenitev posla, razen če zakon zahteva
            daljše obdobje.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Vaše pravice</h2>
          <p>
            Pravica do dostopa, popravka, izbrisa, omejitve obdelave, ugovora in prenosljivosti (kjer velja). Za
            uveljavitev pišite na zgornji e-naslov.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Piškotki</h2>
          <p>
            Podrobnosti:{" "}
            <Link href="/piskotki" className="text-[var(--vo-accent)] hover:underline">
              Politika piškotkov
            </Link>
            . Izbiro lahko kadar koli spremenite prek povezave &quot;Upravljanje piškotkov&quot; v nogi strani.
          </p>
        </section>
      </div>
    </div>
  );
}
