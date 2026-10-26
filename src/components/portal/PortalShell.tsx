"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  Boxes,
  CalendarClock,
  Camera,
  Clock,
  ExternalLink,
  FileText,
  Home,
  LogOut,
  Menu,
  Package,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { usePortalRole, type PortalRole } from "@/context/PortalRoleContext";
import { mockClientPortalClientId } from "@/lib/mock-data";
import { cx } from "./ui";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: PortalRole[];
  exact?: boolean;
};

type NavGroup = { title?: string; items: NavItem[] };

const groups: NavGroup[] = [
  {
    items: [
      { href: "/portal", label: "Danes", icon: Home, roles: ["admin", "client"], exact: true },
      { href: "/portal/stranke", label: "Stranke", icon: Users, roles: ["admin"] },
      {
        href: `/portal/stranke/${mockClientPortalClientId}`,
        label: "Moj objekt",
        icon: Camera,
        roles: ["client"],
      },
      { href: "/portal/opomniki", label: "Opomniki", icon: CalendarClock, roles: ["admin", "client"] },
      { href: "/portal/ponudbe", label: "Ponudbe", icon: FileText, roles: ["admin"] },
    ],
  },
  {
    title: "Teren",
    items: [
      { href: "/portal/orodja", label: "Orodja", icon: Wrench, roles: ["admin", "client"] },
      { href: "/portal/cas", label: "Beleženje časa", icon: Clock, roles: ["admin"] },
      { href: "/portal/inventar", label: "Inventar", icon: Boxes, roles: ["admin"] },
    ],
  },
  {
    title: "Nastavitve",
    items: [
      { href: "/portal/paketi", label: "Paketi", icon: Package, roles: ["admin"] },
      { href: "/portal/obvestila", label: "Obvestila", icon: Bell, roles: ["admin"] },
    ],
  },
];

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

function BrandBlock({ subtitle }: { subtitle: string }) {
  return (
    <Link href="/portal" className="flex min-w-0 items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--vo-accent-2)]">
        <span className="h-4 w-4 rounded-full border-[2.5px] border-white" aria-hidden />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[15px] font-semibold text-[var(--vo-fg)]">VisionOne Portal</span>
        <span className="block truncate text-xs text-[var(--vo-muted)]">{subtitle}</span>
      </span>
    </Link>
  );
}

function NavLinks({
  pathname,
  role,
  onNavigate,
}: {
  pathname: string;
  role: PortalRole;
  onNavigate?: () => void;
}) {
  // Najbolj specifična aktivna povezava (npr. /portal/stranke/c1 → "Moj objekt", ne "Stranke").
  const all = groups.flatMap((g) => g.items).filter((i) => i.roles.includes(role));
  const activeHref = all
    .filter((i) => isActive(pathname, i))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <nav className="flex flex-col gap-4" aria-label="Glavna navigacija">
      {groups.map((group, gi) => {
        const items = group.items.filter((i) => i.roles.includes(role));
        if (items.length === 0) return null;
        return (
          <div key={gi} className="flex flex-col gap-0.5">
            {group.title ? (
              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--vo-subtle)]">
                {group.title}
              </p>
            ) : null}
            {items.map((item) => {
              const active = item.href === activeHref;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors",
                    active
                      ? "bg-[var(--vo-accent-muted)] font-semibold text-[var(--vo-fg)]"
                      : "font-medium text-[var(--vo-muted)] hover:bg-[var(--vo-surface)] hover:text-[var(--vo-fg)]",
                  )}
                >
                  <Icon
                    className={cx("h-[18px] w-[18px] shrink-0", active ? "text-[var(--vo-accent)]" : "")}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ role, setRole }: { role: PortalRole; setRole: (r: PortalRole) => void }) {
  return (
    <div className="space-y-3 border-t border-[var(--vo-border)] p-3">
      <div>
        <p className="px-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--vo-subtle)]">
          Pogled
        </p>
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-[var(--vo-bg)] p-1" role="radiogroup" aria-label="Pogled portala">
          {(
            [
              ["admin", "Skrbnik"],
              ["client", "Stranka"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={role === value}
              onClick={() => setRole(value)}
              className={cx(
                "rounded-md px-2 py-1.5 text-xs font-semibold transition-colors",
                role === value
                  ? "bg-[var(--vo-surface-2)] text-[var(--vo-fg)] shadow-sm"
                  : "text-[var(--vo-muted)] hover:text-[var(--vo-fg)]",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-[var(--vo-muted)] hover:bg-[var(--vo-surface)] hover:text-[var(--vo-fg)]"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          Javna stran
        </Link>
        <form action="/api/portal-logout" method="post">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-[var(--vo-muted)] hover:bg-[var(--vo-surface)] hover:text-[var(--vo-fg)]"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            Odjava
          </button>
        </form>
      </div>
    </div>
  );
}

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, setRole } = usePortalRole();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const subtitle = role === "admin" ? "Skrbnik" : "Predogled: stranka";

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  return (
    <div className="vo-portal flex min-h-screen">
      {/* Namizna stranska vrstica */}
      <aside className="vo-no-print sticky top-0 hidden h-screen w-[230px] shrink-0 flex-col border-r border-[var(--vo-border)] bg-[var(--vo-sidebar)] md:flex">
        <div className="px-4 pb-4 pt-5">
          <BrandBlock subtitle={subtitle} />
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <NavLinks pathname={pathname} role={role} />
        </div>
        <SidebarFooter role={role} setRole={setRole} />
      </aside>

      {/* Mobilni predal */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Meni">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Zapri meni"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-[300px] flex-col border-r border-[var(--vo-border)] bg-[var(--vo-sidebar)]">
            <div className="flex items-center justify-between gap-2 px-4 pb-4 pt-5">
              <BrandBlock subtitle={subtitle} />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-md p-2 text-[var(--vo-muted)] hover:bg-[var(--vo-surface)] hover:text-[var(--vo-fg)]"
                aria-label="Zapri meni"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 pb-4">
              <NavLinks pathname={pathname} role={role} onNavigate={() => setDrawerOpen(false)} />
            </div>
            <div className="vo-safe-bottom">
              <SidebarFooter role={role} setRole={setRole} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobilna glava */}
        <header className="vo-no-print sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-[var(--vo-border)] bg-[var(--vo-sidebar)]/95 px-3 py-2.5 backdrop-blur md:hidden">
          <BrandBlock subtitle={subtitle} />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-2 text-[var(--vo-fg)] hover:bg-[var(--vo-surface)]"
            aria-label="Odpri meni"
            aria-expanded={drawerOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {role === "client" ? (
          <div className="vo-no-print border-b border-[var(--vo-border)] bg-[var(--vo-accent-muted)] px-4 py-2 text-xs text-[var(--vo-accent)] md:px-7">
            Predogled portala, kot ga vidi stranka.{" "}
            <button type="button" onClick={() => setRole("admin")} className="font-semibold underline underline-offset-2">
              Nazaj na skrbniški pogled
            </button>
          </div>
        ) : null}

        <main className="w-full max-w-[1180px] flex-1 px-4 py-6 md:px-7 md:py-7">{children}</main>
      </div>
    </div>
  );
}
