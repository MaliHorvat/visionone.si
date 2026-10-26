import type { Locale } from "@/i18n/config";
import { SITE_CONTACT, sitePhoneHref, sitePhoneLabel } from "@/lib/site-contact";
import { getCopy, type TopicId } from "@/site";
import { ContactForm } from "../ContactForm";
import { PageHead } from "../parts";

export function ContactPage({ locale, topic }: { locale: Locale; topic: TopicId }) {
  const t = getCopy(locale).contactPage;
  const phone = sitePhoneLabel();
  const phoneHref = sitePhoneHref();

  return (
    <>
      <PageHead title={t.title} lead={t.lead} />
      <section className="s-section tight" id="povprasevanje">
        <div className="s-wrap s-contact">
          <div className="s-contact-info">
            <dl>
              <div>
                <dt>{t.email}</dt>
                <dd>
                  <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
                </dd>
              </div>
              {phone && phoneHref ? (
                <div>
                  <dt>{t.phone}</dt>
                  <dd>
                    <a href={phoneHref}>{phone}</a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>{t.hours}</dt>
                <dd>{t.hoursValue}</dd>
              </div>
              <div>
                <dt>{t.area}</dt>
                <dd>{t.areaValue}</dd>
              </div>
            </dl>
            <h2 className="s-h-small">{t.afterTitle}</h2>
            <ol className="s-mini-steps">
              {t.after.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ol>
          </div>
          <ContactForm locale={locale} initialTopic={topic} />
        </div>
      </section>
    </>
  );
}
