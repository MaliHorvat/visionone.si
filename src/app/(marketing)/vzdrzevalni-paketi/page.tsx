import type { Metadata } from "next";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Vzdrževalni paketi",
};

const paketi = [
  {
    name: "Osnovni",
    desc: "Redni letni pregled in remote podpora v delovnem času.",
    price: "od 39 € / mesec",
    feats: ["Letni terenski obisk", "Posodobitve firmware (dogovor)", "E-poštna podpora"],
  },
  {
    name: "Napredni",
    desc: "Krajši SLA, prednostna obravnava in mesečni health check.",
    price: "od 89 € / mesec",
    feats: [
      "Vse iz Osnovnega",
      "Mesečni oddaljeni pregled",
      "Prioritetni klici",
      "Poročila o diskih in kamerah",
    ],
    highlight: true,
  },
  {
    name: "24/7 Proaktivni nadzor",
    desc: "Nadzor ključnih naprav in obvestila pred kritičnim izpadom.",
    price: "po dogovoru",
    feats: [
      "24/7 spremljanje (mock UI pripravljen za API)",
      "Telegram / obvestila",
      "Intervencijski čas po SLA",
      "Portal za status objektov",
    ],
  },
];

export default function PaketiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="text-3xl font-bold text-[var(--vo-fg)]">Vzdrževalni paketi</h1>
      <p className="mt-3 max-w-2xl text-[var(--vo-muted)]">
        Naročniški paketi prilagojeni velikosti objekta. Končne cene potrdimo po ogledu in
        inventarju naprav.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {paketi.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-2xl border p-6 shadow-[var(--vo-card-shadow)] ${
              p.highlight
                ? "border-[var(--vo-accent)] bg-[var(--vo-surface)] ring-2 ring-[var(--vo-accent-muted)]"
                : "border-[var(--vo-border)] bg-[var(--vo-surface)]"
            }`}
          >
            <h2 className="text-lg font-semibold text-[var(--vo-fg)]">{p.name}</h2>
            <p className="mt-2 flex-1 text-sm text-[var(--vo-muted)]">{p.desc}</p>
            <p className="mt-4 text-sm font-bold text-[var(--vo-accent)]">{p.price}</p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--vo-fg)]">
              {p.feats.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--vo-ok)]" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
