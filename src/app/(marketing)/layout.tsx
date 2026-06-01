import { CookieBanner } from "@/components/public/CookieBanner";
import { ConsentScripts } from "@/components/public/ConsentScripts";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicNav } from "@/components/public/PublicNav";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { buildNavLinks, getMarketingSiteContent } from "@/lib/marketing-site/fetch";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const site = await getMarketingSiteContent();
  const navLinks = buildNavLinks(site);

  return (
    <CookieConsentProvider>
      <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip">
        <PublicNav links={navLinks} headerCta={site.headerCta} />
        <main className="min-w-0 flex-1">{children}</main>
        <PublicFooter />
        <CookieBanner />
        <ConsentScripts />
      </div>
    </CookieConsentProvider>
  );
}
