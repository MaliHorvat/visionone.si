import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { PortalRoleProvider } from "@/context/PortalRoleContext";
import { PortalShell } from "@/components/portal/PortalShell";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <PortalRoleProvider>
      <PortalShell>{children}</PortalShell>
    </PortalRoleProvider>
  );
}
