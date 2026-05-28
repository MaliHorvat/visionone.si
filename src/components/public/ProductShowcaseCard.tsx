import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type ProductShowcaseCardProps = {
  imageSrc: string;
  imageAlt: string;
  label: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel?: string;
  /** Če true, prva kartica dobi priority za LCP. */
  priorityImage?: boolean;
};

/**
 * Kartica produkta: vizual levo, besedilo desno (na mobilnem pod vizualom) — podobno referenčni postavitvi.
 */
export function ProductShowcaseCard({
  imageSrc,
  imageAlt,
  label,
  title,
  description,
  ctaHref,
  ctaLabel = "Spoznajte več",
  priorityImage = false,
}: ProductShowcaseCardProps) {
  return (
    <article className="vo-card-hover overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] shadow-[var(--vo-card-shadow)] md:grid md:grid-cols-2">
      <div className="relative aspect-[4/3] min-h-[200px] w-full bg-[var(--vo-surface-2)] md:aspect-auto md:min-h-[280px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priorityImage}
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center bg-[var(--vo-bg)] px-5 py-7 sm:px-6 sm:py-8 md:px-10 md:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vo-accent)]">{label}</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--vo-fg)] md:text-3xl">{title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-[var(--vo-muted)] md:text-base">{description}</p>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex min-h-11 w-fit items-center gap-1 py-2 text-sm font-bold text-[var(--vo-accent)] hover:text-[var(--vo-accent-hover)] sm:min-h-0 sm:py-0"
        >
          {ctaLabel}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
