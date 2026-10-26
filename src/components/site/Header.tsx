"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALE_META, LOCALES, parseLocaleFromSlug, type Locale } from "@/i18n/config";
import { getCopy, getSoftware, href } from "@/site";
import { SITE_CONTACT } from "@/lib/site-contact";

type Props = { locale: Locale };

export function Header({ locale }: Props) {
  const t = getCopy(locale);
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const { slugPath } = parseLocaleFromSlug(pathname.split("/").filter(Boolean));
  const current = "/" + slugPath.join("/");

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links: { path: string; label: string }[] = [
    { path: "/", label: t.nav.home },
    { path: "/storitve", label: t.nav.services },
    { path: "/produkti", label: getSoftware(locale).nav },
    { path: "/kontakt", label: t.nav.contact },
  ];

  function switchLocale(next: Locale) {
    document.cookie = `vo_locale=${next};path=/;max-age=31536000;SameSite=Lax`;
    window.location.href = href(next, current) + window.location.hash;
  }

  return (
    <header className={`s-header${open ? " open" : ""}`}>
      <a className="s-skip" href="#vsebina">
        {t.nav.skip}
      </a>
      <div className="s-wrap">
        <Link className="s-logo" href={href(locale, "/")} aria-label="VisionOne">
          <img className="mark" src="/brand/mark.png" alt="" width={36} height={36} />
          <img className="word" src="/brand/wordmark.png" alt="VisionOne" height={17} />
        </Link>
        <nav className="s-nav" id="s-nav" aria-label="Glavni meni">
          {links.map((l) => {
            const active = l.path === "/" ? current === "/" : current === l.path || current.startsWith(l.path + "/");
            return (
              <Link key={l.path} href={href(locale, l.path)} aria-current={active ? "page" : undefined}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="s-header-end">
          <span className="s-lang">
            <select aria-label={t.nav.language} value={locale} onChange={(e) => switchLocale(e.target.value as Locale)}>
              {LOCALES.map((l) => (
                <option key={l} value={l}>
                  {LOCALE_META[l].native}
                </option>
              ))}
            </select>
          </span>
          <a className="s-phone" href={`mailto:${SITE_CONTACT.email}`}>
            {SITE_CONTACT.email}
          </a>
          <Link className="s-btn s-btn-primary" href={href(locale, "/kontakt#povprasevanje")}>
            {t.nav.cta}
          </Link>
          <button
            type="button"
            className="s-menu-btn"
            aria-expanded={open}
            aria-controls="s-nav"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
