import Link from "next/link";
import { CookieSettingsButton } from "@/components/public/CookieSettingsButton";
import { VisionOneLogo } from "@/components/brand/VisionOneLogo";
import { localizedPath, type Locale } from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/types";
import { SITE_CONTACT, sitePhoneHref, sitePhoneLabel } from "@/lib/site-contact";

export function PublicFooter({ locale, dict }: { locale: Locale; dict: SiteDictionary }) {
  const phoneHref = sitePhoneHref();
  const phoneLabel = sitePhoneLabel();
  const prefix = locale === "sl" ? "" : `/${locale}`;

  const footerLinks = dict.routes.map((r) => ({
    href: r.slug === "" ? localizedPath(locale, "/") : `${prefix}/${r.slug}`.replace("//", "/"),
    label: r.label,
  }));

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#050a12] text-[#c8d0dc]">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href={localizedPath(locale, "/")} className="vo-brand-link inline-flex max-w-full items-center">
              <VisionOneLogo variant="both" tone="on-dark" size="lg" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#94a3b8]">{dict.footer.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {dict.trustStrip.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#cbd5e1]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--vo-accent-2)]">{dict.footer.navigation}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--vo-accent-2)]">{dict.footer.contact}</p>
            <a
              className="mt-4 block text-sm font-semibold text-white hover:text-[var(--vo-accent-2)]"
              href={`mailto:${SITE_CONTACT.email}`}
            >
              {SITE_CONTACT.email}
            </a>
            {phoneHref && phoneLabel ? (
              <a className="mt-2 block text-sm text-[#94a3b8] hover:text-white" href={phoneHref}>
                {phoneLabel}
              </a>
            ) : null}
            <p className="mt-3 text-xs text-[#64748b]">{dict.footer.hours}</p>
            <p className="text-xs text-[#64748b]">{dict.footer.location}</p>
            <Link
              className="mt-4 inline-block text-sm font-medium text-[var(--vo-accent-2)] hover:text-white"
              href={localizedPath(locale, "/kontakt#ponudba")}
            >
              {dict.footer.contactForm}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-[#64748b] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link className="hover:text-white" href="/zasebnost">
              {dict.footer.privacy}
            </Link>
            <Link className="hover:text-white" href="/piskotki">
              {dict.footer.cookies}
            </Link>
            <CookieSettingsButton className="inline-flex min-h-11 items-center hover:text-white sm:min-h-0" />
          </div>
          <p>
            © {new Date().getFullYear()} VisionOne. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
