import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  EthernetPort,
  Network,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import { ServiceImageSplit } from "@/components/public/ServiceImageSplit";
import { VisualBand } from "@/components/public/VisualBand";
import { MarketingImageSlot } from "@/components/public/MarketingImageSlot";
import { getMarketingSiteContent, imageSrc } from "@/lib/marketing-site/fetch";

export default async function HomePage() {
  const site = await getMarketingSiteContent();
  const home = site.pages.home;
  const hero = home?.hero && "trustPills" in home.hero ? home.hero : null;
  const split = home?.splitCctv;
  const stats = home?.stats ?? [];
  const imgHero = imageSrc(site, "MARKETING_IMG_HERO") ?? "12.png";
  const imgCctv = imageSrc(site, "MARKETING_IMG_CCTV") ?? "image1.png";
  const imgZakaj = imageSrc(site, "MARKETING_IMG_DOMOV_ZAKAJ_INTRO");
  const imgKaj = imageSrc(site, "MARKETING_IMG_DOMOV_KAJ_NUDIMO");
  const imgPodpora = imageSrc(site, "MARKETING_IMG_DOMOV_PODPORA");
  const heroImgCfg = site.images.MARKETING_IMG_HERO;
  return (
    <>
      <section className="relative min-h-[min(92vh,820px)] overflow-hidden border-b border-[var(--vo-border)]">
        <div className="pointer-events-none absolute inset-0 bg-[var(--vo-surface-2)]">
          <Image
            src={imgHero}
            alt={heroImgCfg?.alt ?? ""}
            fill
            priority
            className="object-cover object-center md:object-right"
            style={{
              objectFit: heroImgCfg?.objectFit ?? "cover",
              objectPosition: heroImgCfg?.objectPosition ?? "center right",
            }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--vo-surface)]/90 md:bg-gradient-to-r md:from-[var(--vo-surface)] md:from-15% md:via-[var(--vo-surface)]/75 md:via-45% md:to-transparent md:to-80%" aria-hidden />
          <div className="vo-hero-glow absolute inset-0" aria-hidden />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 md:px-6 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--vo-accent)]/30 bg-[var(--vo-surface)]/80 px-3 py-1.5 text-xs font-semibold text-[var(--vo-accent)] shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {hero?.eyebrow ?? "Varnost, ki deluje — ne le na papirju"}
          </div>

          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-[var(--vo-fg)] sm:text-5xl md:text-[3.25rem] md:leading-[1.08]">
            {hero?.title ?? "Videonadzor, mreža in proaktivni nadzor v"}{" "}
            <span className="bg-gradient-to-r from-[var(--vo-accent)] to-[var(--vo-accent-2)] bg-clip-text text-transparent">
              {hero?.titleHighlight ?? "enem sistemu"}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--vo-muted)] sm:text-lg">
            {hero?.description ??
              "Od postavitve kamer in snemalnikov do 24/7 spremljanja dosegljivosti. VisionOne portal v realnem času pokaže stanje kamer, snemalnikov, stikal in diskov — vi ukrepate prej, ko izpad postane kritičen."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/kontakt#ponudba"
              className="vo-btn-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white"
            >
              {hero?.ctaPrimary ?? "Brezplačna ponudba"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/produkti"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)]/90 px-6 py-3 text-sm font-bold text-[var(--vo-fg)] backdrop-blur-sm transition hover:border-[var(--vo-accent)]/40 hover:bg-[var(--vo-surface)]"
            >
              {hero?.ctaSecondary ?? "Spoznaj portal"}
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {(hero?.trustPills ?? ["24/7 nadzor", "Certificirani monterji", "VisionOne portal", "Hiter odziv"]).map((pill) => (
              <li
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)]/85 px-3 py-1.5 text-xs font-semibold text-[var(--vo-fg)] backdrop-blur-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--vo-accent)]" aria-hidden />
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 md:px-6 md:pb-14 md:pt-16">
        <ServiceImageSplit imageSrc={imgCctv} imageAlt={site.images.MARKETING_IMG_CCTV?.alt ?? "Videonadzor na objektu"} priority>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vo-accent)]">{split?.kicker ?? "Celostna skrb za objekt"}</p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--vo-fg)] md:text-3xl">{split?.title ?? "Montaža, zagon, podpora"}</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{split?.body ?? ""}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href={split?.linkHref ?? "/storitve"} className="inline-flex items-center gap-1 text-sm font-bold text-[var(--vo-accent)] hover:underline">
              {split?.linkLabel ?? "Vse storitve"} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/kontakt" className="inline-flex items-center gap-1 text-sm font-bold text-[var(--vo-accent)] hover:underline">
              Rezerviraj ogled <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ServiceImageSplit>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = [ShieldCheck, Zap, RadioTower][i] ?? ShieldCheck;
            return (
            <div key={stat.label} className="vo-stat-card vo-card-hover rounded-2xl border border-[var(--vo-border)] px-5 py-5">
              <Icon className="h-6 w-6 text-[var(--vo-accent)]" aria-hidden />
              <p className="mt-3 text-3xl font-extrabold text-[var(--vo-fg)]">{stat.value}</p>
              <p className="mt-1 text-sm text-[var(--vo-muted)]">{stat.label}</p>
            </div>
          );
          })}
        </div>

        <div className="mt-14">
          {imgZakaj ? (
            <MarketingImageSlot
              codeLabel="MARKETING_IMG_DOMOV_ZAKAJ_INTRO"
              src={imgZakaj}
              alt="VisionOne — zakaj portal"
            />
          ) : (
            <VisualBand
              icon={Sparkles}
              title="Tehnologija, ki dela za vas — ne obratno"
              subtitle="Manj ročnega preverjanja, več jasnih signalov in hitrejših odločitev na terenu."
            />
          )}
        </div>

        <div className="mt-14 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vo-accent)]">VisionOne portal</p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--vo-fg)]">Zakaj naš portal</h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--vo-muted)]">
            Rešitev temelji na realnih terenskih potrebah: hiter pregled, jasni alarmi in manj ročnega dela pri objektih.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Video,
              title: "Live status naprav",
              text: "Sinhroniziran online/offline status kamer, snemalnikov in stikal na enem mestu.",
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
              className="vo-card-hover rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--vo-fg)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--vo-muted)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vo-section-alt border-y border-[var(--vo-border)] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          {imgKaj ? (
            <div className="mb-10">
              <MarketingImageSlot
                codeLabel="MARKETING_IMG_DOMOV_KAJ_NUDIMO"
                src={imgKaj}
                alt="VisionOne storitve"
              />
            </div>
          ) : null}

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vo-accent)]">Storitve</p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--vo-fg)]">Kaj nudimo</h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--vo-muted)]">Celostne rešitve od načrtovanja do 24/7 nadzora.</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Video, title: "Videonadzor", text: "Projektiranje, montaža, NVR/kamere, vzdrževanje in nadgradnje." },
              { icon: Camera, title: "Domofoni", text: "IP domofonski sistemi, integracija z dostopom in omrežji." },
              { icon: Network, title: "Mrežne rešitve", text: "Kabliranje, stikala, Wi‑Fi, diagnostika in odprava motenj." },
              { icon: EthernetPort, title: "Rack & topologija", text: "Sheme, rack postavitve in dokumentacija za servis." },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="vo-card-hover rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[var(--vo-fg)]">{title}</h3>
                <p className="mt-2 text-sm text-[var(--vo-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 vo-mesh-bg opacity-60" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center md:px-6">
          <div className="vo-animate-float flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--vo-accent-muted)] text-[var(--vo-accent)] shadow-[var(--vo-glow-sm)]">
            <ShieldCheck className="h-8 w-8" aria-hidden />
          </div>
          <h2 className="text-3xl font-bold text-[var(--vo-fg)] md:text-4xl">24/7 proaktivna podpora</h2>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--vo-muted)] md:text-lg">
            Spremljamo ključne naprave in vas obvestimo, preden izpad postane kritičen. Portal je pripravljen za
            real-time status, servisne procese in poročila.
          </p>
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--vo-border)] shadow-[var(--vo-card-shadow)]">
            <MarketingImageSlot
              codeLabel="MARKETING_IMG_DOMOV_PODPORA"
              src={imgPodpora ?? "/vo-domov-podpora.png"}
              alt="VisionOne — podpora in nadzor"
              aspectClass="aspect-video min-h-[180px] w-full sm:min-h-[220px]"
              className="rounded-2xl border-0"
            />
          </div>
          <div className="flex w-full max-w-3xl flex-col flex-wrap items-stretch justify-center gap-3 sm:flex-row">
            <Link href="/kontakt#ponudba" className="vo-btn-primary inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white sm:flex-none">
              Želim demo portal <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/kontakt#ponudba" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-5 py-3 text-sm font-bold text-[var(--vo-fg)] hover:border-[var(--vo-accent)]/40 sm:flex-none">
              Pridobi ponudbo
            </Link>
            <Link href="/storitve" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-5 py-3 text-sm font-bold text-[var(--vo-fg)] hover:border-[var(--vo-accent)]/40 sm:flex-none">
              Pregled storitev
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
