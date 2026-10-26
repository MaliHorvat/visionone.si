import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getCopy, getSoftware, href, serviceThumb } from "@/site";
import { HeroFeed } from "../HeroFeed";
import { CtaBand, Shot, Steps } from "../parts";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const sw = getSoftware(locale);

  return (
    <>
      <section className="s-hero s-on-dark">
        <div className="s-wrap">
          <div>
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
            <ul className="s-hero-facts">
              {t.hero.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <HeroFeed alt={t.hero.feedAlt} camera={t.hero.osdCamera} />
        </div>
      </section>

      <section className="s-section">
        <div className="s-wrap s-split-head">
          <header>
            <h2>{t.home.servicesTitle}</h2>
            <p>{t.home.servicesIntro}</p>
            <Link className="s-link" href={href(locale, "/storitve")}>
              {t.home.servicesAll}
            </Link>
          </header>
          <ul className="s-svc-list">
            {t.services.map((s) => (
              <li key={s.id}>
                <Link href={href(locale, `/storitve#${s.id}`)}>
                  <span className="thumb">
                    <img src={serviceThumb(s.id)} alt="" width={76} height={76} loading="lazy" />
                  </span>
                  <span>
                    <strong>{s.title}</strong>
                    <span>{s.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s-section s-white">
        <div className="s-wrap">
          <div className="s-feature">
            <div className="s-feature-media">
              <img src="/img/ogled.webp" alt={t.home.featureAlt} width={1200} height={800} loading="lazy" />
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
          <Steps steps={t.steps} />
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
