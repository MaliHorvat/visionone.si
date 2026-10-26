import { NextResponse } from "next/server";
import {
  PORTAL_SESSION_COOKIE,
  PORTAL_SESSION_TTL_SECONDS,
  createPortalSession,
  credentialsMatch,
  safePortalRedirect,
} from "@/lib/portal-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = safePortalRedirect(String(formData.get("next") ?? ""));

  if (!credentialsMatch(username, password)) {
    // Kratek zamik upočasni ugibanje gesel.
    await new Promise((r) => setTimeout(r, 600));
    const url = new URL("/portal-login", request.url);
    url.searchParams.set("error", "1");
    if (next !== "/portal") url.searchParams.set("next", next);
    return NextResponse.redirect(url, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(next, request.url), { status: 303 });
  response.cookies.set(PORTAL_SESSION_COOKIE, await createPortalSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PORTAL_SESSION_TTL_SECONDS,
  });
  return response;
}
