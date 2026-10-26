"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePortalRole } from "@/context/PortalRoleContext";

export function ProfileBackNav() {
  const { role } = usePortalRole();
  const [href, label] = role === "client" ? ["/portal", "Nazaj na pregled"] : ["/portal/stranke", "Vse stranke"];
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--vo-muted)] hover:text-[var(--vo-accent)]"
    >
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
      {label}
    </Link>
  );
}
