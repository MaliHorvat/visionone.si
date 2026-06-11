import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, detectLocaleFromHeader, isLocale } from "@/i18n/config";
import { isPortalSessionValid, PORTAL_SESSION_COOKIE } from "@/lib/portal-auth";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(PORTAL_SESSION_COOKIE)?.value;
  const isLoggedIn = isPortalSessionValid(sessionCookie);
  const isPortalLoginRoute = pathname === "/portal-login";
  const isPortalRoute = pathname === "/portal" || pathname.startsWith("/portal/");

  if (isPortalRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/portal-login", request.url));
  }

  if (isPortalLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  const segments = pathname.split("/").filter(Boolean);
  let locale = DEFAULT_LOCALE;

  if (segments.length > 0 && isLocale(segments[0])) {
    locale = segments[0];
  } else if (!isPortalRoute && !pathname.startsWith("/api") && !pathname.startsWith("/sign-")) {
    const cookieLocale = request.cookies.get("vo_locale")?.value;
    if (cookieLocale && isLocale(cookieLocale)) {
      locale = cookieLocale;
    } else if (pathname === "/" && !cookieLocale) {
      locale = detectLocaleFromHeader(request.headers.get("accept-language"));
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-vo-locale", locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (!isPortalRoute && !pathname.startsWith("/api")) {
    response.cookies.set("vo_locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
