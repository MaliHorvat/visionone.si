"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { AdminGate } from "@/components/portal/AdminGate";
import { Button, Card, CardHeader, Field, Notice, PageHeader, inputClass } from "@/components/portal/ui";

export default function ObvestilaPage() {
  const [token, setToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [saved, setSaved] = useState(false);

  const tokenValid = token === "" || /^\d{6,}:[\w-]{20,}$/.test(token.trim());
  const chatValid = chatId === "" || /^-?\d{5,}$/.test(chatId.trim());

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!tokenValid || !chatValid) return;
    setSaved(true);
  }

  return (
    <AdminGate>
      <div className="max-w-2xl space-y-6">
        <PageHeader title="Obvestila" subtitle="Telegram opozorila ob izpadu kamere, snemalnika ali diska." />

        <Notice tone="warn">
          Predogled nastavitev — vrednosti se ne shranijo. V produkciji žeton hrani strežnik, nikoli brskalnik.
        </Notice>

        <Card>
          <CardHeader title="Telegram bot" icon={Send} />
          <form onSubmit={onSave} className="space-y-4 p-4">
            <Field
              label="Bot API žeton"
              hint={tokenValid ? "Dobite ga pri @BotFather v Telegramu." : "Oblika žetona ni pravilna (npr. 123456:ABC…)."}
            >
              <input
                type="password"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  setSaved(false);
                }}
                placeholder="123456:ABC…"
                className={`${inputClass} font-mono ${tokenValid ? "" : "border-[var(--vo-danger)]"}`}
                autoComplete="off"
                aria-invalid={!tokenValid}
              />
            </Field>
            <Field
              label="Chat ID skupine ali skrbnika"
              hint={chatValid ? "Za skupine se začne z -100." : "Chat ID je številka (lahko z minusom)."}
            >
              <input
                value={chatId}
                onChange={(e) => {
                  setChatId(e.target.value);
                  setSaved(false);
                }}
                placeholder="-100xxxxxxxxxx"
                inputMode="numeric"
                className={`${inputClass} font-mono ${chatValid ? "" : "border-[var(--vo-danger)]"}`}
                autoComplete="off"
                aria-invalid={!chatValid}
              />
            </Field>
            <Button type="submit" variant="primary" disabled={!token || !chatId || !tokenValid || !chatValid}>
              Shrani
            </Button>
            {saved ? <Notice tone="ok">Nastavitve so preverjene (predogled — niso shranjene).</Notice> : null}
          </form>
        </Card>
      </div>
    </AdminGate>
  );
}
