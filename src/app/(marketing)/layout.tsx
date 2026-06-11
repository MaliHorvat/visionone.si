import { headers } from "next/headers";
import { CookieBanner } from "@/components/public/CookieBanner";
import { ConsentScripts } from "@/components/public/ConsentScripts";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicNav } from "@/components/public/PublicNav";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { DEFAULT_LOCALE, isLocale, localizedPath } from "@/i18n/config";
import { navFromDict } from "@/i18n/build-blocks";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const rawLocale = h.get("x-vo-locale") ?? DEFAULT_LOCALE;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  const prefix = locale === "sl" ? "" : `/${locale}`;
  const navLinks = navFromDict(dict, prefix).map((link) => ({
    ...link,
    href: link.href === prefix || link.href === "" ? localizedPath(locale, "/") : link.href,
  }));

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <CookieConsentProvider>
        <div className="vo-mesh-bg flex min-h-screen min-w-0 flex-col overflow-x-clip">
          <PublicNav
            links={navLinks}
            headerCta={{ label: dict.nav.headerCta, href: localizedPath(locale, "/kontakt#ponudba"), show: true }}
            portalLoginLabel={dict.nav.portalLogin}
          />
          <main className="min-w-0 flex-1">{children}</main>
          <PublicFooter locale={locale} dict={dict} />
          <CookieBanner />
          <ConsentScripts />
        </div>
      </CookieConsentProvider>
    </LocaleProvider>
  );
}
