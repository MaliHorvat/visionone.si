import Image from "next/image";

type Props = {
  /** Isto ime kot konstanta v `marketing-images.ts` (za urejanje v kodi). */
  codeLabel: string;
  /** Pot do datoteke v `public/` ali `null` = črtkano mesto za kasnejšo sliko */
  src: string | null;
  alt: string;
  className?: string;
  /** Razmerje stranic zabojnika, npr. `aspect-[21/9]` ali `aspect-video` */
  aspectClass?: string;
  /** `contain` = celotna slika na sredini brez odrezavanja (primerno za storitvene kartice). */
  fit?: "cover" | "contain";
};

/**
 * Če je `src` nastavljen — `next/image`. Če je `null` — označeno mesto, kje dodati sliko.
 */
export function MarketingImageSlot({
  codeLabel,
  src,
  alt,
  className = "",
  aspectClass = "aspect-[2/1] max-h-[min(100vw,28rem)] min-h-[120px] sm:aspect-[21/9]",
  fit = "cover",
}: Props) {
  if (src) {
    const objectClass = fit === "contain" ? "object-contain object-center" : "object-cover";
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface-2)] ${aspectClass} ${className}`}
      >
        <Image src={src} alt={alt} fill className={objectClass} sizes="(max-width: 768px) 100vw, 72rem" />
      </div>
    );
  }

  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-[var(--vo-border)] bg-[var(--vo-surface-2)] px-4 py-8 text-center ${aspectClass} ${className}`}
      aria-label={`Predvidena slika: ${codeLabel}`}
    >
      <span className="font-mono text-xs font-semibold tracking-wide text-[var(--vo-accent)]">{codeLabel}</span>
      <p className="mt-3 max-w-lg text-xs leading-relaxed text-[var(--vo-muted)]">
        Ko dodaš sliko v mapo <code className="rounded bg-[var(--vo-bg)] px-1 py-0.5 font-mono">public/</code>, v
        datoteki <code className="rounded bg-[var(--vo-bg)] px-1 py-0.5 font-mono">src/lib/marketing-images.ts</code>{" "}
        nastavi konstanto <code className="rounded bg-[var(--vo-bg)] px-1 py-0.5 font-mono">{codeLabel}</code> na pot,
        npr. <code className="rounded bg-[var(--vo-bg)] px-1 py-0.5 font-mono">&quot;/fotografija.webp&quot;</code>.
      </p>
    </div>
  );
}
