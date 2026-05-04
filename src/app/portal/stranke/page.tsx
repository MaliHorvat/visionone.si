"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePortalRole } from "@/context/PortalRoleContext";
import { getMockClients, mockClientPortalClientId } from "@/lib/mock-data";

export default function StrankeListPage() {
  const { role } = usePortalRole();
  const router = useRouter();
  const clients = getMockClients();

  useEffect(() => {
    if (role === "client") {
      router.replace(`/portal/stranke/${mockClientPortalClientId}`);
    }
  }, [role, router]);

  if (role === "client") {
    return (
      <p className="text-sm text-[var(--vo-muted)]">Preusmerjam na vaš objekt …</p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--vo-fg)]">Stranke</h1>
        <p className="mt-1 text-sm text-[var(--vo-muted)]">
          Seznam strank in paketov — kasneje GET /api/clients.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--vo-border)] bg-[var(--vo-surface)] shadow-[var(--vo-card-shadow)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--vo-border)] bg-[var(--vo-surface-2)] text-[var(--vo-muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Ime</th>
              <th className="px-4 py-3 font-medium">Naslov</th>
              <th className="px-4 py-3 font-medium">Kontakt</th>
              <th className="px-4 py-3 font-medium">Paket</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-[var(--vo-border)] last:border-0">
                <td className="px-4 py-3 font-medium text-[var(--vo-fg)]">{c.name}</td>
                <td className="px-4 py-3 text-[var(--vo-muted)]">{c.address}</td>
                <td className="px-4 py-3 text-[var(--vo-muted)]">
                  {c.contact}
                  <br />
                  <span className="text-xs">{c.email}</span>
                </td>
                <td className="px-4 py-3 capitalize text-[var(--vo-fg)]">{c.package}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      c.health === "ok"
                        ? "bg-[var(--vo-ok-muted)] text-[var(--vo-ok)]"
                        : "bg-[var(--vo-danger-muted)] text-[var(--vo-danger)]"
                    }`}
                  >
                    {c.health === "ok" ? "V redu" : "Alarm"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/portal/stranke/${c.id}`}
                    className="font-medium text-[var(--vo-accent)] hover:underline"
                  >
                    Profil
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
