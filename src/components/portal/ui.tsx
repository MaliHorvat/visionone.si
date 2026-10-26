import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Skupni gradniki portala — slog „VisionOne Field"                    */
/* ------------------------------------------------------------------ */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const eur = new Intl.NumberFormat("sl-SI", { style: "currency", currency: "EUR" });
const num = new Intl.NumberFormat("sl-SI", { maximumFractionDigits: 2 });

export function formatEur(value: number) {
  return eur.format(Number.isFinite(value) ? value : 0);
}

export function formatNumber(value: number) {
  return num.format(Number.isFinite(value) ? value : 0);
}

export function formatDate(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("sl-SI", { day: "numeric", month: "numeric", year: "numeric" });
}

export function formatDateTime(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("sl-SI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* —— Glava strani —— */

export function PageHeader({
  title,
  subtitle,
  actions,
  back,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  back?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {back ? <div className="mb-2">{back}</div> : null}
        <h1 className="text-2xl font-semibold text-[var(--vo-fg)]">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-[var(--vo-muted)]">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold text-[var(--vo-fg)]">{children}</h2>
      {action}
    </div>
  );
}

/* —— Kartice —— */

export function Card({
  className,
  children,
  as: Tag = "div",
  ...rest
}: { as?: ElementType; className?: string; children?: ReactNode } & Record<string, unknown>) {
  return (
    <Tag
      className={cx(
        "rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)]",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({
  title,
  icon: Icon,
  action,
  description,
}: {
  title: ReactNode;
  icon?: ElementType;
  action?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--vo-border)] px-4 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="h-4 w-4 shrink-0 text-[var(--vo-accent)]" aria-hidden /> : null}
          <h3 className="text-sm font-semibold text-[var(--vo-fg)]">{title}</h3>
        </div>
        {description ? <p className="mt-0.5 text-xs text-[var(--vo-muted)]">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  value,
  label,
  tone = "default",
  href,
}: {
  value: ReactNode;
  label: ReactNode;
  tone?: "default" | "ok" | "danger" | "warn" | "accent";
  href?: string;
}) {
  const toneClass = {
    default: "text-[var(--vo-fg)]",
    ok: "text-[var(--vo-ok)]",
    danger: "text-[var(--vo-danger)]",
    warn: "text-[var(--vo-warn)]",
    accent: "text-[var(--vo-accent)]",
  }[tone];
  const body = (
    <>
      <div className={cx("text-xl font-semibold tabular-nums", toneClass)}>{value}</div>
      <div className="mt-1 text-xs leading-snug text-[var(--vo-muted)]">{label}</div>
    </>
  );
  const cls =
    "block min-h-[100px] rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] px-4 py-4";
  if (href) {
    return (
      <Link href={href} className={cx(cls, "transition-colors hover:border-[var(--vo-border-strong)] hover:bg-[var(--vo-surface-hover)]")}>
        {body}
      </Link>
    );
  }
  return <div className={cls}>{body}</div>;
}

export function QuickAction({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ElementType;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] px-3 py-4 text-center transition-colors hover:border-[var(--vo-border-strong)] hover:bg-[var(--vo-surface-hover)]"
    >
      <Icon className="h-5 w-5 text-[var(--vo-accent)]" aria-hidden />
      <span className="text-sm font-semibold text-[var(--vo-fg)]">{label}</span>
    </Link>
  );
}

export function EmptyState({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] px-4 py-4 text-sm text-[var(--vo-muted)]">
      <span>{children}</span>
      {action}
    </div>
  );
}

/* —— Gumbi —— */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const buttonBase =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--vo-accent-2)] text-white hover:bg-[var(--vo-accent)] hover:text-[var(--vo-accent-fg)]",
  secondary:
    "border border-[var(--vo-border-strong)] bg-[var(--vo-surface-2)] text-[var(--vo-fg)] hover:bg-[var(--vo-surface-hover)] hover:border-[var(--vo-muted)]",
  ghost: "text-[var(--vo-muted)] hover:bg-[var(--vo-surface-2)] hover:text-[var(--vo-fg)]",
  danger: "text-[var(--vo-danger)] hover:bg-[var(--vo-danger-muted)]",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "min-h-8 px-2.5 py-1 text-xs",
  md: "min-h-9 px-3.5 py-2 text-sm",
};

export function buttonClass(variant: ButtonVariant = "secondary", size: ButtonSize = "md") {
  return cx(buttonBase, buttonVariants[variant], buttonSizes[size]);
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button type={type} className={cx(buttonClass(variant, size), className)} {...rest} />;
}

/* —— Obrazci —— */

export const inputClass =
  "w-full min-h-10 rounded-md border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-sm text-[var(--vo-fg)] placeholder:text-[var(--vo-subtle)] outline-none transition-colors focus:border-[var(--vo-accent)] focus:ring-1 focus:ring-[var(--vo-accent)]";

export function Field({
  label,
  children,
  className,
  hint,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  hint?: ReactNode;
}) {
  return (
    <label className={cx("block text-sm", className)}>
      <span className="mb-1.5 block text-xs font-medium text-[var(--vo-muted)]">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-[var(--vo-subtle)]">{hint}</span> : null}
    </label>
  );
}

/* —— Oznake in obvestila —— */

type Tone = "ok" | "danger" | "warn" | "accent" | "neutral";

const badgeTones: Record<Tone, string> = {
  ok: "bg-[var(--vo-ok-muted)] text-[var(--vo-ok)]",
  danger: "bg-[var(--vo-danger-muted)] text-[var(--vo-danger)]",
  warn: "bg-[var(--vo-warn-muted)] text-[var(--vo-warn)]",
  accent: "bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]",
  neutral: "bg-[var(--vo-surface-2)] text-[var(--vo-muted)]",
};

export function Badge({ tone = "neutral", children, dot }: { tone?: Tone; children: ReactNode; dot?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium",
        badgeTones[tone],
      )}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </span>
  );
}

export function Notice({
  tone = "ok",
  children,
  onClose,
}: {
  tone?: Exclude<Tone, "neutral">;
  children: ReactNode;
  onClose?: () => void;
}) {
  const border = {
    ok: "border-[var(--vo-ok)]/30",
    danger: "border-[var(--vo-danger)]/30",
    warn: "border-[var(--vo-warn)]/30",
    accent: "border-[var(--vo-accent)]/30",
  }[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cx("flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm", border, badgeTones[tone])}
    >
      <div className="min-w-0">{children}</div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded px-1 text-current opacity-70 hover:opacity-100"
          aria-label="Zapri obvestilo"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}

export function DemoDataNotice({ children }: { children?: ReactNode }) {
  return (
    <Notice tone="warn">
      {children ?? (
        <>
          Baza ni povezana — prikazani so demo podatki, spremembe se ne shranijo. Nastavite{" "}
          <code className="rounded bg-black/20 px-1">DATABASE_URL</code> in poženite{" "}
          <code className="rounded bg-black/20 px-1">npm run db:push</code>.
        </>
      )}
    </Notice>
  );
}

/* —— Tabele —— */

export function TableWrap({ children, minWidth = 640 }: { children: ReactNode; minWidth?: number }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)]">
      <table className="w-full text-left text-sm" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

export const thClass =
  "border-b border-[var(--vo-border)] bg-[var(--vo-surface-2)] px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-[var(--vo-muted)]";
export const tdClass = "border-b border-[var(--vo-border)] px-4 py-3 align-middle";
export const trClass = "transition-colors hover:bg-[var(--vo-surface-hover)] [&:last-child>td]:border-0";
