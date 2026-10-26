"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { usePortalRole } from "@/context/PortalRoleContext";
import { mockClientPortalClientId } from "@/lib/mock-data";
import { apiSend } from "@/lib/portal-api";
import type { ClientSummary, SubscriptionPackageDto } from "@/lib/types";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  DemoDataNotice,
  Field,
  Notice,
  PageHeader,
  TableWrap,
  formatEur,
  inputClass,
  tdClass,
  thClass,
  trClass,
} from "@/components/portal/ui";

type Props = {
  clients: ClientSummary[];
  packages: SubscriptionPackageDto[];
  dbConfigured: boolean;
  openNew?: boolean;
};

type FormState = { mode: "new" } | { mode: "edit"; client: ClientSummary } | null;
type Filter = "all" | "alarm" | "nopackage";

export function StrankeView({ clients, packages, dbConfigured, openNew }: Props) {
  const { role } = usePortalRole();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(openNew ? { mode: "new" } : null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "danger"; text: string } | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (role === "client") router.replace(`/portal/stranke/${mockClientPortalClientId}`);
  }, [role, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("sl");
    return clients.filter((c) => {
      if (filter === "alarm" && c.health !== "alarm") return false;
      if (filter === "nopackage" && c.package) return false;
      if (!q) return true;
      return [c.name, c.address, c.contact, c.email, c.package?.name ?? ""]
        .join(" ")
        .toLocaleLowerCase("sl")
        .includes(q);
    });
  }, [clients, query, filter]);

  if (role === "client") {
    return <p className="text-sm text-[var(--vo-muted)]">Preusmerjam na vaš objekt …</p>;
  }

  const alarmCount = clients.filter((c) => c.health === "alarm").length;
  const noPackageCount = clients.filter((c) => !c.package).length;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;
    setError(null);
    setSubmitting(true);
    const fd = new FormData(event.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      address: String(fd.get("address") ?? "").trim(),
      contact: String(fd.get("contact") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      health: String(fd.get("health") ?? "ok"),
      packageId: String(fd.get("packageId") ?? "") || null,
    };
    const err =
      form.mode === "new"
        ? await apiSend("/api/clients", "POST", payload)
        : await apiSend(`/api/clients/${form.client.id}`, "PUT", payload);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    setNotice({ tone: "ok", text: form.mode === "new" ? "Stranka je dodana." : "Spremembe so shranjene." });
    setForm(null);
    router.refresh();
  }

  async function handleDelete(c: ClientSummary) {
    if (!confirm(`Izbrišem stranko »${c.name}« in vse njene naprave? Tega ni mogoče razveljaviti.`)) return;
    const err = await apiSend(`/api/clients/${c.id}`, "DELETE");
    setNotice(err ? { tone: "danger", text: err } : { tone: "ok", text: "Stranka je izbrisana." });
    if (!err) router.refresh();
  }

  const editing = form?.mode === "edit" ? form.client : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stranke"
        subtitle={`${clients.length} ${clients.length === 1 ? "stranka" : "strank"} · ${alarmCount} v alarmu`}
        actions={
          <Button
            variant="primary"
            onClick={() => {
              setError(null);
              setForm(form?.mode === "new" ? null : { mode: "new" });
            }}
            disabled={!dbConfigured}
            title={!dbConfigured ? "Na voljo, ko je baza povezana" : undefined}
          >
            <Plus className="h-4 w-4" aria-hidden />
            Nova stranka
          </Button>
        }
      />

      {!dbConfigured ? <DemoDataNotice /> : null}
      {notice ? (
        <Notice tone={notice.tone} onClose={() => setNotice(null)}>
          {notice.text}
        </Notice>
      ) : null}

      {form ? (
        <Card>
          <CardHeader title={editing ? `Uredi: ${editing.name}` : "Nova stranka"} />
          <form key={editing?.id ?? "new"} onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Ime stranke *">
                <input name="name" required defaultValue={editing?.name} className={inputClass} autoFocus />
              </Field>
              <Field label="Naslov objekta">
                <input name="address" defaultValue={editing?.address} className={inputClass} />
              </Field>
              <Field label="Kontaktna oseba">
                <input name="contact" defaultValue={editing?.contact} className={inputClass} />
              </Field>
              <Field label="E-naslov">
                <input name="email" type="email" defaultValue={editing?.email} className={inputClass} />
              </Field>
              <Field label="Vzdrževalni paket">
                <select name="packageId" defaultValue={editing?.package?.id ?? ""} className={inputClass}>
                  <option value="">— brez paketa —</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({formatEur(p.price)} / mesec)
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Stanje objekta">
                <select name="health" defaultValue={editing?.health ?? "ok"} className={inputClass}>
                  <option value="ok">V redu</option>
                  <option value="alarm">Alarm</option>
                </select>
              </Field>
            </div>
            {error ? <Notice tone="danger">{error}</Notice> : null}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? "Shranjujem…" : "Shrani"}
              </Button>
              <Button onClick={() => setForm(null)}>Prekliči</Button>
            </div>
          </form>
        </Card>
      ) : null}

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
            placeholder="Išči po imenu, naslovu, kontaktu …"
            aria-label="Iskanje strank"
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] p-1">
          {(
            [
              ["all", `Vse (${clients.length})`],
              ["alarm", `Alarm (${alarmCount})`],
              ["nopackage", `Brez paketa (${noPackageCount})`],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === value
                  ? "bg-[var(--vo-surface-2)] text-[var(--vo-fg)]"
                  : "text-[var(--vo-muted)] hover:text-[var(--vo-fg)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <TableWrap minWidth={760}>
        <thead>
          <tr>
            <th className={thClass}>Stranka</th>
            <th className={thClass}>Kontakt</th>
            <th className={thClass}>Paket</th>
            <th className={thClass}>Stanje</th>
            <th className={thClass}>
              <span className="sr-only">Dejanja</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-sm text-[var(--vo-muted)]">
                {clients.length === 0 ? "Ni še nobene stranke." : "Ni zadetkov za izbrani filter."}
              </td>
            </tr>
          ) : null}
          {filtered.map((c) => (
            <tr key={c.id} className={trClass}>
              <td className={tdClass}>
                <Link href={`/portal/stranke/${c.id}`} className="font-medium text-[var(--vo-fg)] hover:text-[var(--vo-accent)]">
                  {c.name}
                </Link>
                <div className="text-xs text-[var(--vo-muted)]">{c.address || "—"}</div>
              </td>
              <td className={tdClass}>
                <div className="text-[var(--vo-fg)]">{c.contact || "—"}</div>
                {c.email ? (
                  <a href={`mailto:${c.email}`} className="text-xs text-[var(--vo-muted)] hover:text-[var(--vo-accent)]">
                    {c.email}
                  </a>
                ) : null}
              </td>
              <td className={tdClass}>
                {c.package ? (
                  <>
                    <div className="text-[var(--vo-fg)]">{c.package.name}</div>
                    <div className="text-xs text-[var(--vo-muted)]">{formatEur(c.package.price)} / mesec</div>
                  </>
                ) : (
                  <span className="text-[var(--vo-subtle)]">—</span>
                )}
              </td>
              <td className={tdClass}>
                <Badge tone={c.health === "ok" ? "ok" : "danger"} dot>
                  {c.health === "ok" ? "V redu" : "Alarm"}
                </Badge>
              </td>
              <td className={`${tdClass} text-right`}>
                <div className="flex justify-end gap-1">
                  <Link
                    href={`/portal/stranke/${c.id}`}
                    className="rounded-md px-2.5 py-1 text-xs font-semibold text-[var(--vo-accent)] hover:bg-[var(--vo-accent-muted)]"
                  >
                    Profil
                  </Link>
                  {dbConfigured ? (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setError(null);
                          setForm({ mode: "edit", client: c });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        aria-label={`Uredi ${c.name}`}
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(c)} aria-label={`Izbriši ${c.name}`}>
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </Button>
                    </>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </div>
  );
}
