import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
};

/** Dekorativni pas namesto prazne slike — gradient + ikona. */
export function VisualBand({ icon: Icon, title, subtitle }: Props) {
  return (
    <div className="vo-visual-band relative overflow-hidden rounded-2xl border border-[var(--vo-border)] px-6 py-10 sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[var(--vo-accent)]/10 blur-2xl" aria-hidden />
      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--vo-accent-muted)] text-[var(--vo-accent)] shadow-[var(--vo-glow-sm)]">
            <Icon className="h-7 w-7" aria-hidden />
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--vo-fg)] sm:text-xl">{title}</p>
            {subtitle ? <p className="mt-1 text-sm text-[var(--vo-muted)]">{subtitle}</p> : null}
          </div>
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-[var(--vo-accent)]/30 to-transparent sm:block" aria-hidden />
      </div>
    </div>
  );
}
