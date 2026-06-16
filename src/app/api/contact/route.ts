import { NextResponse } from "next/server";
import { sendContactMail } from "@/lib/contact-email";
import {
  CONTACT_FIELDS_BY_PRODUCT,
  PRODUCT_LABELS,
  type ContactProduct,
  parseContactProduct,
} from "@/lib/contact-form-products";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 10000;
const MAX_COMPANY = 200;

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
  product?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  siteType?: string;
  cameraCount?: number | string;
  employeeCount?: number | string;
  timeline?: string;
  message?: string;
  vo_hp?: string;
};

function trim(s: string, max: number) {
  const t = s.trim();
  return t.length > max ? t.slice(0, max) : t;
}

function parsePositiveInt(value: unknown, max: number): number | null {
  const n = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(n) || n < 1 || n > max) return null;
  return n;
}

function fieldAllowed(product: ContactProduct, field: string): boolean {
  return CONTACT_FIELDS_BY_PRODUCT[product].includes(field as never);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Neveljavna zahteva." }, { status: 400 });
  }

  if (body.vo_hp != null && String(body.vo_hp).trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const product = parseContactProduct(body.product) ?? "cctv";

  const name = trim(String(body.name ?? ""), MAX_NAME);
  const email = trim(String(body.email ?? ""), MAX_EMAIL);
  const phone = trim(String(body.phone ?? ""), 40);
  const company = trim(String(body.company ?? ""), MAX_COMPANY);
  const siteType = String(body.siteType ?? "");
  const timeline = String(body.timeline ?? "");
  const message = trim(String(body.message ?? ""), MAX_MESSAGE);
  const cameraCount = parsePositiveInt(body.cameraCount, 99999);
  const employeeCount = parsePositiveInt(body.employeeCount, 999999);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ime in veljavna e-pošta sta obvezna." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Sporočilo je obvezno." }, { status: 400 });
  }

  if (fieldAllowed(product, "siteType") && !SITE_TYPE_LABELS[siteType]) {
    return NextResponse.json({ error: "Izberite tip objekta." }, { status: 400 });
  }
  if (fieldAllowed(product, "timeline") && !TIMELINE_LABELS[timeline]) {
    return NextResponse.json({ error: "Izberite rok izvedbe." }, { status: 400 });
  }
  if (fieldAllowed(product, "cameraCount") && cameraCount == null) {
    return NextResponse.json({ error: "Neveljavno število kamer / naprav." }, { status: 400 });
  }
  if (fieldAllowed(product, "employeeCount") && employeeCount == null) {
    return NextResponse.json({ error: "Neveljavno število zaposlenih." }, { status: 400 });
  }
  if (fieldAllowed(product, "company") && company.length < 2) {
    return NextResponse.json({ error: "Ime podjetja je obvezno." }, { status: 400 });
  }

  const productLabel = PRODUCT_LABELS[product];
  const timeLabel = TIMELINE_LABELS[timeline];
  const siteLabel = SITE_TYPE_LABELS[siteType];

  const textLines = [
    `Nova zahteva s kontaktnega obrazca (samo vam; stranka ne prejme avtomatskega e-pisma).`,
    ``,
    `Produkt: ${productLabel}`,
    `Ime: ${name}`,
    `E-pošta (Reply-To): ${email}`,
    phone ? `Telefon: ${phone}` : null,
    fieldAllowed(product, "company") ? `Podjetje: ${company}` : null,
    fieldAllowed(product, "siteType") ? `Tip objekta: ${siteLabel}` : null,
    fieldAllowed(product, "cameraCount") ? `Število kamer / naprav (ocena): ${cameraCount}` : null,
    fieldAllowed(product, "employeeCount") ? `Število zaposlenih (ocena): ${employeeCount}` : null,
    fieldAllowed(product, "timeline") ? `Rok: ${timeLabel}` : null,
    ``,
    `Sporočilo:`,
    message,
  ].filter((line): line is string => line != null);

  const htmlRows = [
    `<tr><td style="padding:6px 12px 6px 0;color:#666">Produkt</td><td>${escapeHtml(productLabel)}</td></tr>`,
    `<tr><td style="padding:6px 12px 6px 0;color:#666">Ime</td><td>${escapeHtml(name)}</td></tr>`,
    `<tr><td style="padding:6px 12px 6px 0;color:#666">E-pošta</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>`,
    phone ? `<tr><td style="padding:6px 12px 6px 0;color:#666">Telefon</td><td>${escapeHtml(phone)}</td></tr>` : "",
    fieldAllowed(product, "company")
      ? `<tr><td style="padding:6px 12px 6px 0;color:#666">Podjetje</td><td>${escapeHtml(company)}</td></tr>`
      : "",
    fieldAllowed(product, "siteType")
      ? `<tr><td style="padding:6px 12px 6px 0;color:#666">Tip objekta</td><td>${escapeHtml(siteLabel)}</td></tr>`
      : "",
    fieldAllowed(product, "cameraCount")
      ? `<tr><td style="padding:6px 12px 6px 0;color:#666">Število kamer / naprav</td><td>${cameraCount}</td></tr>`
      : "",
    fieldAllowed(product, "employeeCount")
      ? `<tr><td style="padding:6px 12px 6px 0;color:#666">Število zaposlenih</td><td>${employeeCount}</td></tr>`
      : "",
    fieldAllowed(product, "timeline")
      ? `<tr><td style="padding:6px 12px 6px 0;color:#666">Rok</td><td>${escapeHtml(timeLabel)}</td></tr>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const subject = `[VisionOne] ${productLabel} — ${name}`;
  const text = textLines.join("\n");
  const html = `
    <p><strong>Nova zahteva</strong> s kontaktnega obrazca. Stranki se ne pošlje avtomatskega odgovora.</p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${htmlRows}</table>
    <p style="margin-top:16px"><strong>Sporočilo</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;background:#f5f5f5;padding:12px;border-radius:8px">${escapeHtml(message)}</pre>
  `;

  const result = await sendContactMail({
    replyTo: email,
    subject,
    text,
    html,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
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
