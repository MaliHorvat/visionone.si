"use client";

import { ShieldCheck } from "lucide-react";
import { usePortalRole } from "@/context/PortalRoleContext";
import { Button } from "./ui";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { role, setRole } = usePortalRole();
  if (role === "client") {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)] p-8 text-center">
        <ShieldCheck className="mx-auto h-6 w-6 text-[var(--vo-accent)]" aria-hidden />
        <p className="mt-3 font-medium text-[var(--vo-fg)]">Ta modul je na voljo le skrbnikom.</p>
        <p className="mt-1 text-sm text-[var(--vo-muted)]">Trenutno gledate portal v predogledu stranke.</p>
        <Button variant="primary" className="mt-5" onClick={() => setRole("admin")}>
          Preklopi na skrbniški pogled
        </Button>
      </div>
    );
  }
  return <>{children}</>;
}
