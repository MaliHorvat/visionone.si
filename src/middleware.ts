import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, detectLocaleFromHeader, isLocale, type Locale } from "@/i18n/config";

/** Jezik: predpona v URL > piškotek vo_locale > brskalnik (samo na začetni strani). */
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  const isApi = pathname.startsWith("/api");

  let locale: Locale = DEFAULT_LOCALE;
  if (isLocale(first)) {
    locale = first;
  } else if (!isApi) {
    // URL brez predpone je slovenski. Kdor je izbral drug jezik (ali ga brskalnik želi na začetni strani),
    // ga preusmerimo na isto stran z jezikovno predpono, da se vsebina vedno ujema z naslovom.
    const cookieLocale = request.cookies.get("vo_locale")?.value;
    const preferred: Locale =
      cookieLocale && isLocale(cookieLocale)
        ? cookieLocale
        : pathname === "/"
          ? detectLocaleFromHeader(request.headers.get("accept-language"))
          : DEFAULT_LOCALE;
    if (preferred !== DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? `/${preferred}` : `/${preferred}${pathname}`;
      return NextResponse.redirect(url);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-vo-locale", locale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (!isApi) response.cookies.set("vo_locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return response;
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|exe)).*)"],
};
