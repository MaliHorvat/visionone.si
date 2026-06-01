import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Bell, DoorOpen, Flame, Router, Shield, Wifi, Wrench } from "lucide-react";
import { MarketingImageSlot } from "@/components/public/MarketingImageSlot";
import { PageHero } from "@/components/public/PageHero";
import { ServiceImageSplit } from "@/components/public/ServiceImageSplit";
import { getMarketingSiteContent, imageSrc } from "@/lib/marketing-site/fetch";

export const metadata: Metadata = {
  title: "Storitve",
  description:
    "Montaža in podpora videonadzora, alarmnih in požarnih sistemov, domofonije in omrežij.",
};

const SERVICE_ICONS: Record<string, LucideIcon> = {
  alarm: Bell,
  pozar: Flame,
  domofon: DoorOpen,
  mreza: Router,
  wifi: Wifi,
  servis: Shield,
  ostalo: Wrench,
};

export default async function StoritvePage() {
  const site = await getMarketingSiteContent();
  const storitve = site.pages.storitve;
  const hero = storitve?.hero && "description" in storitve.hero ? storitve.hero : null;
  const split = storitve?.splitCctv;
  const imgCctv = imageSrc(site, "MARKETING_IMG_CCTV") ?? "image1.png";

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Storitve"}
        title={hero?.title ?? "Montaža, integracija in 24/7 podpora"}
        description={hero?.description ?? ""}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:px-6">
        <ServiceImageSplit imageSrc={imgCctv} imageAlt={site.images.MARKETING_IMG_CCTV?.alt ?? "Videonadzor"}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vo-accent)]">{split?.kicker ?? "Teren & podpora"}</p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--vo-fg)] md:text-3xl">{split?.title ?? ""}</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{split?.body ?? ""}</p>
          {split?.linkHref ? (
            <Link href={split.linkHref} className="mt-6 inline-flex text-sm font-semibold text-[var(--vo-accent)] hover:underline">
              {split.linkLabel ?? "Več"} →
            </Link>
          ) : null}
        </ServiceImageSplit>

        <div className="mt-16 space-y-8">
          {(storitve?.serviceBlocks ?? []).map((block) => {
            const src = imageSrc(site, block.imageKey);
            const cfg = site.images[block.imageKey];
            const Icon = SERVICE_ICONS[block.id] ?? Wrench;
            return (
              <ServiceBlock
                key={block.id}
                icon={Icon}
                title={block.title}
                text={block.body}
                imageSlot={{
                  codeLabel: block.imageKey,
                  src,
                  alt: cfg?.alt ?? block.title,
                }}
              />
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-accent-muted)] px-6 py-8 text-center md:px-10">
          <h2 className="text-xl font-bold text-[var(--vo-fg)]">Potrebujete ponudbo ali ogled lokacije?</h2>
          <p className="mt-2 text-sm text-[var(--vo-muted)]">
            Na kratko opišite objekt in želene sisteme — odgovorimo z naslednjimi koraki.
          </p>
          <Link
            href="/kontakt#ponudba"
            className="vo-btn-primary mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white sm:w-auto sm:min-h-0"
          >
            Kontakt in ponudba
          </Link>
        </div>
      </div>
    </>
  );
}

function ServiceBlock({
  icon: Icon,
  title,
  text,
  imageSlot,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  imageSlot: { codeLabel: string; src: string | null; alt: string };
}) {
  return (
    <section className="vo-card-hover overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] shadow-[var(--vo-card-shadow)]">
      <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-start md:p-8">
        <Icon className="h-10 w-10 shrink-0 text-[var(--vo-accent)]" aria-hidden />
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-[var(--vo-fg)]">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{text}</p>
        </div>
      </div>
      <div className="border-t border-[var(--vo-border)] bg-[var(--vo-bg)] px-4 py-4 md:px-8 md:py-5">
        <MarketingImageSlot
          codeLabel={imageSlot.codeLabel}
          src={imageSlot.src}
          alt={imageSlot.alt}
          aspectClass="aspect-[16/9] min-h-[180px] max-h-72 w-full sm:max-h-80"
          fit="cover"
          anchor="top"
        />
      </div>
    </section>
  );
}
