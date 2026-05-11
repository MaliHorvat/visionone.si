import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  EthernetPort,
  Network,
  RadioTower,
  ShieldCheck,
  Video,
} from "lucide-react";
import { MarketingImageSlot } from "@/components/public/MarketingImageSlot";
import { ServiceImageSplit } from "@/components/public/ServiceImageSplit";
import {
  MARKETING_IMG_CCTV,
  MARKETING_IMG_DOMOV_KAJ_NUDIMO,
  MARKETING_IMG_DOMOV_PODPORA,
  MARKETING_IMG_DOMOV_ZAKAJ_INTRO,
  MARKETING_IMG_HERO,
} from "@/lib/marketing-images";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--vo-border)] bg-[var(--vo-surface)]">
        <div className="pointer-events-none absolute inset-0">
          {/* SLIKA: MARKETING_IMG_HERO — marketing-images.ts (hero ozadje) */}
          <Image
            src={MARKETING_IMG_HERO}
            alt=""
            fill
            priority
            className="object-cover object-[60%_40%] sm:object-[70%_30%] md:object-[85%_center]"
            sizes="100vw"
          />
          {/* Telefon: enoten zaslon za berljivost (brez color-mix). Namizje: gradient z leve. */}
          <div className="absolute inset-0 bg-[var(--vo-surface)]/86 md:hidden" aria-hidden />
          <div
            className="absolute inset-0 hidden bg-gradient-to-r from-[var(--vo-surface)] from-[22%] via-[var(--vo-surface)]/78 via-42% to-transparent to-88% md:block"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,122,122,0.12),transparent_55%)] md:bg-[radial-gradient(ellipse_at_top_right,rgba(13,122,122,0.14),transparent_52%)]"
            aria-hidden
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16 md:px-6 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--vo-accent)]">VisionOne</p>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-bold tracking-tight text-[var(--vo-fg)] sm:text-4xl md:text-5xl">
            Videonadzor, mreža in proaktivni nadzor v enem sistemu
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--vo-muted)] sm:mt-6 sm:text-lg">
            Od postavitve kamer in snemalnikov do 24/7 spremljanja dosegljivosti. VisionOne portal
            v realnem času pokaže stanje kamer, snemalnikov, switchov in diskov.
          </p>
          <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap">
            <Link
              href="/kontakt#ponudba"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--vo-accent)] px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-teal-900/20 hover:bg-[var(--vo-accent-hover)] sm:min-h-0 sm:px-6"
            >
              Pridobi ponudbo
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <Link
              href="/storitve"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)]/95 px-5 py-3 text-center text-sm font-semibold text-[var(--vo-fg)] backdrop-blur-sm hover:bg-[var(--vo-surface-2)] sm:min-h-0 sm:px-6"
            >
              Pregled storitev
            </Link>
            <Link
              href="/produkti"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)]/95 px-5 py-3 text-center text-sm font-semibold text-[var(--vo-fg)] backdrop-blur-sm hover:bg-[var(--vo-surface-2)] sm:min-h-0 sm:px-6"
            >
              Produkti
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)]/95 px-5 py-3 text-center text-sm font-semibold text-[var(--vo-fg)] backdrop-blur-sm hover:bg-[var(--vo-surface-2)] sm:min-h-0 sm:px-6"
            >
              Rezerviraj ogled lokacije
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        {/* SLIKA: MARKETING_IMG_CCTV — marketing-images.ts (velik split levo) */}
        <ServiceImageSplit imageSrc={MARKETING_IMG_CCTV} imageAlt="Videonadzorna kamera na objektu">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vo-accent)]">Celostna skrb za objekt</p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--vo-fg)] md:text-3xl">
            Montaža, zagon, podpora — videonadzor, alarmi, požar, domofoni, omrežja
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">
            Na terenu izvedemo montažo in zagon videonadzora, brezžičnih in hibridnih alarmnih sistemov, požarne
            signalizacije (po dogovoru in predpisih), domofonije ter LAN/Wi‑Fi.
            Nudimo dokumentacijo, servis in proaktivno spremljanje — vključno z našim portalom za živ pregled
            kamer, snemalnikov, stikal in diskov.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/storitve" className="text-sm font-semibold text-[var(--vo-accent)] hover:underline">
              Vse storitve →
            </Link>
            <Link href="/produkti" className="text-sm font-semibold text-[var(--vo-accent)] hover:underline">
              Produkti →
            </Link>
          </div>
        </ServiceImageSplit>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { k: "100+", v: "Aktivnih objektov v nadzoru" },
            { k: "24/7", v: "Spremljanje dosegljivosti" },
            { k: "< 15 min", v: "Povprečen prvi odziv (SLA)" },
          ].map((x) => (
            <div key={x.v} className="rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-4 py-3">
              <p className="text-xl font-bold text-[var(--vo-fg)]">{x.k}</p>
              <p className="text-xs text-[var(--vo-muted)]">{x.v}</p>
            </div>
          ))}
        </div>

        {/* SLIKA: MARKETING_IMG_DOMOV_ZAKAJ_INTRO — marketing-images.ts */}
        <div className="mt-10">
          <MarketingImageSlot
            codeLabel="MARKETING_IMG_DOMOV_ZAKAJ_INTRO"
            src={MARKETING_IMG_DOMOV_ZAKAJ_INTRO}
            alt="VisionOne — ilustracija pred razdelkom Zakaj portal"
          />
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold text-[var(--vo-fg)]">Zakaj VisionOne portal</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-[var(--vo-muted)]">
          Rešitev temelji na realnih terenskih potrebah: hiter pregled, jasni alarmi in manj ročnega
          dela pri objektih.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Video,
              title: "Live status naprav",
              text: "Sinhroniziran online/offline status kamer, snemalnikov in switchov na enem mestu.",
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
        {/* SLIKA: MARKETING_IMG_DOMOV_KAJ_NUDIMO — marketing-images.ts */}
        <div className="mb-10">
          <MarketingImageSlot
            codeLabel="MARKETING_IMG_DOMOV_KAJ_NUDIMO"
            src={MARKETING_IMG_DOMOV_KAJ_NUDIMO}
            alt="VisionOne — ilustracija storitev"
          />
        </div>
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
          {/* SLIKA: MARKETING_IMG_DOMOV_PODPORA — marketing-images.ts */}
          <div className="w-full max-w-3xl">
            <MarketingImageSlot
              codeLabel="MARKETING_IMG_DOMOV_PODPORA"
              src={MARKETING_IMG_DOMOV_PODPORA}
              alt="VisionOne — podpora in nadzor"
              aspectClass="aspect-video min-h-[160px] max-h-64 w-full sm:max-h-80"
            />
          </div>
          <div className="flex w-full max-w-3xl flex-col items-stretch gap-3 sm:max-w-none">
            <div className="flex flex-col flex-wrap items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link
                href="/kontakt#ponudba"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--vo-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--vo-accent-hover)] sm:w-auto sm:min-h-0"
              >
                Želim demo portal
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/kontakt#ponudba"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)] sm:w-auto sm:min-h-0"
              >
                Pridobi ponudbo
              </Link>
              <Link
                href="/storitve"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)] sm:w-auto sm:min-h-0"
              >
                Pregled storitev
              </Link>
              <Link
                href="/produkti"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)] sm:w-auto sm:min-h-0"
              >
                Produkti
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)] sm:w-auto sm:min-h-0"
              >
                Rezerviraj ogled lokacije
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
