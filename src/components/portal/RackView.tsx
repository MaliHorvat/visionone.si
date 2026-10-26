import { Server } from "lucide-react";
import type { RackUnit } from "@/lib/types";
import { Card, CardHeader } from "./ui";

const U_HEIGHT = 30;

export function RackView({ units }: { units: RackUnit[] }) {
  const sorted = [...units].sort((a, b) => a.uStart - b.uStart);

  return (
    <Card className="overflow-hidden">
      <CardHeader title="Rack omarica" icon={Server} description="Razporeditev naprav po U enotah (demo)." />
      <div className="p-4">
        <div className="rounded-md border-2 border-[var(--vo-border-strong)] bg-[var(--vo-bg)] p-2">
          <div className="flex flex-col gap-1">
            {sorted.map((u) => (
              <div key={u.label} className="flex items-stretch gap-2" style={{ minHeight: u.uSpan * U_HEIGHT }}>
                <div className="flex w-10 shrink-0 items-center justify-end font-mono text-[10px] text-[var(--vo-subtle)]">
                  {u.uSpan > 1 ? `U${u.uStart}–${u.uStart + u.uSpan - 1}` : `U${u.uStart}`}
                </div>
                <div className="flex flex-1 items-center justify-between gap-2 rounded border border-[var(--vo-border)] bg-[var(--vo-surface-2)] px-3">
                  <span className="truncate text-xs font-medium text-[var(--vo-fg)]">{u.label}</span>
                  <span className="flex shrink-0 items-center gap-2 text-[10px] text-[var(--vo-muted)]">
                    {u.uSpan}U · {u.deviceType}
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--vo-ok)] shadow-[0_0_6px_var(--vo-ok)]" aria-hidden />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
