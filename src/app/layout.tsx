import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { LOCALE_META } from "@/i18n/config";
import { toLocale } from "@/site";
import "./globals.css";
import "./site.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#17212b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://visionone.si"),
  title: {
    default: "VisionOne – videonadzor, alarmi, domofoni in omrežja",
    template: "%s · VisionOne",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = toLocale((await headers()).get("x-vo-locale"));
  return (
    <html lang={LOCALE_META[locale].hrefLang.slice(0, 2)}>
      <head>
        <link rel="preload" href="/fonts/archivo-var.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
