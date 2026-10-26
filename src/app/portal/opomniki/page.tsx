import { listClients } from "@/lib/repositories/clients";
import { listReminders } from "@/lib/repositories/reminders";
import { isDbConfigured } from "@/lib/db";
import { OpomnikiView } from "./OpomnikiView";

export const dynamic = "force-dynamic";

type Props = { searchParams?: Promise<{ nov?: string }> };

export default async function OpomnikiPage({ searchParams }: Props) {
  const params = await searchParams;
  const [reminders, clients] = await Promise.all([listReminders(), listClients()]);
  return (
    <OpomnikiView
      reminders={reminders}
      clients={clients}
      dbConfigured={isDbConfigured()}
      openNew={params?.nov === "1"}
    />
  );
}
