"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminGate } from "@/components/portal/AdminGate";
import { getMockClients, mockTimeLogs } from "@/lib/mock-data";
import { addDaysIso, todayIso } from "@/lib/portal-dates";
import type { TimeLogEntry } from "@/lib/types";
import {
  Button,
  Card,
  CardHeader,
  Field,
  Notice,
  PageHeader,
  StatCard,
  TableWrap,
  formatDate,
  formatNumber,
  inputClass,
  tdClass,
  thClass,
  trClass,
} from "@/components/portal/ui";

const STORAGE_KEY = "vo-portal-time-logs";

export default function CasPage() {
  const clients = getMockClients();
  const [logs, setLogs] = useState<TimeLogEntry[]>(mockTimeLogs);
  const [loaded, setLoaded] = useState(false);
  const today = todayIso();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLogs(parsed);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch {
      /* ignore */
    }
  }, [logs, loaded]);

  const sorted = useMemo(() => [...logs].sort((a, b) => b.date.localeCompare(a.date)), [logs]);
  const weekStart = addDaysIso(today, -6);
  const monthPrefix = today.slice(0, 7);
  const weekHours = logs.filter((l) => l.date >= weekStart && l.date <= today).reduce((s, l) => s + l.hours, 0);
  const monthHours = logs.filter((l) => l.date.startsWith(monthPrefix)).reduce((s, l) => s + l.hours, 0);

  function addLog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const projectId = String(fd.get("project") || clients[0]?.id);
    const project = clients.find((c) => c.id === projectId);
    const hours = Number(String(fd.get("hours") || "0").replace(",", "."));
    if (!hours || hours <= 0) return;
    setLogs((prev) => [
      {
        id: `t${Date.now()}`,
        projectId,
        projectName: project?.name ?? "Projekt",
        date: String(fd.get("date") || today),
        hours,
        note: String(fd.get("note") || "").trim(),
      },
      ...prev,
    ]);
    form.reset();
  }

  function remove(id: string) {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <AdminGate>
      <div className="space-y-6">
        <PageHeader title="Beleženje časa" subtitle="Ure na terenu po strankah in projektih." />

        <Notice tone="accent">Zapisi se zaenkrat shranjujejo samo v tem brskalniku.</Notice>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard value={`${formatNumber(weekHours)} h`} label="Zadnjih 7 dni" tone="accent" />
          <StatCard value={`${formatNumber(monthHours)} h`} label="Ta mesec" />
        </div>

        <Card>
          <CardHeader title="Nov zapis" />
          <form onSubmit={addLog} className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_110px]">
            <Field label="Stranka / projekt">
              <select name="project" className={inputClass} defaultValue={clients[0]?.id}>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Datum">
              <input type="date" name="date" defaultValue={today} max={today} className={inputClass} />
            </Field>
            <Field label="Ure *">
              <input type="number" name="hours" step="0.25" min="0.25" required placeholder="2,5" className={inputClass} />
            </Field>
            <Field label="Opis dela" className="sm:col-span-2 lg:col-span-3">
              <input name="note" placeholder="npr. Montaža kamer, nastavitev NVR" className={inputClass} />
            </Field>
            <div className="sm:col-span-2 lg:col-span-3">
              <Button type="submit" variant="primary">
                <Plus className="h-4 w-4" aria-hidden />
                Dodaj zapis
              </Button>
            </div>
          </form>
        </Card>

        <TableWrap minWidth={600}>
          <thead>
            <tr>
              <th className={thClass}>Datum</th>
              <th className={thClass}>Stranka</th>
              <th className={`${thClass} text-right`}>Ure</th>
              <th className={thClass}>Opis</th>
              <th className={thClass}>
                <span className="sr-only">Dejanja</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[var(--vo-muted)]">
                  Ni zapisov.
                </td>
              </tr>
            ) : null}
            {sorted.map((l) => (
              <tr key={l.id} className={trClass}>
                <td className={`${tdClass} tabular-nums text-[var(--vo-muted)]`}>{formatDate(l.date)}</td>
                <td className={`${tdClass} font-medium text-[var(--vo-fg)]`}>{l.projectName}</td>
                <td className={`${tdClass} text-right tabular-nums text-[var(--vo-fg)]`}>{formatNumber(l.hours)} h</td>
                <td className={`${tdClass} text-[var(--vo-muted)]`}>{l.note || "—"}</td>
                <td className={`${tdClass} text-right`}>
                  <Button size="sm" variant="danger" onClick={() => remove(l.id)} aria-label="Izbriši zapis">
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </AdminGate>
  );
}
