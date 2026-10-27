import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getCopy, href } from "@/site";
import type { Step } from "@/site/copy/types";

export function Steps({ steps, title }: { steps: Step[]; title?: string }) {
  return (
    <ol className="s-steps" aria-label={title}>
      {steps.map((s) => (
        <li key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function CtaBand({ locale, query = "" }: { locale: Locale; query?: string }) {
  const t = getCopy(locale);
  return (
    <section className="s-section tight">
      <div className="s-wrap">
        <div className="s-cta">
          <div>
            <h2>{t.cta.title}</h2>
            <p>{t.cta.body}</p>
          </div>
          <div className="s-btns">
            <Link className="s-btn s-btn-primary" href={href(locale, `/kontakt${query}#povprasevanje`)}>
              {t.cta.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHead({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="s-pagehead">
      <div className="s-wrap">
        <h1>{title}</h1>
        {lead ? <p className="s-lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function Shot({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="s-shot">
      <img src={src} alt={alt} width={1600} height={1011} loading={eager ? "eager" : "lazy"} />
    </div>
  );
}
