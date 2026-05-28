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
  /** `contain` = celotna slika; `cover` = zapolni polje (lahko z `anchor`). */
  fit?: "cover" | "contain";
  /** Pri `cover` — sidro, da se zgornji del slike ne odreže (`top` priporočeno za storitve). */
  anchor?: "center" | "top";
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
  anchor = "center",
}: Props) {
  if (src) {
    const anchorClass = anchor === "top" ? "object-top" : "object-center";
    const objectClass =
      fit === "contain" ? "object-contain object-center" : `object-cover ${anchorClass}`;
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
      className={`flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-[var(--vo-accent)]/25 bg-gradient-to-br from-[var(--vo-surface)] to-[var(--vo-accent-muted)] px-4 py-10 text-center ${aspectClass} ${className}`}
      aria-label={`Predvidena slika: ${codeLabel}`}
    >
      <span className="font-mono text-xs font-semibold tracking-wide text-[var(--vo-accent)]">{codeLabel}</span>
      <p className="mt-2 text-sm text-[var(--vo-muted)]">Slika bo kmalu dodana</p>
    </div>
  );
}
