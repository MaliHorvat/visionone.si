import { CookieBanner } from "@/components/public/CookieBanner";
import { ConsentScripts } from "@/components/public/ConsentScripts";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicNav } from "@/components/public/PublicNav";
import { CookieConsentProvider } from "@/context/CookieConsentContext";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip">
        <PublicNav />
        <main className="min-w-0 flex-1">{children}</main>
        <PublicFooter />
        <CookieBanner />
        <ConsentScripts />
      </div>
    </CookieConsentProvider>
  );
}
