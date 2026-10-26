import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getCopy, getSoftware, href, PORTAL_URL, SOFTWARE_LINKS, SURVEY_URL } from "@/site";
import { CtaBand, PageHead, Shot } from "../parts";

export function ProductsPage({ locale }: { locale: Locale }) {
  const t = getSoftware(locale);
  return (
    <>
      <PageHead title={t.title} lead={t.lead}>
        <ul className="s-anchors">
          {t.items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`}>{it.name}</a>
            </li>
          ))}
        </ul>
      </PageHead>

      <div className="s-sw-stack">
        {t.items.map((it, i) => {
          const l = SOFTWARE_LINKS[it.id];
          const text = (
            <div>
              <span className={`s-tag${it.tag === t.openSource ? " oss" : ""}`}>{it.tag}</span>
              <h2 id={`h-${it.id}`}>{it.name}</h2>
              <p>{it.body}</p>
              <ul className="s-checks">
                {it.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="s-btns s-mt-l">
                {l.page ? (
                  <Link className="s-btn s-btn-primary" href={href(locale, l.page)}>
                    {t.more}
                  </Link>
                ) : null}
                {l.open ? (
                  <a className={`s-btn ${l.page ? "s-btn-line" : "s-btn-primary"}`} href={l.open} target="_blank" rel="noopener">
                    {t.open} <span className="s-host">{new URL(l.open).host}</span>
                  </a>
                ) : null}
                {l.source ? (
                  <a className="s-btn s-btn-line" href={l.source} target="_blank" rel="noopener">
                    {t.source}
                  </a>
                ) : null}
              </div>
            </div>
          );
          return (
            <section key={it.id} id={it.id} className="s-svc" aria-labelledby={`h-${it.id}`}>
              <div className="s-wrap">
                {l.image ? (
                  i % 2 ? (
                    <div className="s-feature wide-media">
                      {text}
                      <Shot src={l.image} alt={it.imageAlt ?? it.name} />
                    </div>
                  ) : (
                    <div className="s-feature wide-media flip">
                      <Shot src={l.image} alt={it.imageAlt ?? it.name} eager={i === 0} />
                      {text}
                    </div>
                  )
                ) : (
                  <div className="s-sw-plain">{text}</div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <section className="s-section tight">
        <div className="s-wrap">
          <div className="s-cta">
            <div>
              <h2>{t.customTitle}</h2>
              <p>{t.customBody}</p>
            </div>
            <div className="s-btns">
              <Link className="s-btn s-btn-primary" href={href(locale, "/kontakt?tema=razvoj#povprasevanje")}>
                {t.customCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function PortalPage({ locale }: { locale: Locale }) {
  const t = getCopy(locale).portalPage;
  return (
    <>
      <section className="s-section s-on-dark s-product-hero">
        <div className="s-wrap">
          <h1>{t.title}</h1>
          <p className="s-lead s-mt">{t.lead}</p>
          <div className="s-btns s-mt-l">
            <Link className="s-btn s-btn-primary" href={href(locale, "/kontakt?tema=portal#povprasevanje")}>
              {t.demo}
            </Link>
            <a className="s-btn s-btn-line" href={PORTAL_URL}>
              {t.login}
            </a>
          </div>
          <div className="s-product-shot">
            <Shot src="/img/portal/danes-dark.webp" alt={t.shotAlt} eager />
          </div>
        </div>
      </section>

      <section className="s-section">
        <div className="s-wrap">
          <ul className="s-points">
            {t.blocks.map((b) => (
              <li key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s-section s-white">
        <div className="s-wrap">
          <div className="s-feature wide-media flip">
            <Shot src="/img/portal/ponudba-dark.webp" alt={t.offerAlt} />
            <div>
              <h2>{t.offerTitle}</h2>
              <p>{t.offerBody}</p>
              <ul className="s-checks">
                {t.offerChecks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="s-section tight">
        <div className="s-wrap">
          <div className="s-cta">
            <div>
              <h2>{t.installersTitle}</h2>
              <p>{t.installersBody}</p>
            </div>
            <div className="s-btns">
              <Link className="s-btn s-btn-primary" href={href(locale, "/kontakt?tema=portal#povprasevanje")}>
                {t.demo}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function SurveyPage({ locale }: { locale: Locale }) {
  const t = getCopy(locale).surveyPage;
  return (
    <>
      <PageHead title={t.title} lead={t.lead}>
        <div className="s-btns s-mt-l">
          <a className="s-btn s-btn-primary" href={SURVEY_URL}>
            {t.open}
          </a>
          <a className="s-btn s-btn-line" href={SOFTWARE_LINKS.anketa.source} target="_blank" rel="noopener">
            {getSoftware(locale).source}
          </a>
          <Link className="s-btn s-btn-ghost" href={href(locale, "/kontakt?tema=anketa#povprasevanje")}>
            {t.ask}
          </Link>
        </div>
      </PageHead>

      <section className="s-section">
        <div className="s-wrap">
          <div className="s-feature wide-media flip">
            <div className="s-plain-media">
              <img src="/img/anketa-obrazec.webp" alt={t.uiAlt} width={1400} height={933} />
            </div>
            <div>
              <h2>{t.howTitle}</h2>
              <p>{t.howBody}</p>
              <ul className="s-checks">
                {t.howChecks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="s-section s-white">
        <div className="s-wrap">
          <div className="s-feature wide-media">
            <div>
              <h2>{t.dashTitle}</h2>
              <p>{t.dashBody}</p>
              <p className="s-note">{t.dashNote}</p>
            </div>
            <div className="s-plain-media">
              <img src="/img/anketa-plosca.webp" alt={t.dashAlt} width={1400} height={933} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} query="?tema=anketa" />
    </>
  );
}
