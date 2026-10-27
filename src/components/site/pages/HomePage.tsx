import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getCopy, getSoftware, href } from "@/site";
import { ServiceIcon } from "../Icon";
import { CtaBand, Shot, Steps } from "../parts";

const SECTOR_IMAGES = ["/img/foto/podjetja.webp", "/img/foto/industrija.webp", "/img/foto/stanovanjski.webp"];

export function HomePage({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const sw = getSoftware(locale);

  return (
    <>
      <section className="s-hero s-on-dark">
        <div className="s-hero-media">
          <img src="/img/foto/kamere.webp" alt={t.hero.imageAlt} width={1400} height={934} fetchPriority="high" />
        </div>
        <div className="s-wrap">
          <div className="s-hero-text">
            <h1>{t.hero.title}</h1>
            <p className="s-lead">{t.hero.lead}</p>
            <div className="s-btns">
              <Link className="s-btn s-btn-primary" href={href(locale, "/kontakt#povprasevanje")}>
                {t.hero.primary}
              </Link>
              <Link className="s-btn s-btn-line" href={href(locale, "/storitve")}>
                {t.hero.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="s-facts" aria-label={t.hero.secondary}>
        <div className="s-wrap">
          <ul>
            {t.hero.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s-section">
        <div className="s-wrap">
          <header className="s-sec-head">
            <h2>{t.home.servicesTitle}</h2>
            <p>{t.home.servicesIntro}</p>
          </header>
          <ul className="s-svc-grid">
            {t.services.map((s) => (
              <li key={s.id}>
                <Link href={href(locale, `/storitve#${s.id}`)}>
                  <ServiceIcon id={s.id} />
                  <strong>{s.title}</strong>
                  <span>{s.short}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="s-more">
            <Link className="s-link" href={href(locale, "/storitve")}>
              {t.home.servicesAll}
            </Link>
          </p>
        </div>
      </section>

      <section className="s-section s-white">
        <div className="s-wrap">
          <header className="s-sec-head">
            <h2>{t.home.sectorsTitle}</h2>
          </header>
          <ul className="s-sectors">
            {t.home.sectors.map((s, i) => (
              <li key={s.title}>
                <img src={SECTOR_IMAGES[i]} alt={s.imageAlt} width={900} height={675} loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s-section">
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
          <h2 className="s-steps-title">{t.home.processTitle}</h2>
          <Steps steps={t.steps} title={t.home.processTitle} />
        </div>
      </section>

      <section className="s-section s-on-dark">
        <div className="s-wrap">
          <div className="s-feature wide-media">
            <div>
              <span className="s-kicker">{sw.homeKicker}</span>
              <h2>{sw.homeTitle}</h2>
              <p className="s-lead s-mt">{sw.homeBody}</p>
              <ul className="s-sw-mini">
                {sw.items.map((it) => (
                  <li key={it.id}>
                    <Link href={href(locale, `/produkti#${it.id}`)}>
                      <strong>{it.name}</strong>
                      <span>{it.tag}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="s-btns s-mt-l">
                <Link className="s-btn s-btn-primary" href={href(locale, "/produkti")}>
                  {sw.homeCta}
                </Link>
              </div>
            </div>
            <Shot src="/img/sw/vms-view.webp" alt={sw.homeAlt} />
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
