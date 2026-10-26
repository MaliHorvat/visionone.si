import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getCopy, href, SERVICE_IMAGES, SERVICE_TOPIC } from "@/site";
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

      <div className="s-svc-stack">
        {t.services.map((s, i) => (
          <section key={s.id} id={s.id} className="s-svc" aria-labelledby={`h-${s.id}`}>
            <div className="s-wrap">
              <div className={`s-feature${i % 2 ? " flip" : ""}`}>
                <div className="s-feature-media">
                  <img src={SERVICE_IMAGES[s.id]} alt={s.imageAlt} width={1200} height={800} loading={i < 2 ? "eager" : "lazy"} />
                </div>
                <div>
                  <h2 id={`h-${s.id}`}>{s.title}</h2>
                  <p>{s.lead}</p>
                  <ul className="s-checks">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <Link className="s-link s-mt-l" href={href(locale, `/kontakt?tema=${SERVICE_TOPIC[s.id]}#povprasevanje`)}>
                    {t.servicesPage.ask}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="s-section s-white">
        <div className="s-wrap">
          <h2>{t.servicesPage.processTitle}</h2>
          <Steps steps={t.steps} title={t.servicesPage.processTitle} />
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
