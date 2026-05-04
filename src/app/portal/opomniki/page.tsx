"use client";

import { mockReminders, mockClientPortalClientId } from "@/lib/mock-data";
import { usePortalRole } from "@/context/PortalRoleContext";

export default function OpomnikiPage() {
  const { role } = usePortalRole();
  const rows =
    role === "client"
      ? mockReminders.filter((r) => r.clientId === mockClientPortalClientId)
      : mockReminders;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--vo-fg)]">Opomniki za vzdrževanje</h1>
        <p className="mt-1 text-sm text-[var(--vo-muted)]">
          Redni servisi in čiščenja — v Go: koledar + dodelitve tehniku.
        </p>
      </div>

      <ul className="space-y-3">
        {rows.map((r) => (
          <li
            key={r.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] px-4 py-3 shadow-[var(--vo-card-shadow)]"
          >
            <div>
              <p className="font-medium text-[var(--vo-fg)]">{r.title}</p>
              <p className="text-xs text-[var(--vo-muted)]">
                {r.clientName} · {r.kind.replace("_", " ")}
              </p>
            </div>
            <time className="text-sm font-semibold text-[var(--vo-accent)]">
              {new Date(r.dueDate).toLocaleDateString("sl-SI")}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
