"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminGate } from "@/components/portal/AdminGate";
import { apiSend } from "@/lib/portal-api";
import type { SubscriptionPackageDto } from "@/lib/types";
import {
  Button,
  Card,
  CardHeader,
  DemoDataNotice,
  EmptyState,
  Field,
  Notice,
  PageHeader,
  formatEur,
  inputClass,
} from "@/components/portal/ui";

type Props = {
  packages: SubscriptionPackageDto[];
  dbConfigured: boolean;
};

function readForm(event: React.FormEvent<HTMLFormElement>) {
  const fd = new FormData(event.currentTarget);
  return {
    name: String(fd.get("name") ?? "").trim(),
    price: Number(String(fd.get("price") ?? "0").replace(",", ".")) || 0,
    description: String(fd.get("description") ?? "").trim(),
  };
}

function PackageFields({ pkg }: { pkg?: SubscriptionPackageDto }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_180px]">
      <Field label="Ime paketa *">
        <input name="name" required defaultValue={pkg?.name} className={inputClass} />
      </Field>
      <Field label="Cena na mesec (€, brez DDV) *">
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={pkg?.price}
          className={inputClass}
        />
      </Field>
      <Field label="Kaj paket vključuje" className="md:col-span-2">
        <textarea name="description" rows={3} defaultValue={pkg?.description} className={inputClass} />
      </Field>
    </div>
  );
}

export function PaketiView({ packages, dbConfigured }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "danger"; text: string } | null>(null);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const err = await apiSend("/api/packages", "POST", readForm(event));
    setSubmitting(false);
    if (err) return setError(err);
    setNotice({ tone: "ok", text: "Paket je dodan." });
    setShowForm(false);
    router.refresh();
  }

  async function handleSaveEdit(event: React.FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    setSubmitting(true);
    const err = await apiSend(`/api/packages/${id}`, "PUT", readForm(event));
    setSubmitting(false);
    if (err) return setNotice({ tone: "danger", text: err });
    setNotice({ tone: "ok", text: "Paket je posodobljen." });
    setEditingId(null);
    router.refresh();
  }

  async function handleDelete(p: SubscriptionPackageDto) {
    if (!confirm(`Izbrišem paket »${p.name}«? Stranke s tem paketom ostanejo brez paketa.`)) return;
    const err = await apiSend(`/api/packages/${p.id}`, "DELETE");
    setNotice(err ? { tone: "danger", text: err } : { tone: "ok", text: "Paket je izbrisan." });
    if (!err) router.refresh();
  }

  return (
    <AdminGate>
      <div className="space-y-6">
        <PageHeader
          title="Vzdrževalni paketi"
          subtitle="Cenik mesečnih paketov, ki jih dodelite strankam."
          actions={
            <Button
              variant="primary"
              onClick={() => {
                setError(null);
                setShowForm((s) => !s);
              }}
              disabled={!dbConfigured}
            >
              <Plus className="h-4 w-4" aria-hidden />
              Nov paket
            </Button>
          }
        />

        {!dbConfigured ? <DemoDataNotice /> : null}
        {notice ? (
          <Notice tone={notice.tone} onClose={() => setNotice(null)}>
            {notice.text}
          </Notice>
        ) : null}

        {showForm ? (
          <Card>
            <CardHeader title="Nov paket" />
            <form onSubmit={handleCreate} className="space-y-4 p-4">
              <PackageFields />
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

        {packages.length === 0 ? (
          <EmptyState>Ni še nobenega paketa.</EmptyState>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((p) =>
              editingId === p.id ? (
                <Card key={p.id} className="md:col-span-2 xl:col-span-3">
                  <CardHeader title={`Uredi: ${p.name}`} />
                  <form onSubmit={(e) => handleSaveEdit(e, p.id)} className="space-y-4 p-4">
                    <PackageFields pkg={p} />
                    <div className="flex gap-2">
                      <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? "Shranjujem…" : "Shrani"}
                      </Button>
                      <Button onClick={() => setEditingId(null)}>Prekliči</Button>
                    </div>
                  </form>
                </Card>
              ) : (
                <Card key={p.id} className="flex flex-col p-5">
                  <h3 className="text-base font-semibold text-[var(--vo-fg)]">{p.name}</h3>
                  <p className="mt-2">
                    <span className="text-2xl font-semibold tabular-nums text-[var(--vo-accent)]">
                      {formatEur(p.price)}
                    </span>
                    <span className="text-sm text-[var(--vo-muted)]"> / mesec</span>
                  </p>
                  <p className="mt-3 flex-1 whitespace-pre-line text-sm text-[var(--vo-muted)]">
                    {p.description || "Brez opisa."}
                  </p>
                  {dbConfigured ? (
                    <div className="mt-4 flex gap-1 border-t border-[var(--vo-border)] pt-3">
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(p.id)}>
                        <Pencil className="h-3.5 w-3.5" aria-hidden />
                        Uredi
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(p)}>
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        Izbriši
                      </Button>
                    </div>
                  ) : null}
                </Card>
              ),
            )}
          </div>
        )}
      </div>
    </AdminGate>
  );
}
