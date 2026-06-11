"use client";

import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LOCALE_META, LOCALES, localizedPath, parseLocaleFromSlug, type Locale } from "@/i18n/config";
import { useLocale } from "@/context/LocaleContext";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale: currentLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const segments = pathname.split("/").filter(Boolean);
  const { slugPath } = parseLocaleFromSlug(segments);
  const slug = slugPath.length ? slugPath.join("/") : "";

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function switchLocale(next: Locale) {
    if (next === currentLocale) {
      setOpen(false);
      return;
    }
    const path = slug ? `/${slug}` : "/";
    const href = localizedPath(next, path);
    document.cookie = `vo_locale=${next};path=/;max-age=31536000;SameSite=Lax`;
    setOpen(false);
    // Polna osvežitev — da se prevede tudi deljena postavitev (nav, noga, obrazec).
    window.location.assign(href);
  }

  const current = LOCALE_META[currentLocale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)]/90 px-2.5 py-1.5 text-xs font-semibold text-[var(--vo-fg)] backdrop-blur-sm transition hover:border-[var(--vo-accent)]/40"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Izberite jezik"
      >
        <span aria-hidden>{current.flag}</span>
        <span>{current.native}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-[var(--vo-muted)] transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[10rem] overflow-hidden rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] py-1 shadow-[var(--vo-card-shadow)]"
        >
          {LOCALES.map((loc) => {
            const meta = LOCALE_META[loc];
            const active = loc === currentLocale;
            return (
              <li key={loc} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => switchLocale(loc)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                    active
                      ? "bg-[var(--vo-accent-muted)] font-semibold text-[var(--vo-accent)]"
                      : "text-[var(--vo-fg)] hover:bg-[var(--vo-surface-2)]"
                  }`}
                >
                  <span aria-hidden>{meta.flag}</span>
                  <span>{meta.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
