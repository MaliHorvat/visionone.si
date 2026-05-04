"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form
      id="ponudba"
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-6 shadow-[var(--vo-card-shadow)]"
    >
      <h2 className="text-lg font-semibold text-[var(--vo-fg)]">Kontaktni obrazec</h2>
      <p className="mt-1 text-sm text-[var(--vo-muted)]">
        Pošiljanje je trenutno simulirano — priključi svoj Go endpoint v tej komponenti.
      </p>
      {sent ? (
        <p className="mt-6 rounded-lg bg-[var(--vo-ok-muted)] p-4 text-sm text-[var(--vo-ok)]">
          Hvala — sporočilo bi bilo poslano (demo).
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-[var(--vo-muted)]">Ime</span>
            <input
              required
              name="name"
              className="mt-1 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-[var(--vo-fg)]"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--vo-muted)]">E-pošta</span>
            <input
              required
              type="email"
              name="email"
              className="mt-1 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-[var(--vo-fg)]"
            />
          </label>
          <label className="sm:col-span-2 block text-sm">
            <span className="text-[var(--vo-muted)]">Sporočilo</span>
            <textarea
              required
              name="message"
              rows={4}
              className="mt-1 w-full rounded-lg border border-[var(--vo-border)] bg-[var(--vo-bg)] px-3 py-2 text-[var(--vo-fg)]"
            />
          </label>
          <button
            type="submit"
            className="sm:col-span-2 rounded-lg bg-[var(--vo-accent)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--vo-accent-hover)]"
          >
            Pošlji
          </button>
        </div>
      )}
    </form>
  );
}
