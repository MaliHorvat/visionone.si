"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_LINKS = [
  { href: "/", label: "Domov" },
  { href: "/storitve", label: "Storitve" },
  { href: "/produkti", label: "Produkti" },
  { href: "/kontakt", label: "Kontakt" },
];

type NavLink = { href: string; label: string };
type HeaderCta = { label: string; href: string; show: boolean };

type Props = {
  links?: NavLink[];
  headerCta?: HeaderCta;
};

export function PublicNav({ links = DEFAULT_LINKS, headerCta }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--vo-border)]/80 bg-[var(--vo-surface)]/85 backdrop-blur-lg">
      <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 md:px-6">
        <Link
          href="/"
          className="flex min-w-0 max-w-[min(100%,220px)] shrink items-center gap-1.5 font-semibold tracking-tight sm:max-w-none sm:gap-2"
        >
          <img src="/visionone-mark.png" alt="VisionOne znak" className="h-9 w-9 shrink-0 rounded object-contain sm:h-10 sm:w-10" />
          <img
            src="/visionone-wordmark.png"
            alt="VisionOne napis"
            className="h-6 max-h-7 w-auto max-w-[min(140px,42vw)] object-contain object-left sm:h-7 sm:max-w-none"
          />
        </Link>

        <nav className="hidden min-w-0 items-center gap-1 md:flex">
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
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
          {headerCta?.show !== false ? (
            <Link
              href={headerCta?.href ?? "/kontakt#ponudba"}
              className="hidden rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface-2)] px-3 py-2 text-sm font-semibold text-[var(--vo-fg)] transition hover:border-[var(--vo-accent)]/40 lg:inline-flex"
            >
              {headerCta?.label ?? "Dogovor za ogled"}
            </Link>
          ) : null}
          {isSignedIn ? (
            <>
              <UserButton />
              <Link
                href="/portal"
                className="vo-btn-primary hidden rounded-lg px-3 py-2 text-sm font-bold text-white sm:inline-flex sm:px-4"
              >
                Portal
              </Link>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="vo-btn-primary hidden rounded-lg px-3 py-2 text-sm font-bold text-white sm:inline-flex sm:px-4"
            >
              Prijava v portal
            </Link>
          )}

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--vo-border)] md:hidden"
            aria-expanded={open}
            aria-label={open ? "Zapri meni" : "Odpri meni"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--vo-border)] bg-[var(--vo-surface)] md:hidden">
          <nav className="mx-auto max-h-[min(70dvh,28rem)] max-w-6xl overflow-y-auto overscroll-y-contain px-3 py-3 sm:px-4">
            <div className="flex flex-col gap-1">
              {links.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`min-h-11 rounded-lg px-3 py-2.5 text-base font-medium ${
                      active ? "bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]" : "text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              {headerCta?.show !== false ? (
                <Link
                  href={headerCta?.href ?? "/kontakt#ponudba"}
                  onClick={() => setOpen(false)}
                  className="min-h-11 rounded-lg border border-[var(--vo-border)] px-3 py-2.5 text-center text-base font-semibold text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)]"
                >
                  {headerCta?.label ?? "Dogovor za ogled"}
                </Link>
              ) : null}
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-[var(--vo-border)] pt-3">
              {isSignedIn ? (
                <div className="flex min-h-11 items-center justify-between gap-3 px-1">
                  <span className="text-sm text-[var(--vo-muted)]">Račun</span>
                  <UserButton />
                </div>
              ) : null}
              {isSignedIn ? (
                <Link
                  href="/portal"
                  className="flex min-h-11 items-center justify-center rounded-lg bg-[var(--vo-accent)] px-4 text-base font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Portal
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="flex min-h-11 items-center justify-center rounded-lg bg-[var(--vo-accent)] px-4 text-base font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Prijava v portal
                </Link>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
