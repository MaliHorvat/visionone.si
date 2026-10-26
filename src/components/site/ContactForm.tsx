"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { SITE_CONTACT } from "@/lib/site-contact";
import { getCopy, href, INQUIRY_URL, TOPICS, type TopicId } from "@/site";
import type { SiteTypeId } from "@/site/copy/types";

type Field = "name" | "contact" | "email" | "message";
const SITE_TYPES: SiteTypeId[] = ["hisa", "stanovanje", "pisarna", "trgovina", "skladisce", "drugo"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({ locale, initialTopic }: { locale: Locale; initialTopic: TopicId }) {
  const t = getCopy(locale).form;
  const [topic, setTopic] = useState<TopicId>(initialTopic);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [failure, setFailure] = useState<string | null>(null);
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  const withEmail = (s: string) => s.replace("{email}", SITE_CONTACT.email);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const name = get("name");
    const email = get("email");
    const phone = get("phone");
    const message = get("message");

    const next: Partial<Record<Field, string>> = {};
    if (name.length < 2) next.name = t.errors.name;
    if (!email && phone.replace(/\D/g, "").length < 6) next.contact = t.errors.contact;
    else if (email && !EMAIL_RE.test(email)) next.email = t.errors.email;
    if (message.length < 5) next.message = t.errors.message;
    setErrors(next);
    setFailure(null);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0] === "contact" ? "email" : Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setState("sending");
    try {
      const res = await fetch(INQUIRY_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          topic,
          name,
          email,
          phone,
          company: get("company"),
          site_type: get("site_type"),
          devices: get("devices"),
          message,
          website: get("website"),
          elapsed: Date.now() - startedAt.current,
          page: window.location.href,
          source: `visionone.si/${locale}`,
        }),
      });
      if (res.ok) {
        setState("done");
        return;
      }
      setFailure(withEmail(res.status === 429 ? t.errors.rate : t.errors.generic));
    } catch {
      setFailure(withEmail(t.errors.generic));
    }
    setState("idle");
  }

  if (state === "done") {
    return (
      <div className="s-form s-done" ref={doneRef} tabIndex={-1} role="status">
        <span className="s-done-mark" aria-hidden="true" />
        <h2>{t.doneTitle}</h2>
        <p>{t.doneBody}</p>
        <button
          type="button"
          className="s-btn s-btn-line s-mt-l"
          onClick={() => {
            startedAt.current = Date.now();
            setState("idle");
          }}
        >
          {t.again}
        </button>
      </div>
    );
  }

  const err = (f: Field) =>
    errors[f] ? (
      <span className="s-err" id={`err-${f}`}>
        {errors[f]}
      </span>
    ) : null;

  return (
    <form className="s-form" ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="povprasevanje-h">
      <h2 id="povprasevanje-h">{t.title}</h2>
      <p>{t.intro}</p>

      <fieldset className="s-fieldset">
        <legend>{t.topicLegend}</legend>
        <div className="s-chips">
          {TOPICS.map((id) => (
            <label key={id}>
              <input type="radio" name="topic" value={id} checked={topic === id} onChange={() => setTopic(id)} />
              <span>{t.topics[id]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="s-grid2">
        <div className="s-field full">
          <label htmlFor="f-name">{t.name}</label>
          <input id="f-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
          {err("name")}
        </div>
        <div className="s-field">
          <label htmlFor="f-email">{t.email}</label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!(errors.email || errors.contact)}
            aria-describedby={errors.email ? "err-email" : errors.contact ? "err-contact" : "f-contact-hint"}
          />
          {err("email")}
        </div>
        <div className="s-field">
          <label htmlFor="f-phone">{t.phone}</label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? "err-contact" : "f-contact-hint"}
          />
        </div>
        <p className="s-hint full" id="f-contact-hint">
          {errors.contact ? err("contact") : t.contactHint}
        </p>
        <div className="s-field">
          <label htmlFor="f-company">
            {t.company} <small>({t.optional})</small>
          </label>
          <input id="f-company" name="company" autoComplete="organization" />
        </div>
        <div className="s-field">
          <label htmlFor="f-site">
            {t.siteType} <small>({t.optional})</small>
          </label>
          <select id="f-site" name="site_type" defaultValue="">
            <option value="">{t.siteTypeEmpty}</option>
            {SITE_TYPES.map((s) => (
              <option key={s} value={s}>
                {t.siteTypes[s]}
              </option>
            ))}
          </select>
        </div>
        {topic === "cctv" ? (
          <div className="s-field">
            <label htmlFor="f-devices">
              {t.devices} <small>({t.optional})</small>
            </label>
            <input id="f-devices" name="devices" type="number" min={1} max={500} inputMode="numeric" />
          </div>
        ) : null}
        <div className="s-field full">
          <label htmlFor="f-message">{t.message}</label>
          <textarea
            id="f-message"
            name="message"
            rows={5}
            placeholder={t.messagePlaceholder}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "err-message" : undefined}
          />
          {err("message")}
        </div>
      </div>

      <div className="s-hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {failure ? (
        <p className="s-alert" role="alert">
          {failure}
        </p>
      ) : null}

      <div className="s-form-foot">
        <button type="submit" className="s-btn s-btn-primary" disabled={state === "sending"}>
          {state === "sending" ? t.sending : t.submit}
        </button>
        <small>
          {t.privacyBefore}
          <Link href={href(locale, "/zasebnost")}>{t.privacyLink}</Link>
          {t.privacyAfter}
        </small>
      </div>
    </form>
  );
}
