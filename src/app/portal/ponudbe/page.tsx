import { listClients } from "@/lib/repositories/clients";
import { PonudbeView } from "./PonudbeView";

export const dynamic = "force-dynamic";

export default async function PonudbePage() {
  const clients = await listClients();
  return <PonudbeView clients={clients} />;
}
