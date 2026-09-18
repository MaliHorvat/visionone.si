import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ContactForm } from "@/app/(marketing)/kontakt/ContactForm";
import { MarketingImageSlot } from "@/components/public/MarketingImageSlot";
import { PageHero } from "@/components/public/PageHero";
import { ProductShowcaseCard } from "@/components/public/ProductShowcaseCard";
import { ServiceImageSplit } from "@/components/public/ServiceImageSplit";
import type { Locale } from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/types";
import { imageSrc } from "@/lib/marketing-site/fetch";
import type { MarketingBlock, MarketingSiteContent } from "@/lib/marketing-site/types";
import { SITE_CONTACT, sitePhoneHref, sitePhoneLabel } from "@/lib/site-contact";

function btnClass(variant: "primary" | "secondary" | "outline") {
  if (variant === "primary") return "vo-btn-primary text-white";
  if (variant === "secondary") return "bg-[var(--vo-accent-muted)] text-[var(--vo-accent)] font-bold";
  return "border border-[var(--vo-border)] bg-[var(--vo-surface)] text-[var(--vo-fg)] font-bold hover:border-[var(--vo-accent)]/40";
}

function ProcessSection({ dict }: { dict: SiteDictionary }) {
  return (
    <section className="border-y border-[var(--vo-border)] bg-[var(--vo-surface)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vo-accent)]">
            {dict.process.kicker}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--vo-fg)]">{dict.process.title}</h2>
          <p className="mt-3 text-[var(--vo-muted)]">{dict.process.subtitle}</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {dict.process.steps.map((step, i) => (
            <div key={step.title} className="relative">
              <p className="text-sm font-semibold text-[var(--vo-accent)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-lg font-semibold text-[var(--vo-fg)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--vo-muted)]">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketingBlocksRenderer({
  blocks,
  site,
  dict,
  pageId,
}: {
  blocks: MarketingBlock[];
  site: MarketingSiteContent;
  locale: Locale;
  dict: SiteDictionary;
  pageId: string;
}) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "hero": {
            const heroImg = imageSrc(site, block.imageKey) ?? "/images/cctv.jpg";
            const cfg = site.images[block.imageKey];
            return (
              <section key={block.id} className="vo-hero-section relative min-h-[min(86vh,760px)] overflow-hidden border-b border-[var(--vo-border)]">
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
                    className="absolute inset-0 bg-[var(--vo-surface)]/88 md:bg-gradient-to-r md:from-[var(--vo-surface)] md:from-[22%] md:via-[var(--vo-surface)]/80 md:via-[46%] md:to-transparent md:to-[78%]"
                    aria-hidden
                  />
                </div>
                <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 md:px-6 md:py-24">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--vo-accent)]/30 bg-[var(--vo-surface)]/80 px-3 py-1.5 text-xs font-semibold text-[var(--vo-accent)] shadow-sm backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    {block.eyebrow}
                  </div>
                  <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-[var(--vo-fg)] sm:text-5xl md:text-[3.5rem] md:leading-[1.06]">
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
              <section key={block.id} id={block.id} className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 md:px-6">
                <ServiceImageSplit imageSrc={src} imageAlt={site.images[block.imageKey]?.alt ?? ""}>
                  {block.kicker ? (
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vo-accent)]">{block.kicker}</p>
                  ) : null}
                  <h2 className="mt-3 text-2xl font-bold text-[var(--vo-fg)] md:text-3xl">{block.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{block.body}</p>
                  {block.linkHref ? (
                    block.linkHref.startsWith("http") ? (
                      <a
                        href={block.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex text-sm font-bold text-[var(--vo-accent)] hover:underline"
                      >
                        {block.linkLabel || "Več"} <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    ) : (
                      <Link href={block.linkHref} className="mt-6 inline-flex text-sm font-bold text-[var(--vo-accent)] hover:underline">
                        {block.linkLabel || "Več"} <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    )
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
                <div className="grid gap-6 border-y border-[var(--vo-border)] py-8 sm:grid-cols-3 sm:gap-8">
                  {block.items.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold tracking-tight text-[var(--vo-fg)]">{stat.value}</p>
                      <p className="mt-1 text-sm text-[var(--vo-muted)]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          case "cards":
            return (
              <section key={block.id} className="border-y border-[var(--vo-border)] bg-[var(--vo-surface)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                  <div className="max-w-2xl">
                    {block.kicker ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vo-accent)]">{block.kicker}</p>
                    ) : null}
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--vo-fg)]">{block.title}</h2>
                    {block.subtitle ? <p className="mt-3 text-[var(--vo-muted)]">{block.subtitle}</p> : null}
                  </div>
                  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {block.items.map((item, i) => {
                      const cardImageKeys = [
                        "MARKETING_IMG_CCTV",
                        "MARKETING_IMG_STORITVE_SERVIS",
                        "MARKETING_IMG_STORITVE_MREZA",
                        "MARKETING_IMG_DOMOV_PODPORA",
                      ];
                      const src = imageSrc(site, cardImageKeys[i] ?? cardImageKeys[0]);
                      return (
                        <div
                          key={item.title}
                          className="overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-bg)]"
                        >
                          {src ? (
                            <div className="relative aspect-[16/10] w-full bg-[var(--vo-surface-2)]">
                              <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                            </div>
                          ) : null}
                          <div className="p-5">
                            <h3 className="text-lg font-semibold text-[var(--vo-fg)]">{item.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--vo-muted)]">{item.body}</p>
                          </div>
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
                <div className="space-y-10">
                  {block.items.map((item) => {
                    const src = item.imageKey ? imageSrc(site, item.imageKey) : null;
                    return (
                      <article
                        key={item.id}
                        id={item.id}
                        className="scroll-mt-24 grid overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] md:grid-cols-2"
                      >
                        {src ? (
                          <div className="relative aspect-[16/10] min-h-[200px] bg-[var(--vo-surface-2)] md:aspect-auto">
                            <Image src={src} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                          </div>
                        ) : null}
                        <div className="flex flex-col justify-center px-6 py-7 md:px-10 md:py-12">
                          <h2 className="text-xl font-semibold text-[var(--vo-fg)]">{item.title}</h2>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{item.body}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          case "productShowcase":
            return (
              <section key={block.id} className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
                {block.items.map((item, i) => {
                  const src = imageSrc(site, item.imageKey);
                  if (!src) return null;
                  const cfg = site.images[item.imageKey];
                  return (
                    <div key={item.id} id={item.id} className="scroll-mt-24">
                      <ProductShowcaseCard
                        imageSrc={src}
                        imageAlt={cfg?.alt ?? item.title}
                        label={item.label}
                        title={item.title}
                        description={item.description}
                        ctaHref={item.ctaHref}
                        ctaLabel={item.ctaLabel}
                        priorityImage={i === 0}
                      />
                    </div>
                  );
                })}
              </section>
            );
          case "ctaBand":
            return (
              <section key={block.id} className="mx-auto max-w-6xl px-4 py-12 md:px-6">
                <div className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface-2)] px-6 py-10 text-center md:px-10">
                  <h2 className="text-xl font-bold text-[var(--vo-fg)]">{block.title}</h2>
                  <p className="mt-2 text-sm text-[var(--vo-muted)]">{block.body}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {block.buttons.map((btn) =>
                      btn.href.startsWith("http") ? (
                        <a
                          key={btn.id}
                          href={btn.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${btnClass(btn.variant)} inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 text-sm`}
                        >
                          {btn.label}
                        </a>
                      ) : (
                        <Link
                          key={btn.id}
                          href={btn.href}
                          className={`${btnClass(btn.variant)} inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 text-sm`}
                        >
                          {btn.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </section>
            );
          case "contactForm": {
            const phoneHref = sitePhoneHref();
            const phoneLabel = sitePhoneLabel();
            return (
              <section key={block.id} className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:px-6">
                {block.intro ? (
                  <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--vo-muted)]">{block.intro}</p>
                ) : null}
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)]">
                  <ContactForm product={block.product ?? "cctv"} />
                  <aside className="vo-card-hover space-y-6 rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)] lg:sticky lg:top-24 lg:self-start">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--vo-accent)]">{dict.footer.contact}</h2>
                      <a
                        className="mt-3 inline-block text-lg font-bold text-[var(--vo-fg)] hover:text-[var(--vo-accent)]"
                        href={`mailto:${SITE_CONTACT.email}`}
                      >
                        {SITE_CONTACT.email}
                      </a>
                    </div>
                    {phoneHref && phoneLabel ? (
                      <div>
                        <p className="text-sm font-medium text-[var(--vo-muted)]">{dict.contactForm.phone}</p>
                        <a className="mt-1 inline-block text-lg font-bold text-[var(--vo-fg)] hover:text-[var(--vo-accent)]" href={phoneHref}>
                          {phoneLabel}
                        </a>
                      </div>
                    ) : null}
                    <div>
                      <p className="mt-3 text-sm text-[var(--vo-fg)]">{dict.footer.hours}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--vo-muted)]">{dict.footer.location}</p>
                      <p className="mt-1 text-sm text-[var(--vo-fg)]">{SITE_CONTACT.address}</p>
                    </div>
                  </aside>
                </div>
              </section>
            );
          }
          default:
            return null;
        }
      })}
      {pageId === "home" ? <ProcessSection dict={dict} /> : null}
    </>
  );
}
