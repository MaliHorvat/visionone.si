import type { Metadata } from "next";
import { Router, Video, DoorOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Storitve",
};

export default function StoritvePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="text-3xl font-bold text-[var(--vo-fg)]">Storitve</h1>
      <p className="mt-3 max-w-2xl text-[var(--vo-muted)]">
        Celovita podpora pri varnostnih in komunikacijskih sistemih — od načrta do rednega
        vzdrževanja in proaktivnega nadzora v portalu.
      </p>

      <div className="mt-12 space-y-10">
        <section className="grid gap-8 rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-8 shadow-[var(--vo-card-shadow)] md:grid-cols-[auto_1fr] md:items-start">
          <Video className="h-10 w-10 shrink-0 text-[var(--vo-accent)]" aria-hidden />
          <div>
            <h2 className="text-xl font-semibold text-[var(--vo-fg)]">Videonadzor</h2>
            <p className="mt-2 text-[var(--vo-muted)]">
              Montaža kamer (notranje/zunanje), kabliranje, konfiguracija snemanja in dostopa,
              integracija z NVR ali oblakovnimi storitvami. Vzdrževalni obiski, čiščenje objektivov,
              posodobitve firmware, ping watchdog in nadzor kapacitet diskov.
            </p>
          </div>
        </section>

        <section className="grid gap-8 rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-8 shadow-[var(--vo-card-shadow)] md:grid-cols-[auto_1fr] md:items-start">
          <DoorOpen className="h-10 w-10 shrink-0 text-[var(--vo-accent)]" aria-hidden />
          <div>
            <h2 className="text-xl font-semibold text-[var(--vo-fg)]">Domofonski sistemi</h2>
            <p className="mt-2 text-[var(--vo-muted)]">
              IP domofoni, paneli na vhodih, integracija z elektro omaricami in omrežjem.
              Konfiguracija klicov, snemanja ob obisku in oddaljenega odklepanja po dogovoru.
            </p>
          </div>
        </section>

        <section className="grid gap-8 rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-8 shadow-[var(--vo-card-shadow)] md:grid-cols-[auto_1fr] md:items-start">
          <Router className="h-10 w-10 shrink-0 text-[var(--vo-accent)]" aria-hidden />
          <div>
            <h2 className="text-xl font-semibold text-[var(--vo-fg)]">Mrežne rešitve</h2>
            <p className="mt-2 text-[var(--vo-muted)]">
              Postavitev LAN in Wi‑Fi, stikala in routerji, VLAN in segmentacija za kamere.
              Diagnostika izpadov, interferenc in težav z internetom pri ponudniku — z jasnimi
              poročili za odločanje, vključno z live statusom switchov in snemalnikov.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
