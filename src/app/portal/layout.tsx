import type { Metadata, Viewport } from "next";
import { PortalRoleProvider } from "@/context/PortalRoleContext";
import { PortalShell } from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: "Portal",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#141c2b",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalRoleProvider>
      {/* Portal je vedno temen; ozadje strani poravnamo, da ob „overscroll" ne utripne svetlo. */}
      <style>{`html,body{background:#111827}`}</style>
      <PortalShell>{children}</PortalShell>
    </PortalRoleProvider>
  );
}
