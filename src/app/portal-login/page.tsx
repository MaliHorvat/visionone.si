import type { Metadata } from "next";
import Link from "next/link";
import { safePortalRedirect } from "@/lib/portal-auth";

export const metadata: Metadata = {
  title: "Prijava v portal",
  robots: { index: false, follow: false },
};

type PortalLoginPageProps = {
  searchParams?: Promise<{ error?: string; next?: string }>;
};

const inputCls =
  "min-h-11 w-full rounded-md border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-base text-[var(--vo-fg)] outline-none transition-colors placeholder:text-[var(--vo-subtle)] focus:border-[var(--vo-accent)] focus:ring-1 focus:ring-[var(--vo-accent)] sm:text-sm";

export default async function PortalLoginPage({ searchParams }: PortalLoginPageProps) {
  const params = await searchParams;
  const showError = params?.error === "1";
  const next = safePortalRedirect(params?.next);

  return (
    <div className="vo-portal flex min-h-screen min-w-0 items-center justify-center px-4 py-8">
      <style>{`html,body{background:#111827}`}</style>
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--vo-accent-2)]">
            <span className="h-[18px] w-[18px] rounded-full border-[2.5px] border-white" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold text-[var(--vo-fg)]">VisionOne Portal</span>
            <span className="block text-xs text-[var(--vo-muted)]">Spremljanje strank in objektov</span>
          </span>
        </div>

        <div className="rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6">
          <h1 className="text-xl font-semibold text-[var(--vo-fg)]">Prijava</h1>
          <p className="mt-1 text-sm text-[var(--vo-muted)]">Dostop je omejen na pooblaščene uporabnike.</p>

          <form action="/api/portal-login" method="post" className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            <div>
              <label htmlFor="username" className="mb-1.5 block text-xs font-medium text-[var(--vo-muted)]">
                Uporabniško ime
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-[var(--vo-muted)]">
                Geslo
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={inputCls}
              />
            </div>

            {showError ? (
              <p
                role="alert"
                className="rounded-md border border-[var(--vo-danger)]/30 bg-[var(--vo-danger-muted)] px-3 py-2 text-sm text-[var(--vo-danger)]"
              >
                Napačno uporabniško ime ali geslo.
              </p>
            ) : null}

            <button
              type="submit"
              className="min-h-11 w-full rounded-md bg-[var(--vo-accent-2)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--vo-accent)] hover:text-[var(--vo-accent-fg)]"
            >
              Prijavi se
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--vo-subtle)]">
          <Link href="/" className="hover:text-[var(--vo-fg)]">
            ← Nazaj na visionone.si
          </Link>
        </p>
      </div>
    </div>
  );
}
