"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { VisionOneLogo } from "@/components/brand/VisionOneLogo";
import { LanguageSwitcher } from "@/components/public/LanguageSwitcher";
import { localizedPath } from "@/i18n/config";
import { useLocale } from "@/context/LocaleContext";

type NavLink = { href: string; label: string };
type HeaderCta = { label: string; href: string; show: boolean };

type Props = {
  links?: NavLink[];
  headerCta?: HeaderCta;
  portalLoginLabel?: string;
};

export function PublicNav({ links = [], headerCta, portalLoginLabel }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { locale } = useLocale();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const homeHref = localizedPath(locale, "/");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--vo-border)]/60 bg-[var(--vo-surface)]/80 backdrop-blur-xl">
      <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:px-6">
        <Link href={homeHref} className="vo-brand-link flex min-w-0 shrink items-center">
          <VisionOneLogo variant="both" tone="auto" size="md" />
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex">
          {links.map(({ href, label }) => {
            const active = href === homeHref ? pathname === homeHref || pathname === `${homeHref}/` : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]"
                    : "text-[var(--vo-muted)] hover:bg-[var(--vo-surface-2)] hover:text-[var(--vo-fg)]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          {headerCta?.show !== false ? (
            <Link
              href={headerCta?.href ?? localizedPath(locale, "/kontakt#ponudba")}
              className="vo-btn-primary hidden rounded-xl px-4 py-2.5 text-sm font-bold text-white lg:inline-flex"
            >
              {headerCta?.label ?? "Contact"}
            </Link>
          ) : null}
          {isSignedIn ? (
            <Link
              href="/portal"
              className="hidden rounded-xl border border-[var(--vo-border)] px-3 py-2 text-sm font-semibold sm:inline-flex"
            >
              Portal
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="hidden rounded-xl border border-[var(--vo-border)] px-3 py-2 text-sm font-semibold text-[var(--vo-muted)] hover:text-[var(--vo-fg)] sm:inline-flex"
            >
              {portalLoginLabel ?? "Portal"}
            </Link>
          )}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[var(--vo-border)] lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Zapri meni" : "Odpri meni"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--vo-border)] bg-[var(--vo-surface)]/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto max-h-[min(70dvh,28rem)] max-w-6xl overflow-y-auto px-3 py-3 sm:px-4">
            <div className="flex flex-col gap-1">
              {links.map(({ href, label }) => {
                const active = href === homeHref ? pathname === homeHref : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`min-h-11 rounded-xl px-3 py-2.5 text-base font-medium ${
                      active ? "bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]" : "hover:bg-[var(--vo-surface-2)]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
            {headerCta?.show !== false ? (
              <Link
                href={headerCta?.href ?? localizedPath(locale, "/kontakt#ponudba")}
                onClick={() => setOpen(false)}
                className="vo-btn-primary mt-3 flex min-h-11 items-center justify-center rounded-xl text-base font-semibold text-white"
              >
                {headerCta?.label}
              </Link>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
