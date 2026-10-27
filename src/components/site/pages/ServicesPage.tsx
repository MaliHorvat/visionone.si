import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getCopy, href, SERVICE_TOPIC } from "@/site";
import { ServiceIcon } from "../Icon";
import { CtaBand, PageHead, Steps } from "../parts";

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = getCopy(locale);

  return (
    <>
      <PageHead title={t.servicesPage.title} lead={t.servicesPage.lead}>
        <ul className="s-anchors">
          {t.services.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ul>
      </PageHead>

      <section className="s-section tight">
        <div className="s-wrap">
          <div className="s-svc-rows">
            {t.services.map((s) => (
              <article key={s.id} id={s.id} className="s-svc-row" aria-labelledby={`h-${s.id}`}>
                <div className="s-svc-name">
                  <ServiceIcon id={s.id} size={32} />
                  <h2 id={`h-${s.id}`}>{s.title}</h2>
                </div>
                <div className="s-svc-body">
                  <p>{s.lead}</p>
                  <ul className="s-checks two">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <Link className="s-link s-mt-l" href={href(locale, `/kontakt?tema=${SERVICE_TOPIC[s.id]}#povprasevanje`)}>
                    {t.servicesPage.ask}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="s-section s-white">
        <div className="s-wrap">
          <div className="s-feature">
            <div className="s-feature-media">
              <img src="/img/foto/montaza.webp" alt={t.home.featureAlt} width={1200} height={801} loading="lazy" />
            </div>
            <div>
              <h2>{t.home.featureTitle}</h2>
              <p>{t.home.featureBody}</p>
              <ul className="s-checks">
                {t.home.featureChecks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="s-steps-title">{t.servicesPage.processTitle}</h2>
          <Steps steps={t.steps} title={t.servicesPage.processTitle} />
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
