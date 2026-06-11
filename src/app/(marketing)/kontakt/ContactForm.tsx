"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_TYPES = new Set(["retail", "logistics", "office", "residential", "other"]);
const TIMELINES = new Set(["asap", "30d", "90d", "later"]);

const inputClass =
  "mt-1.5 min-h-11 w-full rounded-xl border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3.5 py-2.5 text-base text-[var(--vo-fg)] transition focus:border-[var(--vo-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--vo-accent)]/20 sm:min-h-0 sm:text-sm";

export function ContactForm() {
  const { dict } = useLocale();
  const t = dict.contactForm;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function validateForm(fd: FormData): string | null {
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const siteType = String(fd.get("siteType") ?? "");
    const timeline = String(fd.get("timeline") ?? "");
    const message = String(fd.get("message") ?? "").trim();
    const cameraRaw = fd.get("cameraCount");
    const cameraCount =
      typeof cameraRaw === "number" ? cameraRaw : Number.parseInt(String(cameraRaw ?? ""), 10);

    if (!name || !email || !EMAIL_RE.test(email) || !SITE_TYPES.has(siteType) || !TIMELINES.has(timeline)) {
      return t.errors.generic;
    }
    if (!Number.isFinite(cameraCount) || cameraCount < 1 || !message) {
      return t.errors.generic;
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

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      siteType: fd.get("siteType"),
      cameraCount: fd.get("cameraCount"),
      timeline: fd.get("timeline"),
      message: fd.get("message"),
      vo_hp: fd.get("vo_hp"),
    };

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
      <h2 className="text-xl font-bold text-[var(--vo-fg)]">{t.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--vo-muted)]">{t.subtitle}</p>

      <input
        type="text"
        name="vo_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
      />

      {error ? (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200" role="alert">
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
        <label className="block text-sm">
          <span className="font-medium text-[var(--vo-fg)]">{t.cameraCount}</span>
          <input required type="number" min={1} max={99999} name="cameraCount" className={inputClass} placeholder={t.cameraPlaceholder} />
        </label>
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
        <label className="sm:col-span-2 block text-sm">
          <span className="font-medium text-[var(--vo-fg)]">{t.message}</span>
          <textarea required name="message" rows={5} maxLength={10000} className={inputClass} placeholder={t.messagePlaceholder} />
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
