"use client";

import { useMemo, useState } from "react";
import { Plus, Printer, RotateCcw, Trash2 } from "lucide-react";
import { AdminGate } from "@/components/portal/AdminGate";
import { mockOfferLines } from "@/lib/mock-data";
import { todayIso } from "@/lib/portal-dates";
import type { ClientSummary, OfferLine } from "@/lib/types";
import {
  Button,
  Card,
  Field,
  Notice,
  PageHeader,
  formatDate,
  formatEur,
  inputClass,
} from "@/components/portal/ui";

const VAT = 0.22;

function lineNet(l: OfferLine) {
  return l.qty * l.unitPrice * (1 - Math.min(Math.max(l.discountPct, 0), 100) / 100);
}

const cellInput =
  "w-full rounded-md border border-transparent bg-transparent px-2 py-1.5 text-sm text-[var(--vo-fg)] outline-none hover:border-[var(--vo-border)] focus:border-[var(--vo-accent)] focus:bg-[var(--vo-bg)]";
const numInput =
  "w-full rounded-md border border-[var(--vo-border)] bg-[var(--vo-bg)] px-2 py-1.5 text-right text-sm tabular-nums text-[var(--vo-fg)] outline-none focus:border-[var(--vo-accent)]";

export function PonudbeView({ clients }: { clients: ClientSummary[] }) {
  const [lines, setLines] = useState<OfferLine[]>(mockOfferLines);
  const [clientId, setClientId] = useState("");
  const [validDays, setValidDays] = useState(30);
  const today = todayIso();
  const offerNo = `P-${today.replace(/-/g, "").slice(2)}-01`;

  const { net, vat, gross } = useMemo(() => {
    const n = lines.reduce((s, l) => s + lineNet(l), 0);
    return { net: n, vat: n * VAT, gross: n * (1 + VAT) };
  }, [lines]);

  const client = clients.find((c) => c.id === clientId);

  function addLine() {
    setLines((prev) => [
      ...prev,
      { id: `l${Date.now()}`, code: "", description: "", qty: 1, unitPrice: 0, discountPct: 0 },
    ]);
  }

  function updateLine(id: string, patch: Partial<OfferLine>) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function removeLine(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <AdminGate>
      <div className="space-y-6">
        <div className="vo-no-print">
          <PageHeader
            title="Ponudba"
            subtitle="Sestavite ponudbo s postavkami, popusti in DDV."
            actions={
              <>
                <Button onClick={() => setLines(mockOfferLines)} title="Ponastavi na vzorčne postavke">
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Ponastavi
                </Button>
                <Button onClick={() => window.print()} disabled={lines.length === 0}>
                  <Printer className="h-4 w-4" aria-hidden />
                  Natisni / PDF
                </Button>
              </>
            }
          />
        </div>

        <div className="vo-no-print">
          <Notice tone="accent">
            Ponudba se še ne shranjuje v bazo — za arhiv jo natisnite ali shranite kot PDF.
          </Notice>
        </div>

        <Card className="p-4">
          <div className="grid gap-4 md:grid-cols-[1fr_160px_160px]">
            <Field label="Stranka">
              <select value={clientId} onChange={(e) => setClientId(e.target.value)} className={inputClass}>
                <option value="">— izberi stranko —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Št. ponudbe">
              <input readOnly value={offerNo} className={`${inputClass} font-mono`} />
            </Field>
            <Field label="Veljavnost (dni)">
              <input
                type="number"
                min={1}
                value={validDays}
                onChange={(e) => setValidDays(Number(e.target.value) || 30)}
                className={inputClass}
              />
            </Field>
          </div>
          {client ? (
            <p className="mt-3 text-sm text-[var(--vo-muted)]">
              {client.name}
              {client.address ? `, ${client.address}` : ""}
              {client.contact ? ` · ${client.contact}` : ""} · izdano {formatDate(today)}
            </p>
          ) : null}
        </Card>

        <div className="overflow-x-auto rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)]">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--vo-border)] bg-[var(--vo-surface-2)] text-xs uppercase tracking-wide text-[var(--vo-muted)]">
                <th className="w-[110px] px-3 py-2.5 font-medium">Koda</th>
                <th className="px-3 py-2.5 font-medium">Opis</th>
                <th className="w-[80px] px-3 py-2.5 text-right font-medium">Kol.</th>
                <th className="w-[120px] px-3 py-2.5 text-right font-medium">Cena / kos</th>
                <th className="w-[90px] px-3 py-2.5 text-right font-medium">Popust %</th>
                <th className="w-[120px] px-3 py-2.5 text-right font-medium">Znesek</th>
                <th className="vo-no-print w-[48px] px-2 py-2.5">
                  <span className="sr-only">Odstrani</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {lines.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[var(--vo-muted)]">
                    Ponudba nima postavk. Dodajte prvo postavko.
                  </td>
                </tr>
              ) : null}
              {lines.map((l) => (
                <tr key={l.id} className="border-b border-[var(--vo-border)] last:border-0">
                  <td className="px-2 py-1.5">
                    <input
                      value={l.code}
                      onChange={(e) => updateLine(l.id, { code: e.target.value })}
                      placeholder="Koda"
                      aria-label="Koda"
                      className={`${cellInput} font-mono text-xs`}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      value={l.description}
                      onChange={(e) => updateLine(l.id, { description: e.target.value })}
                      placeholder="Opis postavke"
                      aria-label="Opis"
                      className={cellInput}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={l.qty}
                      onChange={(e) => updateLine(l.id, { qty: Number(e.target.value) || 0 })}
                      aria-label="Količina"
                      className={numInput}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={l.unitPrice}
                      onChange={(e) => updateLine(l.id, { unitPrice: Number(e.target.value) || 0 })}
                      aria-label="Cena na kos"
                      className={numInput}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={l.discountPct}
                      onChange={(e) =>
                        updateLine(l.id, { discountPct: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })
                      }
                      aria-label="Popust v odstotkih"
                      className={numInput}
                    />
                  </td>
                  <td className="px-3 py-1.5 text-right font-medium tabular-nums text-[var(--vo-fg)]">
                    {formatEur(lineNet(l))}
                  </td>
                  <td className="vo-no-print px-2 py-1.5 text-center">
                    <Button size="sm" variant="danger" onClick={() => removeLine(l.id)} aria-label="Odstrani postavko">
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="vo-no-print border-t border-[var(--vo-border)] p-2">
            <Button size="sm" variant="ghost" onClick={addLine}>
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Dodaj postavko
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <dl className="w-full max-w-sm space-y-2 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] px-5 py-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--vo-muted)]">Skupaj brez DDV</dt>
              <dd className="tabular-nums text-[var(--vo-fg)]">{formatEur(net)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--vo-muted)]">DDV 22 %</dt>
              <dd className="tabular-nums text-[var(--vo-fg)]">{formatEur(vat)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[var(--vo-border)] pt-2">
              <dt className="font-semibold text-[var(--vo-fg)]">Za plačilo</dt>
              <dd className="text-lg font-semibold tabular-nums text-[var(--vo-accent)]">{formatEur(gross)}</dd>
            </div>
            <p className="pt-1 text-xs text-[var(--vo-subtle)]">Ponudba velja {validDays} dni od izdaje.</p>
          </dl>
        </div>
      </div>
    </AdminGate>
  );
}
