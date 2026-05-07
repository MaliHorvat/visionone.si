"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const links = [
  { href: "/", label: "Domov" },
  { href: "/storitve", label: "Storitve" },
  { href: "/vzdrzevalni-paketi", label: "Vzdrževalni paketi" },
  { href: "/reference", label: "Reference" },
  { href: "/kontakt", label: "Kontakt" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--vo-border)] bg-[var(--vo-surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]"
            aria-hidden
          >
            V1
          </span>
          <span className="text-lg text-[var(--vo-fg)]">
            Vision<span className="text-[var(--vo-accent)]">One</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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

        <div className="flex items-center gap-2">
          <Link
            href="/kontakt#ponudba"
            className="hidden rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface-2)] px-3 py-2 text-sm font-semibold text-[var(--vo-fg)] hover:bg-[var(--vo-surface)] lg:inline-flex"
          >
            Brezplačen ogled
          </Link>
          <ThemeToggle className="hidden sm:inline-flex" />
          {isSignedIn ? (
            <>
              <UserButton />
              <Link
                href="/portal"
                className="hidden rounded-lg bg-[var(--vo-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--vo-accent-hover)] sm:inline-flex"
              >
                Portal
              </Link>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="hidden rounded-lg bg-[var(--vo-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--vo-accent-hover)] sm:inline-flex"
            >
              Prijava v portal
            </Link>
          )}

          <button
            type="button"
            className="inline-flex rounded-lg border border-[var(--vo-border)] p-2 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Zapri meni" : "Odpri meni"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--vo-border)] bg-[var(--vo-surface)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)]"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-[var(--vo-border)] pt-3">
              <ThemeToggle />
              {isSignedIn ? (
                <Link
                  href="/portal"
                  className="rounded-lg bg-[var(--vo-accent)] px-4 py-2 text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Portal
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="rounded-lg bg-[var(--vo-accent)] px-4 py-2 text-sm font-semibold text-white"
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
