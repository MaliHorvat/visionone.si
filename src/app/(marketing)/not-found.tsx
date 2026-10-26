import Link from "next/link";
import { headers } from "next/headers";
import { getCopy, href, toLocale } from "@/site";

export default async function NotFound() {
  const locale = toLocale((await headers()).get("x-vo-locale"));
  const t = getCopy(locale).notFound;
  return (
    <section className="s-section">
      <div className="s-wrap s-notfound">
        <p className="s-osd-label" aria-hidden="true">
          KAM 404
        </p>
        <h1>{t.title}</h1>
        <p className="s-lead">{t.body}</p>
        <div className="s-btns s-mt-l">
          <Link className="s-btn s-btn-primary" href={href(locale, "/")}>
            {t.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
