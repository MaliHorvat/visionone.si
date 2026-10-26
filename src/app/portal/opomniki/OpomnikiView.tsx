"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus, RotateCcw, Trash2 } from "lucide-react";
import { usePortalRole } from "@/context/PortalRoleContext";
import { mockClientPortalClientId } from "@/lib/mock-data";
import { apiSend } from "@/lib/portal-api";
import {
  DUE_LABELS,
  DUE_TONES,
  REMINDER_KIND_LABELS,
  addDaysIso,
  reminderDueState,
  todayIso,
  type DueState,
} from "@/lib/portal-dates";
import type { ClientSummary, MaintenanceReminder, ReminderKind } from "@/lib/types";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  DemoDataNotice,
  EmptyState,
  Field,
  Notice,
  PageHeader,
  cx,
  formatDate,
  inputClass,
} from "@/components/portal/ui";

type Props = {
  reminders: MaintenanceReminder[];
  clients: ClientSummary[];
  dbConfigured: boolean;
  openNew?: boolean;
};

type View = "open" | "done" | "all";

const GROUP_ORDER: DueState[] = ["overdue", "today", "soon", "later", "done"];
const GROUP_TITLES: Record<DueState, string> = {
  overdue: "Zamuja",
  today: "Danes",
  soon: "Naslednjih 7 dni",
  later: "Kasneje",
  done: "Opravljeno",
};

export function OpomnikiView({ reminders, clients, dbConfigured, openNew }: Props) {
  const { role } = usePortalRole();
  const isAdmin = role === "admin";
  const router = useRouter();
  const [showForm, setShowForm] = useState(Boolean(openNew));
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "danger"; text: string } | null>(null);
  const [view, setView] = useState<View>("open");
  const today = todayIso();

  const rows = isAdmin ? reminders : reminders.filter((r) => r.clientId === mockClientPortalClientId);

  const groups = useMemo(() => {
    const visible = rows.filter((r) => (view === "open" ? !r.completed : view === "done" ? r.completed : true));
    const map = new Map<DueState, MaintenanceReminder[]>();
    for (const r of visible) {
      const s = reminderDueState(r, today);
      map.set(s, [...(map.get(s) ?? []), r]);
    }
    for (const list of map.values()) list.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    return GROUP_ORDER.filter((s) => map.has(s)).map((s) => ({ state: s, items: map.get(s)! }));
  }, [rows, view, today]);

  const openCount = rows.filter((r) => !r.completed).length;
  const doneCount = rows.length - openCount;

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(event.currentTarget);
    const err = await apiSend("/api/reminders", "POST", {
      clientId: String(fd.get("clientId") ?? ""),
      title: String(fd.get("title") ?? "").trim(),
      dueDate: String(fd.get("dueDate") ?? ""),
      kind: String(fd.get("kind") ?? "drugo") as ReminderKind,
    });
    setSubmitting(false);
    if (err) return setError(err);
    setNotice({ tone: "ok", text: "Opomnik je dodan." });
    setShowForm(false);
    router.refresh();
  }

  async function toggleCompleted(r: MaintenanceReminder) {
    setBusyId(r.id);
    const err = await apiSend(`/api/reminders/${r.id}`, "PUT", { completed: !r.completed });
    setBusyId(null);
    if (err) return setNotice({ tone: "danger", text: err });
    setNotice({ tone: "ok", text: r.completed ? "Opomnik je ponovno odprt." : "Označeno kot opravljeno." });
    router.refresh();
  }

  async function handleDelete(r: MaintenanceReminder) {
    if (!confirm(`Izbrišem opomnik »${r.title}«?`)) return;
    setBusyId(r.id);
    const err = await apiSend(`/api/reminders/${r.id}`, "DELETE");
    setBusyId(null);
    setNotice(err ? { tone: "danger", text: err } : { tone: "ok", text: "Opomnik je izbrisan." });
    if (!err) router.refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isAdmin ? "Opomniki za vzdrževanje" : "Načrtovani servisi"}
        subtitle="Redni servisi, čiščenje kamer in menjava diskov."
        actions={
          isAdmin ? (
            <Button
              variant="primary"
              onClick={() => {
                setError(null);
                setShowForm((s) => !s);
              }}
              disabled={!dbConfigured}
            >
              <Plus className="h-4 w-4" aria-hidden />
              Nov opomnik
            </Button>
          ) : null
        }
      />

      {!dbConfigured && isAdmin ? <DemoDataNotice /> : null}
      {notice ? (
        <Notice tone={notice.tone} onClose={() => setNotice(null)}>
          {notice.text}
        </Notice>
      ) : null}

      {showForm && isAdmin ? (
        <Card>
          <CardHeader title="Nov opomnik" />
          <form onSubmit={handleCreate} className="space-y-4 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Stranka *">
                <select name="clientId" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    — izberi stranko —
                  </option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Vrsta">
                <select name="kind" defaultValue="servis" className={inputClass}>
                  {(Object.keys(REMINDER_KIND_LABELS) as ReminderKind[]).map((k) => (
                    <option key={k} value={k}>
                      {REMINDER_KIND_LABELS[k]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Kaj je treba narediti *">
                <input name="title" required placeholder="npr. Letni servis sistema" className={inputClass} />
              </Field>
              <Field label="Rok *">
                <input name="dueDate" type="date" required defaultValue={addDaysIso(today, 7)} className={inputClass} />
              </Field>
            </div>
            {error ? <Notice tone="danger">{error}</Notice> : null}
            <div className="flex gap-2">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? "Shranjujem…" : "Shrani"}
              </Button>
              <Button onClick={() => setShowForm(false)}>Prekliči</Button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="inline-flex gap-1 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] p-1">
        {(
          [
            ["open", `Odprti (${openCount})`],
            ["done", `Opravljeni (${doneCount})`],
            ["all", `Vsi (${rows.length})`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setView(value)}
            aria-pressed={view === value}
            className={cx(
              "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
              view === value
                ? "bg-[var(--vo-surface-2)] text-[var(--vo-fg)]"
                : "text-[var(--vo-muted)] hover:text-[var(--vo-fg)]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <EmptyState>{view === "done" ? "Ni opravljenih opomnikov." : "Ni odprtih opomnikov. 🎉"}</EmptyState>
      ) : (
        <div className="space-y-6">
          {groups.map(({ state, items }) => (
            <section key={state}>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--vo-fg)]">
                {GROUP_TITLES[state]}
                <span className="text-xs font-normal text-[var(--vo-muted)]">{items.length}</span>
              </h2>
              <ul className="divide-y divide-[var(--vo-border)] overflow-hidden rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)]">
                {items.map((r) => (
                  <li
                    key={r.id}
                    className={cx(
                      "flex flex-wrap items-center gap-3 px-4 py-3",
                      r.completed && "opacity-60",
                      busyId === r.id && "pointer-events-none opacity-50",
                    )}
                  >
                    {isAdmin && dbConfigured ? (
                      <button
                        type="button"
                        onClick={() => toggleCompleted(r)}
                        aria-label={r.completed ? "Ponovno odpri" : "Označi kot opravljeno"}
                        title={r.completed ? "Ponovno odpri" : "Označi kot opravljeno"}
                        className={cx(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                          r.completed
                            ? "border-[var(--vo-accent)] bg-[var(--vo-accent)] text-[var(--vo-accent-fg)]"
                            : "border-[var(--vo-border-strong)] hover:border-[var(--vo-accent)]",
                        )}
                      >
                        {r.completed ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                      </button>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className={cx("text-sm font-medium text-[var(--vo-fg)]", r.completed && "line-through")}>
                        {r.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--vo-muted)]">
                        {r.clientName} · {REMINDER_KIND_LABELS[r.kind]}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <time dateTime={r.dueDate} className="text-xs tabular-nums text-[var(--vo-muted)]">
                        {formatDate(r.dueDate)}
                      </time>
                      <Badge tone={DUE_TONES[state]}>{DUE_LABELS[state]}</Badge>
                      {isAdmin && dbConfigured ? (
                        <div className="flex">
                          {r.completed ? (
                            <Button size="sm" variant="ghost" onClick={() => toggleCompleted(r)} aria-label="Ponovno odpri">
                              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                            </Button>
                          ) : null}
                          <Button size="sm" variant="danger" onClick={() => handleDelete(r)} aria-label="Izbriši opomnik">
                            <Trash2 className="h-3.5 w-3.5" aria-hidden />
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
