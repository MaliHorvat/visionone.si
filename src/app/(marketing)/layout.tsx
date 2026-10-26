import { headers } from "next/headers";
import { CookieBanner } from "@/components/site/CookieBanner";
import { ConsentScripts } from "@/components/site/ConsentScripts";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { toLocale } from "@/site";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const locale = toLocale((await headers()).get("x-vo-locale"));

  return (
    <CookieConsentProvider>
      <div className="site">
        <Header locale={locale} />
        <main id="vsebina" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
        <CookieBanner locale={locale} />
        <ConsentScripts />
      </div>
    </CookieConsentProvider>
  );
}
