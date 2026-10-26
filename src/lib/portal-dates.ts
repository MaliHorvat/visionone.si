import type { MaintenanceReminder, ReminderKind } from "@/lib/types";

/** Portal teče za ekipo v Sloveniji — „danes" vedno računamo v tem pasu (enako na strežniku in v brskalniku). */
export const PORTAL_TZ = "Europe/Ljubljana";

export function todayIso(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: PORTAL_TZ }).format(now);
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function longDateSl(now = new Date()): string {
  return now.toLocaleDateString("sl-SI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PORTAL_TZ,
  });
}

export function greetingSl(now = new Date()): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: PORTAL_TZ }).format(now),
  );
  if (hour < 10) return "Dobro jutro";
  if (hour < 18) return "Dober dan";
  return "Dober večer";
}

export const REMINDER_KIND_LABELS: Record<ReminderKind, string> = {
  ciscenje_kamer: "Čiščenje kamer",
  diski: "Diski",
  servis: "Servis",
  drugo: "Drugo",
};

export type DueState = "done" | "overdue" | "today" | "soon" | "later";

export function reminderDueState(r: Pick<MaintenanceReminder, "dueDate" | "completed">, today = todayIso()): DueState {
  if (r.completed) return "done";
  const due = r.dueDate.slice(0, 10);
  if (due < today) return "overdue";
  if (due === today) return "today";
  if (due <= addDaysIso(today, 7)) return "soon";
  return "later";
}

export const DUE_LABELS: Record<DueState, string> = {
  done: "Opravljeno",
  overdue: "Zamuja",
  today: "Danes",
  soon: "Ta teden",
  later: "Načrtovano",
};

export const DUE_TONES = {
  done: "neutral",
  overdue: "danger",
  today: "warn",
  soon: "accent",
  later: "neutral",
} as const;
