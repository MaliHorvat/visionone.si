"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AdminGate } from "@/components/portal/AdminGate";
import { mockInventory } from "@/lib/mock-data";
import {
  Badge,
  Notice,
  PageHeader,
  StatCard,
  TableWrap,
  formatNumber,
  inputClass,
  tdClass,
  thClass,
  trClass,
} from "@/components/portal/ui";

export default function InventarPage() {
  const [query, setQuery] = useState("");
  const [lowOnly, setLowOnly] = useState(false);

  const lowCount = mockInventory.filter((r) => r.qty <= r.minQty).length;
  const rows = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("sl");
    return mockInventory
      .filter((r) => (lowOnly ? r.qty <= r.minQty : true))
      .filter((r) => !q || `${r.sku} ${r.name}`.toLocaleLowerCase("sl").includes(q))
      .sort((a, b) => Number(b.qty <= b.minQty) - Number(a.qty <= a.minQty) || a.name.localeCompare(b.name, "sl"));
  }, [query, lowOnly]);

  return (
    <AdminGate>
      <div className="space-y-6">
        <PageHeader title="Inventar" subtitle="Zaloga materiala in opreme za teren." />

        <Notice tone="accent">Demo zaloga — sinhronizacija s skladiščem še ni povezana.</Notice>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard value={mockInventory.length} label="Artiklov" />
          <StatCard value={lowCount} label="Pod minimalno zalogo" tone={lowCount > 0 ? "warn" : "ok"} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vo-subtle)]"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Išči po SKU ali nazivu …"
              aria-label="Iskanje po inventarju"
              className={`${inputClass} pl-9`}
            />
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--vo-muted)]">
            <input
              type="checkbox"
              checked={lowOnly}
              onChange={(e) => setLowOnly(e.target.checked)}
              className="h-4 w-4 accent-[var(--vo-accent)]"
            />
            Samo pod minimumom
          </label>
        </div>

        <TableWrap minWidth={640}>
          <thead>
            <tr>
              <th className={thClass}>SKU</th>
              <th className={thClass}>Naziv</th>
              <th className={`${thClass} text-right`}>Zaloga</th>
              <th className={`${thClass} text-right`}>Minimum</th>
              <th className={thClass}>Stanje</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[var(--vo-muted)]">
                  Ni zadetkov.
                </td>
              </tr>
            ) : null}
            {rows.map((row) => {
              const low = row.qty <= row.minQty;
              return (
                <tr key={row.id} className={trClass}>
                  <td className={`${tdClass} font-mono text-xs text-[var(--vo-muted)]`}>{row.sku}</td>
                  <td className={`${tdClass} text-[var(--vo-fg)]`}>{row.name}</td>
                  <td className={`${tdClass} text-right font-medium tabular-nums text-[var(--vo-fg)]`}>
                    {formatNumber(row.qty)} {row.unit}
                  </td>
                  <td className={`${tdClass} text-right tabular-nums text-[var(--vo-muted)]`}>
                    {formatNumber(row.minQty)} {row.unit}
                  </td>
                  <td className={tdClass}>
                    {low ? (
                      <Badge tone="warn" dot>
                        Naroči
                      </Badge>
                    ) : (
                      <Badge tone="ok" dot>
                        Dovolj
                      </Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </div>
    </AdminGate>
  );
}
