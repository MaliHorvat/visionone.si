import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reference",
};

const ref = [
  { title: "Logistični center", loc: "Kranj", tag: "32 kamer, NVR redundantno" },
  { title: "Retail park", loc: "Maribor", tag: "IP domofon + video" },
  { title: "Stanovanjski sklop", loc: "Ljubljana", tag: "Wi‑Fi + UniFi Protect" },
  { title: "Proizvodnja", loc: "Celje", tag: "Segmentirano omrežje" },
  { title: "Zdravstveni poslovni prostor", loc: "Novo mesto", tag: "GDPR skladen dostop" },
  { title: "Športna dvorana", loc: "Koper", tag: "Visokoupokljive kamere" },
];

export default function ReferencePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="text-3xl font-bold text-[var(--vo-fg)]">Reference</h1>
      <p className="mt-3 max-w-2xl text-[var(--vo-muted)]">
        Izbrani projekti — vizualna galerija s placeholderji; kasneje lahko zamenjaš s fotografijami
        iz Go CDN.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ref.map((r, i) => (
          <article
            key={r.title}
            className="overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] shadow-[var(--vo-card-shadow)]"
          >
            <div
              className="aspect-[4/3] bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900"
              style={{ opacity: 1 - i * 0.05 }}
            />
            <div className="p-4">
              <h2 className="font-semibold text-[var(--vo-fg)]">{r.title}</h2>
              <p className="text-sm text-[var(--vo-muted)]">{r.loc}</p>
              <p className="mt-2 text-xs text-[var(--vo-accent)]">{r.tag}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
