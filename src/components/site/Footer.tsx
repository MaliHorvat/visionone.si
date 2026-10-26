import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { SITE_CONTACT, sitePhoneHref, sitePhoneLabel } from "@/lib/site-contact";
import { getCopy, getSoftware, href, PORTAL_URL, SOFTWARE_LINKS } from "@/site";
import { CookieSettingsLink } from "./CookieSettingsLink";

export function Footer({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const phone = sitePhoneLabel();
  const phoneHref = sitePhoneHref();
  const year = new Date().getFullYear();
  const footerServices = t.services.filter((s) => ["videonadzor", "alarm", "pozar", "domofon", "mreza", "servis"].includes(s.id));

  return (
    <footer className="s-footer">
      <div className="s-wrap">
        <div className="grid">
          <div className="about">
            <span className="logo-light s-logo">
              <img className="mark" src="/brand/mark.png" alt="" width={36} height={36} />
              <img className="word" src="/brand/wordmark.png" alt="VisionOne" height={17} />
            </span>
            <p>{t.footer.about}</p>
          </div>
          <div>
            <h2 className="s-foot-h">{t.footer.services}</h2>
            <ul>
              {footerServices.map((s) => (
                <li key={s.id}>
                  <Link href={href(locale, `/storitve#${s.id}`)}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="s-foot-h">
              <Link href={href(locale, "/produkti")}>{getSoftware(locale).nav}</Link>
            </h2>
            <ul>
              {getSoftware(locale).items.map((it) => (
                <li key={it.id}>
                  <Link href={href(locale, SOFTWARE_LINKS[it.id].page ?? `/produkti#${it.id}`)}>{it.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="s-foot-h">{t.footer.contact}</h2>
            <ul>
              <li>
                <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
              </li>
              {phone && phoneHref ? (
                <li>
                  <a href={phoneHref}>{phone}</a>
                </li>
              ) : null}
              <li>{t.contactPage.hoursValue}</li>
              <li>
                <Link href={href(locale, "/kontakt")}>{t.form.title}</Link>
              </li>
              <li>
                <a href={PORTAL_URL}>{t.footer.login}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="base">
          <span>© {year} VisionOne</span>
          <span className="links">
            <Link href={href(locale, "/zasebnost")}>{t.footer.privacy}</Link>
            <Link href={href(locale, "/piskotki")}>{t.footer.cookies}</Link>
            <CookieSettingsLink label={t.footer.cookieSettings} />
          </span>
        </div>
      </div>
    </footer>
  );
}
