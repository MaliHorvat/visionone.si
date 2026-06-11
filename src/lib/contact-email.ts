import dns from "node:dns";
import nodemailer from "nodemailer";

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

const DEFAULT_CONTACT_FORM_TO = "info@visionone.si";
const DEFAULT_CONTACT_FORM_FROM = "VisionOne <info@visionone.si>";

export type ContactMailContent = {
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

function envFirst(...keys: string[]): string {
  for (const key of keys) {
    const v = process.env[key]?.trim();
    if (v) return v;
  }
  return "";
}

function missingForResend(): string[] {
  const m: string[] = [];
  if (!envFirst("RESEND_API_KEY")) m.push("RESEND_API_KEY");
  return m;
}

function missingForSmtp(): string[] {
  const m: string[] = [];
  if (!envFirst("SMTP_HOST", "PORTAL_SMTP_HOST")) m.push("SMTP_HOST");
  if (!envFirst("SMTP_USER", "PORTAL_SMTP_USER")) m.push("SMTP_USER");
  if (!envFirst("SMTP_PASSWORD", "SMTP_PASS", "PORTAL_SMTP_PASS")) m.push("SMTP_PASSWORD");
  return m;
}

type MailCfg =
  | { mode: "resend"; to: string; from: string; apiKey: string }
  | {
      mode: "smtp";
      to: string;
      from: string;
      host: string;
      port: number;
      secure: boolean;
      user: string;
      pass: string;
    }
  | { mode: "none"; hint: string };

function resolveMailer(): MailCfg {
  const hasResend = Boolean(envFirst("RESEND_API_KEY"));
  const hasSmtp = Boolean(envFirst("SMTP_HOST", "PORTAL_SMTP_HOST"));

  if (hasResend) {
    const miss = missingForResend();
    if (miss.length) {
      return { mode: "none", hint: `Za Resend manjkajo: ${miss.join(", ")}.` };
    }
    return {
      mode: "resend",
      to: envFirst("CONTACT_FORM_TO") || DEFAULT_CONTACT_FORM_TO,
      // Brez verificirane domene Resend dovoli pošiljanje le prek onboarding@resend.dev.
      // Ko verificirate domeno, nastavite CONTACT_FORM_FROM=VisionOne <info@visionone.si>.
      from: envFirst("CONTACT_FORM_FROM") || "VisionOne <onboarding@resend.dev>",
      apiKey: envFirst("RESEND_API_KEY"),
    };
  }

  if (hasSmtp) {
    const miss = missingForSmtp();
    if (miss.length) {
      return { mode: "none", hint: `Za SMTP manjkajo: ${miss.join(", ")}.` };
    }
    const port = Number(envFirst("SMTP_PORT", "PORTAL_SMTP_PORT") || 587);
    const secureExplicit = envFirst("SMTP_SECURE", "PORTAL_SMTP_SECURE");
    const secure = secureExplicit === "true" || (secureExplicit !== "false" && port === 465);
    return {
      mode: "smtp",
      to: envFirst("CONTACT_FORM_TO") || DEFAULT_CONTACT_FORM_TO,
      from: envFirst("CONTACT_FORM_FROM", "PORTAL_SMTP_FROM") || DEFAULT_CONTACT_FORM_FROM,
      host: envFirst("SMTP_HOST", "PORTAL_SMTP_HOST"),
      port,
      secure,
      user: envFirst("SMTP_USER", "PORTAL_SMTP_USER"),
      pass: envFirst("SMTP_PASSWORD", "SMTP_PASS", "PORTAL_SMTP_PASS"),
    };
  }

  return {
    mode: "none",
    hint:
      "Pošta ni nastavljena. Dodajte RESEND_API_KEY ali SMTP (SMTP_HOST, SMTP_USER, SMTP_PASSWORD). Glej .env.example.",
  };
}

export function getContactMailStatus(): {
  configured: boolean;
  mode: "resend" | "smtp" | "none";
  hint: string;
} {
  const cfg = resolveMailer();
  if (cfg.mode === "none") {
    return { configured: false, mode: "none", hint: cfg.hint };
  }
  return {
    configured: true,
    mode: cfg.mode,
    hint: cfg.mode === "resend" ? "Resend" : `SMTP ${cfg.host}`,
  };
}

/** DNS na Vercelu zna obviseti — vsako poizvedbo omejimo s časovnim limitom. */
function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

async function resolveIpv4Host(hostname: string): Promise<string> {
  try {
    const result = await withTimeout(
      dns.promises.lookup(hostname, { family: 4 }),
      4_000,
      { address: hostname, family: 4 },
    );
    return result.address;
  } catch {
    return hostname;
  }
}

/** mail.domena.si pogosto kaže na Cloudflare/CDN — SMTP tam ne deluje. */
function looksLikeCdnProxy(ip: string): boolean {
  return (
    ip.startsWith("188.114.") ||
    ip.startsWith("104.16.") ||
    ip.startsWith("172.64.") ||
    ip.startsWith("173.245.")
  );
}

async function tlsServernameForIp(ip: string, fallback: string): Promise<string> {
  try {
    const ptr = await withTimeout(dns.promises.reverse(ip), 3_000, [] as string[]);
    const host = ptr[0]?.replace(/\.$/, "");
    if (host) return host;
  } catch {
    // PTR ni na voljo — uporabi fallback
  }
  return fallback;
}

async function resolveSmtpEndpoint(
  configHost: string,
  smtpUser: string,
): Promise<{ connectHost: string; tlsServername: string }> {
  const directIp = await resolveIpv4Host(configHost);
  if (!looksLikeCdnProxy(directIp)) {
    return { connectHost: directIp, tlsServername: configHost };
  }

  const domain = smtpUser.includes("@") ? smtpUser.split("@")[1] : "";
  if (!domain) {
    return { connectHost: directIp, tlsServername: configHost };
  }

  try {
    const mx = await withTimeout(dns.promises.resolveMx(domain), 4_000, []);
    if (!mx.length) {
      return { connectHost: directIp, tlsServername: configHost };
    }
    mx.sort((a, b) => a.priority - b.priority);
    const mxHost = mx[0]?.exchange?.replace(/\.$/, "");
    if (!mxHost) {
      return { connectHost: directIp, tlsServername: configHost };
    }
    const mxIp = await resolveIpv4Host(mxHost);
    const tlsServername = await tlsServernameForIp(mxIp, mxHost);
    console.warn(
      `[contact] ${configHost} (${directIp}) je za CDN — SMTP prek ${tlsServername} (${mxIp})`,
    );
    return { connectHost: mxIp, tlsServername };
  } catch {
    return { connectHost: directIp, tlsServername: configHost };
  }
}

async function createSmtpTransport(cfg: Extract<MailCfg, { mode: "smtp" }>) {
  const { connectHost, tlsServername } = await resolveSmtpEndpoint(cfg.host, cfg.user);
  return nodemailer.createTransport({
    host: connectHost,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 12_000,
    tls: {
      minVersion: "TLSv1.2",
      servername: tlsServername,
    },
  });
}

function smtpErrorMessage(e: unknown): string {
  const err = e as { code?: string; errno?: number };
  if (err.code === "ESOCKET" || err.errno === -4062) {
    return "Povezava do poštnega strežnika ni uspela. Preverite SMTP_HOST in vrata (465 SSL ali 587 STARTTLS).";
  }
  if (err.code === "EAUTH") {
    return "SMTP avtentikacija ni uspela. Preverite SMTP_USER in SMTP_PASSWORD.";
  }
  if (err.code === "ETIMEDOUT" || err.code === "ECONNREFUSED") {
    return "Poštni strežnik ni dosegljiv. Preverite SMTP_HOST, vrata in požarni zid.";
  }
  return "Pošiljanje prek SMTP ni uspelo. Preverite nastavitve v .env ali na Vercelu.";
}

export async function sendContactMail(
  content: ContactMailContent,
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const cfg = resolveMailer();
  if (cfg.mode === "none") {
    return { ok: false, status: 503, message: cfg.hint };
  }

  if (cfg.mode === "resend") {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: cfg.from,
        to: [cfg.to],
        reply_to: [content.replyTo],
        subject: content.subject,
        text: content.text,
        html: content.html,
      }),
    });

    if (!res.ok) {
      let body = "";
      try {
        body = JSON.stringify(await res.json());
      } catch {
        body = await res.text().catch(() => "");
      }
      console.error("[contact] Resend error", res.status, body);
      const hint =
        res.status === 422 || res.status === 403
          ? "Resend je zavrnil zahtevo. Brez verificirane domene lahko pošiljate le na e-naslov, s katerim ste registrirani na Resend — nastavite CONTACT_FORM_TO na ta naslov (ali verificirajte domeno in nastavite CONTACT_FORM_FROM)."
          : "Pošiljanje prek Resend ni uspelo.";
      return { ok: false, status: 502, message: hint };
    }
    return { ok: true };
  }

  try {
    const transport = await createSmtpTransport(cfg);
    // Skupni časovni limit, da funkcija ne preseže Vercel limita (in vrne čisto napako, ne 502).
    const sendPromise = transport.sendMail({
      from: cfg.from,
      to: cfg.to,
      replyTo: content.replyTo,
      subject: content.subject,
      text: content.text,
      html: content.html,
    });
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("SMTP_OVERALL_TIMEOUT")), 8_000),
    );
    await Promise.race([sendPromise, timeout]);
    return { ok: true };
  } catch (e) {
    console.error("[contact] SMTP error", e);
    const err = e as { message?: string };
    if (err.message === "SMTP_OVERALL_TIMEOUT") {
      return {
        ok: false,
        status: 504,
        message:
          "Poštni strežnik se ni odzval pravočasno. Pišite nam neposredno na info@visionone.si.",
      };
    }
    return {
      ok: false,
      status: 502,
      message: smtpErrorMessage(e),
    };
  }
}
