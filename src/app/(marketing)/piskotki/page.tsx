import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/public/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Piškotki",
  description: "Politika piškotkov in orodij za sledenje na visionone.si.",
};

export default function PiskotkiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold text-[var(--vo-fg)]">Politika piškotkov</h1>
      <p className="mt-2 text-sm text-[var(--vo-muted)]">
        Ta stran pojasnjuje, kaj lahko naložimo glede na vašo izbiro v piškotnem bannerju.
      </p>

      <div className="mt-8 rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-4 text-sm text-[var(--vo-muted)]">
        <p className="font-medium text-[var(--vo-fg)]">Spremeni izbiro</p>
        <p className="mt-1">Odprite nastavitve soglasja kadar koli:</p>
        <p className="mt-2">
          <CookieSettingsButton className="text-[var(--vo-accent)] underline" />
        </p>
      </div>

      <div className="mt-8 space-y-6 text-sm text-[var(--vo-muted)] [&_strong]:text-[var(--vo-fg)]">
        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">1. Nujno (vedno)</h2>
          <p>
            Shranjujemo vašo izbiro soglasja v brskalniku (<code className="rounded bg-[var(--vo-surface-2)] px-1">localStorage</code>
            , ključ <code className="rounded bg-[var(--vo-surface-2)] px-1">vo_cookie_consent_v1</code>). Brez tega ne moremo
            spoštovati vaše volje.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">2. Analitika (opcijsko)</h2>
          <p>
            Če vklopite &quot;Analitiko&quot;, lahko naložimo <strong>Google Analytics 4</strong> (če je v okolju nastavljen{" "}
            <code className="rounded bg-[var(--vo-surface-2)] px-1">NEXT_PUBLIC_GA4_MEASUREMENT_ID</code>). Namen: obiskanost
            in izboljšanje strani. IP lahko nastavimo na anonimizacijo v konfiguraciji.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">3. Marketing / družbena omrežja (opcijsko)</h2>
          <p>
            Če vklopite &quot;Marketing&quot;, lahko naložimo <strong>Meta Pixel</strong> (če je v okolju nastavljen{" "}
            <code className="rounded bg-[var(--vo-surface-2)] px-1">NEXT_PUBLIC_META_PIXEL_ID</code>). Namen: merjenje
            učinkov oglasov na Facebooku/Instagramu in priprava na remarketing. Brez vaše privolitve te skripte ne
            naložimo.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--vo-fg)]">4. Kako zavrniti</h2>
          <p>
            V bannerju izberite &quot;Zavrni ne-nujne&quot; ali v nastavitvah odkljukajte analitiko in marketing. Brskalnik
            lahko tudi izbriše shranjene podatke strani.
          </p>
        </section>

        <p>
          <Link href="/zasebnost" className="text-[var(--vo-accent)] hover:underline">
            ← Nazaj na zasebnost
          </Link>
        </p>
      </div>
    </div>
  );
}
