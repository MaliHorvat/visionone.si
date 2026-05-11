import nodemailer from "nodemailer";

/** Če CONTACT_FORM_* ni v okolju (npr. Vercel), SMTP še vedno pošlje sem (prepiše z .env). */
const DEFAULT_CONTACT_FORM_TO = "info@visionone.si";
const DEFAULT_CONTACT_FORM_FROM = "VisionOne <info@visionone.si>";

export type ContactMailContent = {
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

function missingForResend(): string[] {
  const m: string[] = [];
  if (!process.env.RESEND_API_KEY?.trim()) m.push("RESEND_API_KEY");
  return m;
}

function missingForSmtp(): string[] {
  const m: string[] = [];
  if (!process.env.SMTP_HOST?.trim()) m.push("SMTP_HOST");
  if (!process.env.SMTP_USER?.trim()) m.push("SMTP_USER");
  const pass = process.env.SMTP_PASSWORD?.trim() || process.env.SMTP_PASS?.trim();
  if (!pass) m.push("SMTP_PASSWORD");
  return m;
}

type MailCfg =
  | { mode: "resend"; to: string; from: string; apiKey: string }
  | { mode: "smtp"; to: string; from: string; transport: nodemailer.Transporter }
  | { mode: "none"; hint: string };

function resolveMailer(): MailCfg {
  const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
  const hasSmtp = Boolean(process.env.SMTP_HOST?.trim());

  if (hasResend) {
    const miss = missingForResend();
    if (miss.length) {
      return { mode: "none", hint: `Za Resend manjkajo: ${miss.join(", ")}.` };
    }
    return {
      mode: "resend",
      to: process.env.CONTACT_FORM_TO?.trim() || DEFAULT_CONTACT_FORM_TO,
      from: process.env.CONTACT_FORM_FROM?.trim() || DEFAULT_CONTACT_FORM_FROM,
      apiKey: process.env.RESEND_API_KEY!.trim(),
    };
  }

  if (hasSmtp) {
    const miss = missingForSmtp();
    if (miss.length) {
      return { mode: "none", hint: `Za SMTP manjkajo: ${miss.join(", ")}.` };
    }
    const pass = process.env.SMTP_PASSWORD?.trim() || process.env.SMTP_PASS?.trim() || "";
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST!.trim(),
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER!.trim(),
        pass,
      },
    });
    return {
      mode: "smtp",
      to: process.env.CONTACT_FORM_TO?.trim() || DEFAULT_CONTACT_FORM_TO,
      from: process.env.CONTACT_FORM_FROM?.trim() || DEFAULT_CONTACT_FORM_FROM,
      transport,
    };
  }

  return {
    mode: "none",
    hint:
      "Pošta ni nastavljena. Dodajte bodisi RESEND_API_KEY bodisi SMTP (SMTP_HOST, SMTP_USER, SMTP_PASSWORD). Prejemnik in pošiljatelj sta privzeto info@visionone.si — zamenjajta z CONTACT_FORM_TO in CONTACT_FORM_FROM. Glej .env.example.",
  };
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
          ? "Resend je zavrnil zahtevo — preverite CONTACT_FORM_FROM (preverjena domena v nadzorni plošči Resend) in RESEND_API_KEY."
          : "Pošiljanje prek Resend ni uspelo. Poskusite znova ali uporabite SMTP nastavitve.";
      return { ok: false, status: 502, message: hint };
    }
    return { ok: true };
  }

  try {
    await cfg.transport.sendMail({
      from: cfg.from,
      to: cfg.to,
      replyTo: content.replyTo,
      subject: content.subject,
      text: content.text,
      html: content.html,
    });
    return { ok: true };
  } catch (e) {
    console.error("[contact] SMTP error", e);
    return {
      ok: false,
      status: 502,
      message:
        "Pošiljanje prek SMTP ni uspelo. Preverite SMTP_HOST, vrata, uporabnika in geslo (npr. geslo aplikacije pri Microsoft 365).",
    };
  }
}
