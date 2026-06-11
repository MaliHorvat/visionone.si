import Link from "next/link";
import { CookieSettingsButton } from "@/components/public/CookieSettingsButton";
import { SITE_CONTACT, sitePhoneHref, sitePhoneLabel } from "@/lib/site-contact";

const footerLinks = [
  { href: "/", label: "Domov" },
  { href: "/storitve", label: "Storitve" },
  { href: "/produkti", label: "Produkti" },
  { href: "/kontakt", label: "Kontakt" },
];

export function PublicFooter() {
  const phoneHref = sitePhoneHref();
  const phoneLabel = sitePhoneLabel();

  return (
    <footer className="mt-auto border-t border-[var(--vo-border)] bg-[var(--vo-fg)] text-[#c8d0dc]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <img src="/visionone-mark.png" alt="VisionOne znak" className="h-9 w-9 rounded object-contain" />
              <img src="/visionone-wordmark.png" alt="VisionOne napis" className="h-6 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#94a3b8]">
              Videonadzor, domofoni, omrežja in 24/7 proaktivna podpora za podjetja in stanovanjske sklope.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--vo-accent-2)]">Navigacija</p>
            <ul className="mt-4 space-y-2 text-sm">
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
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--vo-accent-2)]">Kontakt</p>
            <a className="mt-4 block text-sm font-semibold text-white hover:text-[var(--vo-accent-2)]" href={`mailto:${SITE_CONTACT.email}`}>
              {SITE_CONTACT.email}
            </a>
            {phoneHref && phoneLabel ? (
              <a className="mt-2 block text-sm text-[#94a3b8] hover:text-white" href={phoneHref}>
                {phoneLabel}
              </a>
            ) : null}
            <Link className="mt-3 inline-block text-sm text-[#94a3b8] hover:text-white" href="/kontakt#ponudba">
              Kontaktni obrazec →
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-[#64748b] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link className="hover:text-white" href="/zasebnost">
              Zasebnost
            </Link>
            <Link className="hover:text-white" href="/piskotki">
              Piškotki
            </Link>
            <CookieSettingsButton className="inline-flex min-h-11 items-center text-[#64748b] hover:text-white sm:min-h-0" />
          </div>
          <p>© {new Date().getFullYear()} VisionOne</p>
        </div>
      </div>
    </footer>
  );
}
