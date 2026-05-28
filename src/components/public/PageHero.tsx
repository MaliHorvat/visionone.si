import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="vo-page-hero relative overflow-hidden border-b border-[var(--vo-border)]">
      <div className="pointer-events-none absolute inset-0 vo-mesh-bg opacity-80" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16 md:px-6 md:py-20">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vo-accent)]">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-balance text-3xl font-bold tracking-tight text-[var(--vo-fg)] sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--vo-muted)] md:text-lg">{description}</p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
