"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import {
  CONTACT_FIELDS_BY_PRODUCT,
  type ContactFieldKey,
  type ContactProduct,
  parseContactProduct,
} from "@/lib/contact-form-products";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_TYPES = new Set(["retail", "logistics", "office", "residential", "other"]);
const TIMELINES = new Set(["asap", "30d", "90d", "later"]);

const inputClass =
  "mt-1.5 min-h-11 w-full rounded-xl border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3.5 py-2.5 text-base text-[var(--vo-fg)] transition focus:border-[var(--vo-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--vo-accent)]/20 sm:min-h-0 sm:text-sm";

function ContactFormInner({ product: productProp = "cctv" }: { product?: ContactProduct }) {
  const searchParams = useSearchParams();
  const queryProduct = parseContactProduct(searchParams.get("product"));
  const product = queryProduct ?? productProp;

  const { dict } = useLocale();
  const t = dict.contactForm;
  const pt = t.products[product] ?? t.products.cctv;
  const fields = CONTACT_FIELDS_BY_PRODUCT[product];

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const cameraLabel = pt.cameraCount ?? t.cameraCount;
  const cameraPlaceholder = pt.cameraPlaceholder ?? t.cameraPlaceholder;
  const messagePlaceholder = pt.messagePlaceholder ?? t.messagePlaceholder;

  function hasField(key: ContactFieldKey) {
    return fields.includes(key);
  }

  function validateForm(fd: FormData): string | null {
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email || !EMAIL_RE.test(email) || !message) {
      return t.errors.generic;
    }

    if (hasField("siteType")) {
      const siteType = String(fd.get("siteType") ?? "");
      if (!SITE_TYPES.has(siteType)) return t.errors.generic;
    }

    if (hasField("timeline")) {
      const timeline = String(fd.get("timeline") ?? "");
      if (!TIMELINES.has(timeline)) return t.errors.generic;
    }

    if (hasField("cameraCount")) {
      const cameraRaw = fd.get("cameraCount");
      const cameraCount =
        typeof cameraRaw === "number" ? cameraRaw : Number.parseInt(String(cameraRaw ?? ""), 10);
      if (!Number.isFinite(cameraCount) || cameraCount < 1) return t.errors.generic;
    }

    if (hasField("employeeCount")) {
      const empRaw = fd.get("employeeCount");
      const employeeCount =
        typeof empRaw === "number" ? empRaw : Number.parseInt(String(empRaw ?? ""), 10);
      if (!Number.isFinite(employeeCount) || employeeCount < 1) return t.errors.generic;
    }

    if (hasField("company")) {
      const company = String(fd.get("company") ?? "").trim();
      if (company.length < 2) return t.errors.generic;
    }

    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const validationError = validateForm(fd);
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("sending");

    const payload: Record<string, unknown> = {
      product,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      vo_hp: fd.get("vo_hp"),
    };

    if (hasField("siteType")) payload.siteType = fd.get("siteType");
    if (hasField("cameraCount")) payload.cameraCount = fd.get("cameraCount");
    if (hasField("employeeCount")) payload.employeeCount = fd.get("employeeCount");
    if (hasField("company")) payload.company = fd.get("company");
    if (hasField("timeline")) payload.timeline = fd.get("timeline");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? t.errors.generic);
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setError(t.errors.network);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-8 shadow-[var(--vo-card-shadow)]">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--vo-ok-muted)]">
            <CheckCircle2 className="h-7 w-7 text-[var(--vo-ok)]" aria-hidden />
          </div>
          <h2 className="mt-5 text-xl font-bold text-[var(--vo-fg)]">{t.successTitle}</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--vo-muted)]">{t.successBody}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-semibold text-[var(--vo-accent)] hover:underline"
          >
            {t.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="ponudba"
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)] sm:p-8"
    >
      <input type="hidden" name="product" value={product} readOnly />
      <h2 className="text-xl font-bold text-[var(--vo-fg)]">{pt.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--vo-muted)]">{pt.subtitle}</p>

      <input
        type="text"
        name="vo_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
      />

      {error ? (
        <p
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-[var(--vo-fg)]">{t.name}</span>
          <input required name="name" maxLength={200} className={inputClass} autoComplete="name" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-[var(--vo-fg)]">{t.email}</span>
          <input required type="email" name="email" maxLength={320} className={inputClass} autoComplete="email" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-[var(--vo-fg)]">{t.phone}</span>
          <input type="tel" name="phone" maxLength={40} className={inputClass} autoComplete="tel" placeholder={t.phoneOptional} />
        </label>

        {hasField("company") ? (
          <label className="block text-sm">
            <span className="font-medium text-[var(--vo-fg)]">{t.company}</span>
            <input required name="company" maxLength={200} className={inputClass} placeholder={t.companyPlaceholder} />
          </label>
        ) : null}

        {hasField("cameraCount") ? (
          <label className="block text-sm">
            <span className="font-medium text-[var(--vo-fg)]">{cameraLabel}</span>
            <input
              required
              type="number"
              min={1}
              max={99999}
              name="cameraCount"
              className={inputClass}
              placeholder={cameraPlaceholder}
            />
          </label>
        ) : null}

        {hasField("employeeCount") ? (
          <label className="block text-sm">
            <span className="font-medium text-[var(--vo-fg)]">{t.employeeCount}</span>
            <input
              required
              type="number"
              min={1}
              max={999999}
              name="employeeCount"
              className={inputClass}
              placeholder={t.employeePlaceholder}
            />
          </label>
        ) : null}

        {hasField("siteType") ? (
          <label className="sm:col-span-2 block text-sm">
            <span className="font-medium text-[var(--vo-fg)]">{t.siteType}</span>
            <select required name="siteType" className={inputClass} defaultValue="">
              <option value="" disabled>
                {t.siteTypePlaceholder}
              </option>
              {Object.entries(t.siteTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {hasField("timeline") ? (
          <label className="sm:col-span-2 block text-sm">
            <span className="font-medium text-[var(--vo-fg)]">{t.timeline}</span>
            <select required name="timeline" className={inputClass} defaultValue="">
              <option value="" disabled>
                {t.timelinePlaceholder}
              </option>
              {Object.entries(t.timelines).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="sm:col-span-2 block text-sm">
          <span className="font-medium text-[var(--vo-fg)]">{t.message}</span>
          <textarea
            required
            name="message"
            rows={5}
            maxLength={10000}
            className={inputClass}
            placeholder={messagePlaceholder}
          />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="vo-btn-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold text-white disabled:opacity-60 sm:col-span-2 sm:min-h-0 sm:text-sm"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {t.sending}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              {t.submit}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function ContactFormFallback() {
  return (
    <div className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-8 shadow-[var(--vo-card-shadow)]">
      <p className="text-sm text-[var(--vo-muted)]">Nalagam obrazec…</p>
    </div>
  );
}

export function ContactForm({ product = "cctv" }: { product?: ContactProduct }) {
  return (
    <Suspense fallback={<ContactFormFallback />}>
      <ContactFormInner product={product} />
    </Suspense>
  );
}
