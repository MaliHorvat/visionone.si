import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="text-3xl font-bold text-[var(--vo-fg)]">Kontakt</h1>
      <p className="mt-3 max-w-2xl text-[var(--vo-muted)]">
        Pišite nam za ogled, ponudbo ali intervencijo. Telefon in e-pošta sta spodaj; zemljevid je
        informativen (Ljubljana).
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <ContactForm />

        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)]">
            <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Neposredno</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-[var(--vo-muted)]">Telefon</dt>
                <dd>
                  <a className="font-medium text-[var(--vo-accent)] hover:underline" href="tel:+38631234567">
                    +386 31 234 567
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[var(--vo-muted)]">E-pošta</dt>
                <dd>
                  <a
                    className="font-medium text-[var(--vo-accent)] hover:underline"
                    href="mailto:info@visionone.si"
                  >
                    info@visionone.si
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] shadow-[var(--vo-card-shadow)]">
            <iframe
              title="Zemljevid — Ljubljana"
              className="h-64 w-full grayscale contrast-125 dark:opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=14.47%2C46.02%2C14.55%2C46.08&amp;layer=mapnik&amp;marker=46.05%2C14.51"
            />
            <p className="border-t border-[var(--vo-border)] px-4 py-2 text-xs text-[var(--vo-muted)]">
              OpenStreetMap — zamenjaj koordinate za svoj sedež.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
