import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "VisionOne — Videonadzor, domofoni, omrežja",
    template: "%s · VisionOne",
  },
  description:
    "Montaža videonadzora, domofonov in IT/mrežnih rešitev. 24/7 proaktivna podpora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen min-w-0 overflow-x-clip antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
