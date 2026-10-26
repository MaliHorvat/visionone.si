import { listClients } from "@/lib/repositories/clients";
import { listReminders } from "@/lib/repositories/reminders";
import { isDbConfigured } from "@/lib/db";
import { DashboardView } from "./DashboardView";

export const dynamic = "force-dynamic";

export default async function PortalDashboardPage() {
  const [clients, reminders] = await Promise.all([listClients(), listReminders()]);
  return <DashboardView clients={clients} reminders={reminders} dbConfigured={isDbConfigured()} />;
}
