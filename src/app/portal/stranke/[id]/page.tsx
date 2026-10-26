import { notFound } from "next/navigation";
import { Camera, HardDrive, Network, Server } from "lucide-react";
import { NetworkTopology } from "@/components/portal/NetworkTopology";
import { RackView } from "@/components/portal/RackView";
import { ClientProfileGate } from "./ClientProfileGate";
import { ProfileBackNav } from "./ProfileBackNav";
import { mockTopologyEdges, mockTopologyNodes, mockRackUnits } from "@/lib/mock-data";
import { getClient } from "@/lib/repositories/clients";
import type { DeviceStatus, DiskHealth } from "@/lib/types";
import {
  Badge,
  Card,
  CardHeader,
  PageHeader,
  StatCard,
  formatDate,
  formatEur,
  formatNumber,
} from "@/components/portal/ui";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

const DEVICE_STATUS: Record<DeviceStatus, { label: string; tone: "ok" | "danger" | "warn" }> = {
  online: { label: "Povezano", tone: "ok" },
  offline: { label: "Brez povezave", tone: "danger" },
  alarm: { label: "Alarm", tone: "warn" },
};

const DISK_HEALTH: Record<DiskHealth, { label: string; tone: "ok" | "danger" | "warn" }> = {
  ok: { label: "Zdrav", tone: "ok" },
  warn: { label: "Opozorilo", tone: "warn" },
  fail: { label: "Okvara", tone: "danger" },
};

function StatusBadge({ status }: { status: DeviceStatus }) {
  const s = DEVICE_STATUS[status];
  return (
    <Badge tone={s.tone} dot>
      {s.label}
    </Badge>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="px-4 py-6 text-center text-sm text-[var(--vo-muted)]">{children}</p>;
}

const th = "px-4 py-2 text-xs font-medium uppercase tracking-wide text-[var(--vo-muted)]";
const td = "border-t border-[var(--vo-border)] px-4 py-2.5";

export default async function StrankaProfilPage({ params }: Props) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();

  const camsOnline = client.cameras.filter((c) => c.status === "online").length;
  const nvrsOnline = client.nvrs.filter((n) => n.status === "online").length;
  const storageTb = client.disks.reduce((s, d) => s + d.sizeTb, 0);
  const badDisks = client.disks.filter((d) => d.health !== "ok").length;

  return (
    <ClientProfileGate clientId={id}>
      <div className="space-y-6">
        <PageHeader
          back={<ProfileBackNav />}
          title={
            <span className="flex flex-wrap items-center gap-3">
              {client.name}
              <Badge tone={client.health === "ok" ? "ok" : "danger"} dot>
                {client.health === "ok" ? "V redu" : "Alarm"}
              </Badge>
            </span>
          }
          subtitle={
            <>
              {client.address || "Naslov ni vnesen"}
              {client.contact ? ` · ${client.contact}` : ""}
              {client.email ? (
                <>
                  {" · "}
                  <a href={`mailto:${client.email}`} className="hover:text-[var(--vo-accent)]">
                    {client.email}
                  </a>
                </>
              ) : null}
            </>
          }
          actions={
            <div className="rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] px-4 py-2 text-sm">
              <span className="text-[var(--vo-muted)]">Paket: </span>
              <span className="font-semibold text-[var(--vo-fg)]">{client.package?.name ?? "—"}</span>
              {client.package ? (
                <span className="text-[var(--vo-muted)]"> · {formatEur(client.package.price)} / mesec</span>
              ) : null}
            </div>
          }
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            value={`${camsOnline} / ${client.cameras.length}`}
            label="Kamer povezanih"
            tone={camsOnline < client.cameras.length ? "danger" : "default"}
          />
          <StatCard
            value={`${nvrsOnline} / ${client.nvrs.length}`}
            label="Snemalnikov povezanih"
            tone={nvrsOnline < client.nvrs.length ? "danger" : "default"}
          />
          <StatCard value={`${formatNumber(storageTb)} TB`} label="Skupni prostor na diskih" />
          <StatCard
            value={badDisks}
            label="Diskov z opozorilom"
            tone={badDisks > 0 ? "warn" : "ok"}
          />
        </div>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader title="Kamere" icon={Camera} />
            {client.cameras.length === 0 ? (
              <Empty>Ni kamer.</Empty>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead>
                    <tr>
                      <th className={th}>Ime</th>
                      <th className={th}>IP</th>
                      <th className={th}>Model</th>
                      <th className={th}>Stanje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.cameras.map((cam) => (
                      <tr key={cam.id}>
                        <td className={`${td} text-[var(--vo-fg)]`}>{cam.name}</td>
                        <td className={`${td} font-mono text-xs text-[var(--vo-muted)]`}>{cam.ip}</td>
                        <td className={`${td} text-[var(--vo-muted)]`}>{cam.model}</td>
                        <td className={td}>
                          <StatusBadge status={cam.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card className="overflow-hidden">
            <CardHeader title="Snemalniki (NVR)" icon={Server} />
            {client.nvrs.length === 0 ? (
              <Empty>Ni snemalnikov.</Empty>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead>
                    <tr>
                      <th className={th}>Ime</th>
                      <th className={th}>IP</th>
                      <th className={th}>Disk</th>
                      <th className={th}>Stanje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.nvrs.map((n) => (
                      <tr key={n.id}>
                        <td className={`${td} text-[var(--vo-fg)]`}>
                          {n.name}
                          <div className="text-xs text-[var(--vo-muted)]">{n.model}</div>
                        </td>
                        <td className={`${td} font-mono text-xs text-[var(--vo-muted)]`}>{n.ip}</td>
                        <td className={`${td} text-[var(--vo-muted)]`}>{formatNumber(n.diskTb)} TB</td>
                        <td className={td}>
                          <StatusBadge status={n.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card className="overflow-hidden">
            <CardHeader title="Stikala" icon={Network} />
            {client.switches.length === 0 ? (
              <Empty>Ni stikal.</Empty>
            ) : (
              <ul>
                {client.switches.map((s) => (
                  <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--vo-border)] px-4 py-2.5 first:border-0 text-sm">
                    <div className="min-w-0">
                      <p className="text-[var(--vo-fg)]">{s.name}</p>
                      <p className="text-xs text-[var(--vo-muted)]">
                        <span className="font-mono">{s.ip}</span> · {s.ports} vrat
                      </p>
                    </div>
                    <StatusBadge status={s.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="overflow-hidden">
            <CardHeader title="Diski" icon={HardDrive} />
            {client.disks.length === 0 ? (
              <Empty>Ni diskov.</Empty>
            ) : (
              <ul>
                {client.disks.map((d) => (
                  <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--vo-border)] px-4 py-2.5 first:border-0 text-sm">
                    <div className="min-w-0">
                      <p className="text-[var(--vo-fg)]">{d.label}</p>
                      <p className="text-xs text-[var(--vo-muted)]">
                        {formatNumber(d.sizeTb)} TB · vgrajen {formatDate(d.installedAt)}
                      </p>
                    </div>
                    <Badge tone={DISK_HEALTH[d.health].tone} dot>
                      {DISK_HEALTH[d.health].label}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <NetworkTopology nodes={mockTopologyNodes} edges={mockTopologyEdges} />
          <RackView units={mockRackUnits} />
        </section>
      </div>
    </ClientProfileGate>
  );
}
