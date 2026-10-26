"use client";

import Link from "next/link";
import { CalendarPlus, Camera, ChevronRight, FileText, ScanSearch, UserPlus, Wrench } from "lucide-react";
import { usePortalRole } from "@/context/PortalRoleContext";
import { mockClientPortalClientId } from "@/lib/mock-data";
import {
  DUE_LABELS,
  DUE_TONES,
  REMINDER_KIND_LABELS,
  greetingSl,
  longDateSl,
  reminderDueState,
  todayIso,
} from "@/lib/portal-dates";
import type { ClientSummary, MaintenanceReminder } from "@/lib/types";
import {
  Badge,
  DemoDataNotice,
  EmptyState,
  QuickAction,
  SectionTitle,
  StatCard,
  buttonClass,
  formatDate,
  formatEur,
} from "@/components/portal/ui";

type Props = {
  clients: ClientSummary[];
  reminders: MaintenanceReminder[];
  dbConfigured: boolean;
};

export function DashboardView({ clients, reminders, dbConfigured }: Props) {
  const { role } = usePortalRole();
  const isAdmin = role === "admin";
  const today = todayIso();

  const myClients = isAdmin ? clients : clients.filter((c) => c.id === mockClientPortalClientId);
  const myReminders = isAdmin ? reminders : reminders.filter((r) => r.clientId === mockClientPortalClientId);

  const open = myReminders.filter((r) => !r.completed);
  const focus = open
    .map((r) => ({ r, state: reminderDueState(r, today) }))
    .filter(({ state }) => state === "overdue" || state === "today" || state === "soon")
    .sort((a, b) => a.r.dueDate.localeCompare(b.r.dueDate));
  const overdueCount = focus.filter((f) => f.state === "overdue").length;

  const alarms = myClients.filter((c) => c.health === "alarm");
  const monthlyRecurring = myClients.reduce((sum, c) => sum + (c.package?.price ?? 0), 0);
  const withPackage = myClients.filter((c) => c.package).length;

  const sortedClients = [...myClients].sort((a, b) =>
    a.health === b.health ? a.name.localeCompare(b.name, "sl") : a.health === "alarm" ? -1 : 1,
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-[26px] font-semibold text-[var(--vo-fg)]" suppressHydrationWarning>
          {greetingSl()}, {isAdmin ? "Skrbnik" : myClients[0]?.contact || "stranka"}
        </h1>
        <p className="mt-0.5 text-sm text-[var(--vo-muted)]" suppressHydrationWarning>
          {longDateSl()}
        </p>
      </header>

      {!dbConfigured && isAdmin ? <DemoDataNotice /> : null}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Hitra dejanja">
        {isAdmin ? (
          <>
            <QuickAction href="/portal/stranke?nova=1" label="Nova stranka" icon={UserPlus} />
            <QuickAction href="/portal/opomniki?nov=1" label="Opomnik" icon={CalendarPlus} />
            <QuickAction href="/portal/ponudbe" label="Ponudba" icon={FileText} />
            <QuickAction href="/portal/orodja" label="Sken omrežja" icon={ScanSearch} />
          </>
        ) : (
          <>
            <QuickAction href={`/portal/stranke/${mockClientPortalClientId}`} label="Moj objekt" icon={Camera} />
            <QuickAction href="/portal/opomniki" label="Servisi" icon={CalendarPlus} />
            <QuickAction href="/portal/orodja" label="Orodja" icon={Wrench} />
            <QuickAction href="/kontakt" label="Podpora" icon={FileText} />
          </>
        )}
      </section>

      <section>
        <SectionTitle
          action={
            <Link href="/portal/opomniki" className={buttonClass("secondary", "sm")}>
              Vsi opomniki
            </Link>
          }
        >
          {overdueCount > 0 ? "Zamujeno in ta teden" : "Danes in ta teden"}
        </SectionTitle>
        {focus.length === 0 ? (
          <EmptyState>Ni odprtih opravil za ta teden.</EmptyState>
        ) : (
          <ul className="divide-y divide-[var(--vo-border)] overflow-hidden rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)]">
            {focus.slice(0, 6).map(({ r, state }) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--vo-fg)]">{r.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--vo-muted)]">
                    {r.clientName} · {REMINDER_KIND_LABELS[r.kind]}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs tabular-nums text-[var(--vo-muted)]">{formatDate(r.dueDate)}</span>
                  <Badge tone={DUE_TONES[state]}>{DUE_LABELS[state]}</Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionTitle>Poslovanje</SectionTitle>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {isAdmin ? (
            <StatCard value={formatEur(monthlyRecurring)} label="Mesečni prihodek iz paketov (brez DDV)" />
          ) : (
            <StatCard value={myClients[0]?.package?.name ?? "—"} label="Vaš vzdrževalni paket" />
          )}
          <StatCard
            value={`${withPackage} / ${myClients.length}`}
            label={isAdmin ? "Strank s paketom / vseh" : "Objektov s paketom"}
            href={isAdmin ? "/portal/stranke" : undefined}
          />
          <StatCard
            value={alarms.length}
            label="Objektov v alarmu"
            tone={alarms.length > 0 ? "danger" : "ok"}
            href={isAdmin ? "/portal/stranke" : undefined}
          />
          <StatCard
            value={open.length}
            label={overdueCount > 0 ? `Odprtih opomnikov (${overdueCount} zamuja)` : "Odprtih opomnikov"}
            tone={overdueCount > 0 ? "warn" : "default"}
            href="/portal/opomniki"
          />
        </div>
      </section>

      <section>
        <SectionTitle
          action={
            isAdmin ? (
              <Link href="/portal/stranke" className={buttonClass("secondary", "sm")}>
                Vse stranke
              </Link>
            ) : null
          }
        >
          Stanje objektov
        </SectionTitle>
        {sortedClients.length === 0 ? (
          <EmptyState>Ni strank.</EmptyState>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {sortedClients.slice(0, 9).map((c) => (
              <Link
                key={c.id}
                href={`/portal/stranke/${c.id}`}
                className="group flex items-center gap-3 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] px-4 py-3 transition-colors hover:border-[var(--vo-border-strong)] hover:bg-[var(--vo-surface-hover)]"
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    c.health === "ok"
                      ? "bg-[var(--vo-ok)] shadow-[0_0_8px_var(--vo-ok)]"
                      : "bg-[var(--vo-danger)] shadow-[0_0_8px_var(--vo-danger)]"
                  }`}
                  aria-label={c.health === "ok" ? "V redu" : "Alarm"}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--vo-fg)]">{c.name}</p>
                  <p className="truncate text-xs text-[var(--vo-muted)]">
                    {c.health === "ok" ? "Vse naprave delujejo" : "Potrebna je pozornost"}
                    {c.package ? ` · ${c.package.name}` : ""}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[var(--vo-subtle)] group-hover:text-[var(--vo-fg)]" aria-hidden />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
