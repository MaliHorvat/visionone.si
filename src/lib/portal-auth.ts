/**
 * Prijava v portal — podpisan sejni piškotek (HMAC-SHA256, Web Crypto).
 * Deluje v middleware (edge) in v API poteh (Node).
 *
 * Okoljske spremenljivke (Vercel → Settings → Environment Variables):
 *   PORTAL_USERNAME        uporabniško ime (privzeto "admin")
 *   PORTAL_PASSWORD        geslo (privzeto "geslo123" — v produkciji OBVEZNO zamenjajte)
 *   PORTAL_SESSION_SECRET  naključen niz za podpis seje (npr. `openssl rand -hex 32`)
 */

export const PORTAL_SESSION_COOKIE = "vo_portal_session";
export const PORTAL_SESSION_TTL_SECONDS = 60 * 60 * 8;

const SESSION_VERSION = "v1";
const encoder = new TextEncoder();

export function getPortalCredentials() {
  return {
    username: process.env.PORTAL_USERNAME || "admin",
    password: process.env.PORTAL_PASSWORD || "geslo123",
  };
}

function sessionSecret() {
  // Brez lastne skrivnosti podpis veže na geslo — sprememba gesla razveljavi vse seje.
  return process.env.PORTAL_SESSION_SECRET || `vo-portal:${getPortalCredentials().password}`;
}

function toBase64Url(buf: ArrayBuffer) {
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(data)));
}

/** Primerjava v konstantnem času (prepreči časovne napade). */
export function safeEqual(a: string, b: string) {
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  let diff = ab.length ^ bb.length;
  const len = Math.max(ab.length, bb.length);
  for (let i = 0; i < len; i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

export function credentialsMatch(username: string, password: string) {
  const expected = getPortalCredentials();
  // Obe primerjavi vedno izvedemo, da čas ne razkrije, katero polje je napačno.
  const userOk = safeEqual(username.trim(), expected.username);
  const passOk = safeEqual(password, expected.password);
  return userOk && passOk;
}

export async function createPortalSession() {
  const exp = Math.floor(Date.now() / 1000) + PORTAL_SESSION_TTL_SECONDS;
  const payload = `${SESSION_VERSION}.${exp}`;
  return `${payload}.${await sign(payload)}`;
}

export async function isPortalSessionValid(cookieValue: string | undefined) {
  if (!cookieValue) return false;
  const parts = cookieValue.split(".");
  if (parts.length !== 3 || parts[0] !== SESSION_VERSION) return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  try {
    return safeEqual(await sign(`${SESSION_VERSION}.${parts[1]}`), parts[2]);
  } catch {
    return false;
  }
}

/** Dovoli samo notranje preusmeritve znotraj portala (prepreči „open redirect"). */
export function safePortalRedirect(next: string | null | undefined) {
  if (!next) return "/portal";
  const inPortal = next === "/portal" || next.startsWith("/portal/") || next.startsWith("/portal?");
  if (!inPortal || next.includes("\\") || next.includes("//")) return "/portal";
  return next;
}
