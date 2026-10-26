import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { SITE_CONTACT } from "@/lib/site-contact";
import { getCopy, href } from "@/site";
import { CookieSettingsLink } from "../CookieSettingsLink";

const UPDATED = "26. 10. 2026";

function LegalShell({ locale, title, children }: { locale: Locale; title: string; children: React.ReactNode }) {
  const t = getCopy(locale);
  return (
    <section className="s-section tight">
      <div className="s-wrap">
        <article className="s-legal" lang="sl">
          <h1>{title}</h1>
          <p className="s-legal-meta">
            {t.legal.onlySlovenian ? <span lang={locale}>{t.legal.onlySlovenian} </span> : null}
            {t.legal.updated}: {UPDATED}
          </p>
          {children}
        </article>
      </div>
    </section>
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const mail = SITE_CONTACT.email;
  return (
    <LegalShell locale={locale} title="Politika zasebnosti">
      <h2>Upravljavec</h2>
      <p>
        Upravljavec osebnih podatkov je VisionOne. Za vsa vprašanja o zasebnosti nam pišite na <a href={`mailto:${mail}`}>{mail}</a>.
      </p>

      <h2>Katere podatke zbiramo</h2>
      <ul>
        <li>
          <strong>Povpraševanje prek obrazca:</strong> ime, e-pošta in/ali telefon, po želji podjetje, vrsta objekta in število
          kamer ter sporočilo. Za zaščito pred zlorabo shranimo tudi IP naslov in čas oddaje.
        </li>
        <li>
          <strong>Statistika obiska:</strong> Vercel Web Analytics šteje oglede strani brez piškotkov in brez prepoznavanja
          posameznika.
        </li>
        <li>
          <strong>Analitika in oglaševanje:</strong> Google Analytics, Google Ads in Meta Pixel naložimo samo, če to dovolite v
          nastavitvah piškotkov.
        </li>
      </ul>

      <h2>Zakaj in na kateri podlagi</h2>
      <p>
        Podatke iz povpraševanja uporabimo, da vam odgovorimo, se dogovorimo za ogled in pripravimo ponudbo (ukrepi pred
        sklenitvijo pogodbe). Analitiko in oglaševalske piškotke uporabljamo samo na podlagi vašega soglasja, ki ga lahko kadar
        koli prekličete.
      </p>

      <h2>Kje so podatki</h2>
      <p>
        Povpraševanja se shranijo v naš portal za vodenje strank (portal.visionone.si). Stran in portal gostujeta pri ponudniku
        Vercel. Kadar je vklopljeno obveščanje po e-pošti, povpraševanje pošljemo na naš e-naslov prek ponudnika Resend. Podatkov
        ne prodajamo in jih ne posredujemo drugim za njihove namene.
      </p>

      <h2>Kako dolgo jih hranimo</h2>
      <p>
        Povpraševanja hranimo, dokler je to potrebno za odgovor in morebitno sodelovanje. Če postanete naša stranka, podatke
        hranimo v skladu z računovodskimi in drugimi zakonskimi roki.
      </p>

      <h2>Vaše pravice</h2>
      <p>
        Zahtevate lahko dostop do svojih podatkov, popravek, izbris, omejitev obdelave ali prenos, in ugovarjate obdelavi. Pišite
        na <a href={`mailto:${mail}`}>{mail}</a>. Če menite, da podatke obdelujemo nezakonito, se lahko obrnete na
        Informacijskega pooblaščenca (ip-rs.si).
      </p>

      <h2>Piškotki</h2>
      <p>
        Podrobnosti so na strani <Link href={href(locale, "/piskotki")}>Piškotki</Link>. Izbiro lahko spremenite v{" "}
        <CookieSettingsLink label="nastavitvah piškotkov" className="s-inline-btn" />.
      </p>
    </LegalShell>
  );
}

export function CookiesPage({ locale }: { locale: Locale }) {
  return (
    <LegalShell locale={locale} title="Piškotki">
      <p>
        Spodaj je seznam vsega, kar stran shrani v vaš brskalnik ali naloži od drugih ponudnikov. Izbiro lahko kadar koli
        spremenite: <CookieSettingsLink label="odprite nastavitve piškotkov" className="s-inline-btn" />.
      </p>

      <h2>Nujni (vedno vklopljeni)</h2>
      <ul>
        <li>
          <code>vo_cookie_consent_v1</code> v lokalni shrambi brskalnika: vaša izbira glede piškotkov.
        </li>
        <li>
          <code>vo_locale</code> (piškotek, 1 leto): izbrani jezik strani.
        </li>
      </ul>

      <h2>Statistika brez piškotkov</h2>
      <p>Vercel Web Analytics šteje oglede strani brez piškotkov in brez prepoznavanja posameznega obiskovalca.</p>

      <h2>Analitika (z vašim soglasjem)</h2>
      <p>Google Analytics 4: koliko obiskovalcev pride, od kod in katere strani berejo. Uporabimo ga, da izboljšamo stran.</p>

      <h2>Oglaševanje (z vašim soglasjem)</h2>
      <p>Meta Pixel in Google Ads: merjenje, ali so obiskovalci prišli prek naših oglasov in ali so poslali povpraševanje.</p>

      <p>
        Več o obdelavi podatkov v <Link href={href(locale, "/zasebnost")}>politiki zasebnosti</Link>.
      </p>
    </LegalShell>
  );
}
