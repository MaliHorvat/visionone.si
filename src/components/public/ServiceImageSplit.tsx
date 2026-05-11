import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
  /** Vsebina desno (ali spodaj na mobilnem). */
  children: ReactNode;
  reverse?: boolean;
  priority?: boolean;
};

/** Vizual + besedilo — za predstavitev terenskih storitev (npr. videonadzor). */
export function ServiceImageSplit({ imageSrc, imageAlt, children, reverse = false, priority = false }: Props) {
  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] shadow-[var(--vo-card-shadow)] md:grid-cols-2">
      <div
        className={`relative aspect-[16/10] min-h-[220px] w-full min-w-0 bg-[var(--vo-surface-2)] md:min-h-[min(52vh,380px)] ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <div
        className={`min-w-0 flex flex-col justify-center px-5 py-7 sm:px-6 sm:py-8 md:px-10 md:py-12 ${reverse ? "md:order-1" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
