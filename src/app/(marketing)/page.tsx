import Link from "next/link";
import { ArrowRight, Camera, Network, ShieldCheck, Video } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--vo-border)] bg-[var(--vo-surface)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,122,122,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--vo-accent)]">
            VisionOne
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-[var(--vo-fg)] md:text-5xl">
            Vaša varnost in povezljivost v zanesljivih rokah
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--vo-muted)]">
            Montaža in vzdrževanje videonadzora, domofonov in omrežnih rešitev. Proaktivno
            spremljanje in podpora, da vaša infrastruktura deluje brez presenečenj.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/kontakt#ponudba"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--vo-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 hover:bg-[var(--vo-accent-hover)]"
            >
              Pridobi ponudbo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/storitve"
              className="inline-flex items-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-6 py-3 text-sm font-semibold text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)]"
            >
              Pregled storitev
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-center text-2xl font-bold text-[var(--vo-fg)]">Kaj nudimo</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-[var(--vo-muted)]">
          Celostne rešitve od načrtovanja do 24/7 nadzora — pripravljeni za povezavo z vašim
          zalednim sistemom.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Video,
              title: "Videonadzor",
              text: "Projektiranje, montaža, konfiguracija NVR in kamer, vzdrževanje in nadgradnje.",
            },
            {
              icon: Camera,
              title: "Domofoni",
              text: "IP domofonski sistemi, integracija z dostopom in obstoječimi omrežji.",
            },
            {
              icon: Network,
              title: "Mrežne rešitve",
              text: "Strukturirano kabliranje, stikala, Wi‑Fi, diagnostika in odprava motenj.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--vo-fg)]">{title}</h3>
              <p className="mt-2 text-sm text-[var(--vo-muted)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--vo-border)] bg-[var(--vo-surface-2)] py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center md:px-6">
          <ShieldCheck className="h-10 w-10 text-[var(--vo-accent)]" aria-hidden />
          <h2 className="text-2xl font-bold text-[var(--vo-fg)]">24/7 proaktivna podpora</h2>
          <p className="max-w-2xl text-[var(--vo-muted)]">
            Spremljamo ključne naprave in vas obvestimo, preden izpad postane kritičen. Portal za
            stranke in ekipo je pripravljen za integracijo z vašim Go API.
          </p>
          <Link
            href="/vzdrzevalni-paketi"
            className="text-sm font-semibold text-[var(--vo-accent)] hover:underline"
          >
            Oglej si vzdrževalne pakete
          </Link>
        </div>
      </section>
    </>
  );
}
