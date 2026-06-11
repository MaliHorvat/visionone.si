"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isSignedIn } = useAuth();
  const { locale, dict } = useLocale();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const homeHref = localizedPath(locale, "/");
  const servicesHref = localizedPath(locale, "/storitve");
  const productsHref = localizedPath(locale, "/produkti");

  const submenuFor = (href: string): { baseHref: string; items: { id: string; label: string }[] } | null => {
    if (href === servicesHref && (dict.servicesMenu?.length ?? 0) > 0) {
      return { baseHref: servicesHref, items: dict.servicesMenu };
    }
    if (href === productsHref && (dict.productsMenu?.length ?? 0) > 0) {
      return { baseHref: productsHref, items: dict.productsMenu };
    }
    return null;
  };

  const openSub = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const scheduleCloseSub = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--vo-border)]/60 bg-[var(--vo-surface)]/80 backdrop-blur-xl">
      <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:px-6">
        <Link href={homeHref} className="vo-brand-link flex min-w-0 shrink items-center">
          <VisionOneLogo variant="both" tone="auto" size="md" />
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex">
          {links.map(({ href, label }) => {
            const active = href === homeHref ? pathname === homeHref || pathname === `${homeHref}/` : pathname.startsWith(href);
            const sub = submenuFor(href);

            if (sub) {
              const isOpen = openMenu === href;
              return (
                <div
                  key={href}
                  className="relative"
                  onMouseEnter={() => openSub(href)}
                  onMouseLeave={scheduleCloseSub}
                >
                  <Link
                    href={href}
                    aria-expanded={isOpen}
                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]"
                        : "text-[var(--vo-muted)] hover:bg-[var(--vo-surface-2)] hover:text-[var(--vo-fg)]"
                    }`}
                  >
                    {label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </Link>
                  {isOpen ? (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="w-64 overflow-hidden rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-2 shadow-[var(--vo-card-shadow)]">
                        {sub.items.map((item) => (
                          <Link
                            key={item.id}
                            href={`${sub.baseHref}#${item.id}`}
                            onClick={() => setOpenMenu(null)}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-[var(--vo-muted)] transition hover:bg-[var(--vo-surface-2)] hover:text-[var(--vo-accent)]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }

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
                const sub = submenuFor(href);
                return (
                  <div key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`min-h-11 rounded-xl px-3 py-2.5 text-base font-medium ${
                        active ? "bg-[var(--vo-accent-muted)] text-[var(--vo-accent)]" : "hover:bg-[var(--vo-surface-2)]"
                      } flex items-center`}
                    >
                      {label}
                    </Link>
                    {sub ? (
                      <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-[var(--vo-border)] pl-3">
                        {sub.items.map((item) => (
                          <Link
                            key={item.id}
                            href={`${sub.baseHref}#${item.id}`}
                            onClick={() => setOpen(false)}
                            className="min-h-10 rounded-lg px-3 py-2 text-sm font-medium text-[var(--vo-muted)] hover:bg-[var(--vo-surface-2)] hover:text-[var(--vo-accent)]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
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
