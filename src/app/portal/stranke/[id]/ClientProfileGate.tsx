"use client";

import { Lock } from "lucide-react";
import { usePortalRole } from "@/context/PortalRoleContext";
import { mockClientPortalClientId } from "@/lib/mock-data";

export function ClientProfileGate({ clientId, children }: { clientId: string; children: React.ReactNode }) {
  const { role } = usePortalRole();

  if (role === "client" && clientId !== mockClientPortalClientId) {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] p-8 text-center">
        <Lock className="mx-auto h-6 w-6 text-[var(--vo-muted)]" aria-hidden />
        <p className="mt-3 font-medium text-[var(--vo-fg)]">Nimate dostopa do tega objekta.</p>
        <p className="mt-1 text-sm text-[var(--vo-muted)]">Pogled stranke je omejen na njen objekt.</p>
      </div>
    );
  }

  return <>{children}</>;
}
