import { NextResponse } from "next/server";
import { getContactMailStatus } from "@/lib/contact-email";

export async function GET() {
  const mail = getContactMailStatus();
  const status = mail.configured ? "ok" : "degraded";
  return NextResponse.json(
    {
      status,
      time: new Date().toISOString(),
      checks: {
        contactMailConfigured: mail.configured,
        contactMailMode: mail.mode,
        contactMailHint: mail.hint,
      },
    },
    { status: status === "ok" ? 200 : 503 },
  );
}
