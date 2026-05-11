import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Bell, DoorOpen, Flame, Router, Shield, Wifi, Wrench } from "lucide-react";
import { MarketingImageSlot } from "@/components/public/MarketingImageSlot";
import { ServiceImageSplit } from "@/components/public/ServiceImageSplit";
import {
  MARKETING_IMG_CCTV,
  MARKETING_IMG_STORITVE_ALARM,
  MARKETING_IMG_STORITVE_DOMOFON,
  MARKETING_IMG_STORITVE_MREZA,
  MARKETING_IMG_STORITVE_OSTALO,
  MARKETING_IMG_STORITVE_POZAR,
  MARKETING_IMG_STORITVE_SERVIS,
  MARKETING_IMG_STORITVE_WIFI,
} from "@/lib/marketing-images";

export const metadata: Metadata = {
  title: "Storitve",
  description:
    "Montaža in podpora videonadzora, alarmnih in požarnih sistemov, domofonije in omrežij.",
};

export default function StoritvePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:px-6">
      <h1 className="text-balance text-3xl font-bold text-[var(--vo-fg)]">Storitve</h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed break-words text-[var(--vo-muted)]">
        Na terenu in na daljavo: od prvega načrta do zagona, dokumentacije in redne podpore. Pokrivamo videonadzor,
        brezžične in hibridne alarmne sisteme, požarno signalizacijo (v okviru veljavnih certifikatov in dogovora),
        domofonijo, strukturirana omrežja, zasebna omrežja (VPN / segmentacija) ter ostale montaže in servise, ki jih
        objekt potrebuje.
      </p>

      <div className="mt-12">
        {/* SLIKA: MARKETING_IMG_CCTV — marketing-images.ts (split levo) */}
        <ServiceImageSplit
          imageSrc={MARKETING_IMG_CCTV}
          imageAlt="Varnostna kamera na objektu — videonadzor"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vo-accent)]">Teren &amp; podpora</p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--vo-fg)] md:text-3xl">Videonadzor od montaže do 24/7 spremljanja</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">
            Montaža in zagon kamer (notranje/zunanje), kabliranje, konfiguracija NVR/DVR in dostopa na daljavo.
            Vzdrževalni obiski, čiščenje objektivov, firmware, nadgradnje kapacitet in diskov. Ob dogovoru povezava z
            našim <strong className="text-[var(--vo-fg)]">VisionOne portalom</strong> za živ status naprav in alarmov.
          </p>
          <Link
            href="/produkti"
            className="mt-6 inline-flex text-sm font-semibold text-[var(--vo-accent)] hover:underline"
          >
            Oglej si produkt — VisionOne portal →
          </Link>
        </ServiceImageSplit>
      </div>

      <div className="mt-16 space-y-8">
        <ServiceBlock
          icon={Bell}
          title="Brezžični in hibridni alarmni sistemi"
          text="Načrtovanje, montaža senzorjev, central, sirene in zagon. Integracija z obstoječimi vrati/omrežjem, testiranje con in predaja stranki. Servisni posegi in nadgradnje."
          imageSlot={{
            codeLabel: "MARKETING_IMG_STORITVE_ALARM",
            src: MARKETING_IMG_STORITVE_ALARM,
            alt: "Brezžični in hibridni alarmni sistemi",
          }}
        />
        <ServiceBlock
          icon={Flame}
          title="Požarna signalizacija"
          text="Projektiranje in izvedba v skladu z veljavnimi predpisi in dogovorjenim obsegom (npr. javni objekti, garaže, skladišča). Vzdrževanje in periodični pregledi po dogovoru."
          imageSlot={{
            codeLabel: "MARKETING_IMG_STORITVE_POZAR",
            src: MARKETING_IMG_STORITVE_POZAR,
            alt: "Požarna signalizacija",
          }}
        />
        <ServiceBlock
          icon={DoorOpen}
          title="Domofonija"
          text="IP domofoni, paneli, integracija z elektro omarico in LAN/Wi‑Fi. Konfiguracija klicov, posnetkov ob obisku in oddaljenega odklepanja po dogovoru."
          imageSlot={{
            codeLabel: "MARKETING_IMG_STORITVE_DOMOFON",
            src: MARKETING_IMG_STORITVE_DOMOFON,
            alt: "Domofonija",
          }}
        />
        <ServiceBlock
          icon={Router}
          title="Omrežne montaže in rešitve"
          text="Stikala, routerji, strukturirano kabliranje, VLAN in segmentacija (kamere ločeno od pisarniškega omrežja). Zasebna omrežja, VPN za oddaljen dostop in varnostne politike po dogovoru."
          imageSlot={{
            codeLabel: "MARKETING_IMG_STORITVE_MREZA",
            src: MARKETING_IMG_STORITVE_MREZA,
            alt: "Omrežne rešitve",
          }}
        />
        <ServiceBlock
          icon={Wifi}
          title="Wi‑Fi in pokritost"
          text="Načrtovanje pokritosti, montaža access pointov, kanalizacija in izogibanje motnjam. Diagnostika šibkih signalov in predlogi izboljšav."
          imageSlot={{
            codeLabel: "MARKETING_IMG_STORITVE_WIFI",
            src: MARKETING_IMG_STORITVE_WIFI,
            alt: "Wi‑Fi in pokritost",
          }}
        />
        <ServiceBlock
          icon={Shield}
          title="Podpora in servis"
          text="Helpdesk, intervencije, nadomestni deli, poročila po obisku. Proaktivno spremljanje prek portala, če imate vključen nadzor."
          imageSlot={{
            codeLabel: "MARKETING_IMG_STORITVE_SERVIS",
            src: MARKETING_IMG_STORITVE_SERVIS,
            alt: "Podpora in servis",
          }}
        />
        <ServiceBlock
          icon={Wrench}
          title="Ostale montaže"
          text="Po dogovoru: TV distribucija, dodatna polja v omaricah, označevanje kablov, manjše prilagoditve rackov in podobno — vse z dokumentacijo za kasnejši servis."
          imageSlot={{
            codeLabel: "MARKETING_IMG_STORITVE_OSTALO",
            src: MARKETING_IMG_STORITVE_OSTALO,
            alt: "Ostale montaže",
          }}
        />
      </div>

      <div className="mt-16 rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-accent-muted)] px-6 py-8 text-center md:px-10">
        <h2 className="text-xl font-bold text-[var(--vo-fg)]">Potrebujete ponudbo ali ogled lokacije?</h2>
        <p className="mt-2 text-sm text-[var(--vo-muted)]">
          Na kratko opišite objekt in želene sisteme — odgovorimo z naslednjimi koraki.
        </p>
        <Link
          href="/kontakt#ponudba"
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--vo-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--vo-accent-hover)] sm:w-auto sm:min-h-0"
        >
          Kontakt in ponudba
        </Link>
      </div>
    </div>
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
    <section className="overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] shadow-[var(--vo-card-shadow)]">
      <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-start md:p-8">
        <Icon className="h-10 w-10 shrink-0 text-[var(--vo-accent)]" aria-hidden />
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-[var(--vo-fg)]">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{text}</p>
        </div>
      </div>
      {/* SLIKA: glej prop imageSlot.codeLabel → marketing-images.ts */}
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
