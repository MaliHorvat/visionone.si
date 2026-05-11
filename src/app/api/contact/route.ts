import { NextResponse } from "next/server";

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 10000;

const SITE_TYPE_LABELS: Record<string, string> = {
  retail: "Trgovina / retail",
  logistics: "Logistika / skladišče",
  office: "Poslovni objekt",
  residential: "Stanovanjski objekt",
  other: "Drugo",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "Takoj",
  "30d": "V 30 dneh",
  "90d": "V 3 mesecih",
  later: "Kasneje / planiranje",
};

type Body = {
  name?: string;
  email?: string;
  siteType?: string;
  cameraCount?: number | string;
  timeline?: string;
  message?: string;
  /** Honeypot — mora ostati prazen */
  website?: string;
};

function trim(s: string, max: number) {
  const t = s.trim();
  return t.length > max ? t.slice(0, max) : t;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO?.trim();
  const from = process.env.CONTACT_FORM_FROM?.trim();

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Kontaktni obrazec ni konfiguriran na strežniku." },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Neveljavna zahteva." }, { status: 400 });
  }

  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = trim(String(body.name ?? ""), MAX_NAME);
  const email = trim(String(body.email ?? ""), MAX_EMAIL);
  const siteType = String(body.siteType ?? "");
  const timeline = String(body.timeline ?? "");
  const message = trim(String(body.message ?? ""), MAX_MESSAGE);
  const cameraRaw = body.cameraCount;
  const cameraCount =
    typeof cameraRaw === "number"
      ? cameraRaw
      : Number.parseInt(String(cameraRaw ?? ""), 10);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ime in veljavna e-pošta sta obvezna." }, { status: 400 });
  }
  if (!SITE_TYPE_LABELS[siteType] || !TIMELINE_LABELS[timeline]) {
    return NextResponse.json({ error: "Izberite tip objekta in rok." }, { status: 400 });
  }
  if (!Number.isFinite(cameraCount) || cameraCount < 1 || cameraCount > 99999) {
    return NextResponse.json({ error: "Neveljavno število kamer." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Sporočilo je obvezno." }, { status: 400 });
  }

  const siteLabel = SITE_TYPE_LABELS[siteType];
  const timeLabel = TIMELINE_LABELS[timeline];
  const subject = `[VisionOne] Nova ponudba — ${name}`;
  const text = [
    `Nova zahteva s kontaktnega obrazca (samo vam; stranka ne prejme avtomatskega e-pisma).`,
    ``,
    `Ime: ${name}`,
    `E-pošta (Reply-To): ${email}`,
    `Tip objekta: ${siteLabel}`,
    `Število kamer (ocena): ${cameraCount}`,
    `Rok: ${timeLabel}`,
    ``,
    `Sporočilo:`,
    message,
  ].join("\n");

  const html = `
    <p><strong>Nova zahteva</strong> s kontaktnega obrazca. Stranki se ne pošlje avtomatskega odgovora.</p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:6px 12px 6px 0;color:#666">Ime</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">E-pošta</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Tip objekta</td><td>${escapeHtml(siteLabel)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Število kamer</td><td>${cameraCount}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Rok</td><td>${escapeHtml(timeLabel)}</td></tr>
    </table>
    <p style="margin-top:16px"><strong>Sporočilo</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;background:#f5f5f5;padding:12px;border-radius:8px">${escapeHtml(message)}</pre>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("[contact] Resend error", res.status, errText);
    return NextResponse.json(
      { error: "Pošiljanje ni uspelo. Poskusite pozneje ali nas kontaktirajte po e-pošti." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
