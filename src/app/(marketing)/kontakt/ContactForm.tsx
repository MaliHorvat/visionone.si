"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("sending");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
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
        setError(data.error ?? "Pošiljanje ni uspelo.");
        setStatus("idle");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setError("Povezava ni uspela. Preverite omrežje in poskusite znova.");
      setStatus("idle");
    }
  }

  return (
    <form
      id="ponudba"
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)]"
    >
      <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Kontaktni obrazec</h2>
      <p className="mt-1 text-sm text-[var(--vo-muted)]">
        Podatke prejmemo na naš e-poštni naslov. Stranka ne prejme avtomatskega e-pisma — odgovorite ji ročno, če želite.
      </p>

      {/* Honeypot (ime namenoma ne „website“, da ga brskalnik ne izpolni). */}
      <input
        type="text"
        name="vo_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
      />

      {status === "sent" ? (
        <p className="mt-6 rounded-lg bg-[var(--vo-ok-muted)] p-4 text-sm text-[var(--vo-ok)]">
          Hvala — vaša zahteva je bila poslana. Na vašo e-pošto vam ne pošljemo avtomatskega potrditve; odgovorimo, ko
          pregledamo sporočilo.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {error ? (
            <p
              className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          <label className="block text-sm">
            <span className="text-[var(--vo-muted)]">Ime</span>
            <input
              required
              name="name"
              maxLength={200}
              className="mt-1 min-h-11 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-base text-[var(--vo-fg)] sm:min-h-0 sm:text-sm"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--vo-muted)]">E-pošta</span>
            <input
              required
              type="email"
              name="email"
              maxLength={320}
              className="mt-1 min-h-11 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-base text-[var(--vo-fg)] sm:min-h-0 sm:text-sm"
            />
          </label>
          <label className="sm:col-span-2 block text-sm">
            <span className="text-[var(--vo-muted)]">Tip objekta</span>
            <select
              required
              name="siteType"
              className="mt-1 min-h-11 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-base text-[var(--vo-fg)] sm:min-h-0 sm:text-sm"
            >
              <option value="">Izberite tip objekta</option>
              <option value="retail">Trgovina / retail</option>
              <option value="logistics">Logistika / skladišče</option>
              <option value="office">Poslovni objekt</option>
              <option value="residential">Stanovanjski objekt</option>
              <option value="other">Drugo</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-[var(--vo-muted)]">Število kamer (ocena)</span>
            <input
              required
              type="number"
              min={1}
              max={99999}
              name="cameraCount"
              className="mt-1 min-h-11 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-base text-[var(--vo-fg)] sm:min-h-0 sm:text-sm"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--vo-muted)]">Rok izvedbe</span>
            <select
              required
              name="timeline"
              className="mt-1 min-h-11 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-base text-[var(--vo-fg)] sm:min-h-0 sm:text-sm"
            >
              <option value="">Izberite rok</option>
              <option value="asap">Takoj</option>
              <option value="30d">V 30 dneh</option>
              <option value="90d">V 3 mesecih</option>
              <option value="later">Kasneje / planiranje</option>
            </select>
          </label>
          <label className="sm:col-span-2 block text-sm">
            <span className="text-[var(--vo-muted)]">Sporočilo</span>
            <textarea
              required
              name="message"
              rows={4}
              maxLength={10000}
              className="mt-1 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-base text-[var(--vo-fg)] sm:text-sm"
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="min-h-11 rounded-lg bg-[var(--vo-accent)] py-3 text-base font-semibold text-white hover:bg-[var(--vo-accent-hover)] disabled:opacity-60 sm:col-span-2 sm:min-h-0 sm:py-2.5 sm:text-sm"
          >
            {status === "sending" ? "Pošiljam…" : "Pošlji"}
          </button>
        </div>
      )}
    </form>
  );
}
