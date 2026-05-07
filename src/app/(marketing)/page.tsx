import Link from "next/link";
import {
  ArrowRight,
  Camera,
  EthernetPort,
  HardDrive,
  Network,
  RadioTower,
  ShieldCheck,
  Video,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--vo-border)] bg-[var(--vo-surface)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,122,122,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--vo-accent)]">VisionOne</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-[var(--vo-fg)] md:text-5xl">
            Videonadzor, mreža in proaktivni nadzor v enem sistemu
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--vo-muted)]">
            Od postavitve kamer in snemalnikov do 24/7 spremljanja dosegljivosti. VisionOne portal
            v realnem času pokaže stanje kamer, snemalnikov, switchov in diskov.
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
            <Link
              href="/kontakt"
              className="inline-flex items-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-6 py-3 text-sm font-semibold text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)]"
            >
              Rezerviraj ogled lokacije
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-center text-2xl font-bold text-[var(--vo-fg)]">Zakaj VisionOne portal</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-[var(--vo-muted)]">
          Rešitev temelji na realnih terenskih potrebah: hiter pregled, jasni alarmi in manj ročnega
          dela pri objektih.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Video,
              title: "Live status naprav",
              text: "Sinhroniziran online/offline status kamer, snemalnikov in switchov na enem mestu.",
            },
            {
              icon: HardDrive,
              title: "Disk semafor",
              text: "Avtomatska lestvica stanja diskov: zeleno, oranžno po 2 letih, rdeče po 3+ letih.",
            },
            {
              icon: RadioTower,
              title: "Zero-touch RPi agent",
              text: "Agent na lokaciji se avtomatsko poveže s portalom in pošilja telemetrijo.",
            },
            {
              icon: Network,
              title: "Watchdog & diagnostika",
              text: "Ping watchdog kartice in mrežna orodja za hitro zaznavanje izpadov.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-5 shadow-[var(--vo-card-shadow)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--vo-fg)]">{title}</h3>
              <p className="mt-2 text-sm text-[var(--vo-muted)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <h2 className="text-center text-2xl font-bold text-[var(--vo-fg)]">Kaj nudimo</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-[var(--vo-muted)]">
          Celostne rešitve od načrtovanja do 24/7 nadzora.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            {
              icon: EthernetPort,
              title: "Rack & topologija",
              text: "Sheme, rack postavitve in dokumentacija za servisne posege.",
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
            Spremljamo ključne naprave in vas obvestimo, preden izpad postane kritičen. Portal je
            pripravljen za real-time status, servisne procese in poročila.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/vzdrzevalni-paketi" className="text-sm font-semibold text-[var(--vo-accent)] hover:underline">
              Oglej si vzdrževalne pakete
            </Link>
            <Link
              href="/kontakt#ponudba"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--vo-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--vo-accent-hover)]"
            >
              Želim demo portala
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
