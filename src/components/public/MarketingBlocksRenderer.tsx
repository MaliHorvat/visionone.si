import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bell,
  Camera,
  CheckCircle2,
  DoorOpen,
  EthernetPort,
  Flame,
  Network,
  RadioTower,
  Router,
  Shield,
  ShieldCheck,
  Sparkles,
  Video,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MarketingImageSlot } from "@/components/public/MarketingImageSlot";
import { PageHero } from "@/components/public/PageHero";
import { ServiceImageSplit } from "@/components/public/ServiceImageSplit";
import { ContactForm } from "@/app/(marketing)/kontakt/ContactForm";
import type { MarketingBlock, MarketingSiteContent } from "@/lib/marketing-site/types";
import { imageSrc } from "@/lib/marketing-site/fetch";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  alarm: Bell,
  pozar: Flame,
  domofon: DoorOpen,
  mreza: Router,
  wifi: Network,
  servis: Shield,
  ostalo: Wrench,
};

function btnClass(variant: "primary" | "secondary" | "outline") {
  if (variant === "primary") return "vo-btn-primary text-white";
  if (variant === "secondary") return "bg-[var(--vo-accent-muted)] text-[var(--vo-accent)] font-bold";
  return "border border-[var(--vo-border)] bg-[var(--vo-surface)] text-[var(--vo-fg)] font-bold hover:border-[var(--vo-accent)]/40";
}

export function MarketingBlocksRenderer({
  blocks,
  site,
}: {
  blocks: MarketingBlock[];
  site: MarketingSiteContent;
}) {
  const statIcons = [ShieldCheck, Zap, RadioTower];

  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "hero": {
            const heroImg = imageSrc(site, block.imageKey) ?? "12.png";
            const cfg = site.images[block.imageKey];
            return (
              <section key={block.id} className="relative min-h-[min(92vh,820px)] overflow-hidden border-b border-[var(--vo-border)]">
                <div className="pointer-events-none absolute inset-0 bg-[var(--vo-surface-2)]">
                  <Image
                    src={heroImg}
                    alt={cfg?.alt ?? ""}
                    fill
                    priority
                    className="object-cover object-center md:object-right"
                    style={{ objectPosition: cfg?.objectPosition ?? "center right" }}
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0 bg-[var(--vo-surface)]/90 md:bg-gradient-to-r md:from-[var(--vo-surface)] md:from-15% md:via-[var(--vo-surface)]/75 md:via-45% md:to-transparent md:to-80%"
                    aria-hidden
                  />
                  <div className="vo-hero-glow absolute inset-0" aria-hidden />
                </div>
                <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 md:px-6 md:py-28">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--vo-accent)]/30 bg-[var(--vo-surface)]/80 px-3 py-1.5 text-xs font-semibold text-[var(--vo-accent)] shadow-sm backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    {block.eyebrow}
                  </div>
                  <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-[var(--vo-fg)] sm:text-5xl md:text-[3.25rem] md:leading-[1.08]">
                    {block.title}{" "}
                    <span className="bg-gradient-to-r from-[var(--vo-accent)] to-[var(--vo-accent-2)] bg-clip-text text-transparent">
                      {block.titleHighlight}
                    </span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--vo-muted)] sm:text-lg">{block.description}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link href={block.ctaPrimaryHref} className={`${btnClass("primary")} inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm`}>
                      {block.ctaPrimary} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={block.ctaSecondaryHref}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)]/90 px-6 py-3 text-sm font-bold text-[var(--vo-fg)] backdrop-blur-sm"
                    >
                      {block.ctaSecondary}
                    </Link>
                  </div>
                  <ul className="mt-10 flex flex-wrap gap-2">
                    {block.trustPills.map((pill) => (
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
            );
          }
          case "pageHero":
            return (
              <PageHero key={block.id} eyebrow={block.eyebrow} title={block.title} description={block.description} />
            );
          case "text":
            return (
              <section key={block.id} className={`mx-auto max-w-6xl px-4 py-10 md:px-6 ${block.align === "center" ? "text-center" : ""}`}>
                {block.kicker ? (
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vo-accent)]">{block.kicker}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-2xl font-bold text-[var(--vo-fg)] md:text-3xl">{block.title}</h2> : null}
                {block.body ? <p className="mt-4 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{block.body}</p> : null}
              </section>
            );
          case "image": {
            const src = block.imageKey ? imageSrc(site, block.imageKey) : null;
            if (!src) return null;
            return (
              <section key={block.id} className="mx-auto max-w-6xl px-4 py-6 md:px-6">
                <MarketingImageSlot
                  codeLabel={block.imageKey}
                  src={src}
                  alt={site.images[block.imageKey]?.alt ?? block.caption}
                  aspectClass={block.aspect === "video" ? "aspect-video w-full" : "aspect-[21/9] w-full"}
                />
                {block.caption ? <p className="mt-2 text-center text-xs text-[var(--vo-muted)]">{block.caption}</p> : null}
              </section>
            );
          }
          case "split": {
            const src = imageSrc(site, block.imageKey) ?? "";
            return (
              <section key={block.id} className="mx-auto max-w-6xl px-4 py-10 md:px-6">
                <ServiceImageSplit imageSrc={src} imageAlt={site.images[block.imageKey]?.alt ?? ""}>
                  {block.kicker ? (
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vo-accent)]">{block.kicker}</p>
                  ) : null}
                  <h2 className="mt-3 text-2xl font-bold text-[var(--vo-fg)] md:text-3xl">{block.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{block.body}</p>
                  {block.linkHref ? (
                    <Link href={block.linkHref} className="mt-6 inline-flex text-sm font-bold text-[var(--vo-accent)] hover:underline">
                      {block.linkLabel || "Več"} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  ) : null}
                </ServiceImageSplit>
              </section>
            );
          }
          case "buttons":
            return (
              <section key={block.id} className={`mx-auto max-w-6xl px-4 py-8 md:px-6 ${block.align === "center" ? "text-center" : ""}`}>
                <div className={`flex flex-wrap gap-3 ${block.align === "center" ? "justify-center" : ""}`}>
                  {block.items.map((btn) => (
                    <Link
                      key={btn.id}
                      href={btn.href}
                      className={`${btnClass(btn.variant)} inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm`}
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              </section>
            );
          case "stats":
            return (
              <section key={block.id} className="mx-auto max-w-6xl px-4 pb-10 pt-4 md:px-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {block.items.map((stat, i) => {
                    const Icon = statIcons[i] ?? ShieldCheck;
                    return (
                      <div key={stat.label} className="vo-stat-card vo-card-hover rounded-2xl border border-[var(--vo-border)] px-5 py-5">
                        <Icon className="h-6 w-6 text-[var(--vo-accent)]" aria-hidden />
                        <p className="mt-3 text-3xl font-extrabold text-[var(--vo-fg)]">{stat.value}</p>
                        <p className="mt-1 text-sm text-[var(--vo-muted)]">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          case "cards":
            return (
              <section key={block.id} className="vo-section-alt border-y border-[var(--vo-border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                  <div className="text-center">
                    {block.kicker ? (
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vo-accent)]">{block.kicker}</p>
                    ) : null}
                    <h2 className="mt-2 text-3xl font-bold text-[var(--vo-fg)]">{block.title}</h2>
                    {block.subtitle ? <p className="mx-auto mt-3 max-w-xl text-[var(--vo-muted)]">{block.subtitle}</p> : null}
                  </div>
                  <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {block.items.map((item, i) => {
                      const icons = [Video, Camera, Network, EthernetPort];
                      const Icon = icons[i] ?? Video;
                      return (
                        <div
                          key={item.title}
                          className="vo-card-hover rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)]"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]">
                            <Icon className="h-5 w-5" aria-hidden />
                          </div>
                          <h3 className="mt-4 text-lg font-bold text-[var(--vo-fg)]">{item.title}</h3>
                          <p className="mt-2 text-sm text-[var(--vo-muted)]">{item.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          case "serviceBlocks":
            return (
              <section key={block.id} className="mx-auto max-w-6xl px-4 py-10 md:px-6">
                <div className="space-y-8">
                  {block.items.map((item) => {
                    const src = item.imageKey ? imageSrc(site, item.imageKey) : null;
                    const Icon = SERVICE_ICONS[item.id] ?? Wrench;
                    return (
                      <div
                        key={item.id}
                        className="vo-card-hover overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] shadow-[var(--vo-card-shadow)]"
                      >
                        <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
                          <Icon className="h-10 w-10 shrink-0 text-[var(--vo-accent)]" aria-hidden />
                          <div>
                            <h2 className="text-xl font-semibold text-[var(--vo-fg)]">{item.title}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{item.body}</p>
                          </div>
                        </div>
                        {src ? (
                          <div className="border-t border-[var(--vo-border)] bg-[var(--vo-bg)] px-4 py-4 md:px-8">
                            <MarketingImageSlot codeLabel={item.imageKey} src={src} alt={item.title} aspectClass="aspect-[16/9] min-h-[180px] w-full" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          case "ctaBand":
            return (
              <section key={block.id} className="mx-auto max-w-6xl px-4 py-12 md:px-6">
                <div className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-accent-muted)] px-6 py-8 text-center md:px-10">
                  <h2 className="text-xl font-bold text-[var(--vo-fg)]">{block.title}</h2>
                  <p className="mt-2 text-sm text-[var(--vo-muted)]">{block.body}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {block.buttons.map((btn) => (
                      <Link key={btn.id} href={btn.href} className={`${btnClass(btn.variant)} inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 text-sm`}>
                        {btn.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );
          case "contactForm":
            return (
              <section key={block.id} className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:px-6">
                {block.intro ? <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--vo-muted)]">{block.intro}</p> : null}
                <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,320px)]">
                  <ContactForm />
                  <div className="vo-card-hover rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)] lg:sticky lg:top-24 lg:self-start">
                    <h2 className="text-lg font-bold text-[var(--vo-fg)]">E-pošta</h2>
                    <a className="mt-4 inline-block text-lg font-bold text-[var(--vo-accent)] hover:underline" href="mailto:info@visionone.si">
                      info@visionone.si
                    </a>
                  </div>
                </div>
              </section>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
