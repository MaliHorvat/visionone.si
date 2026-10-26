import type { NextConfig } from "next";

const PORTAL = "https://portal.visionone.si";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // stari demo portal na tej domeni je zamenjal VisionOne portal na lastni poddomeni
      { source: "/portal", destination: PORTAL, permanent: true },
      { source: "/portal/:path*", destination: PORTAL, permanent: true },
      { source: "/portal-login", destination: PORTAL, permanent: true },
      { source: "/vstop", destination: PORTAL, permanent: true },
      { source: "/vstop/:path*", destination: PORTAL, permanent: true },
      { source: "/sign-in/:path*", destination: PORTAL, permanent: true },
      { source: "/sign-up/:path*", destination: PORTAL, permanent: true },
      // stari naslovi javne strani
      { source: "/vzdrzevalni-paketi", destination: "/storitve#servis", permanent: true },
      { source: "/:lang(en|de|it|hr)/vzdrzevalni-paketi", destination: "/:lang/storitve#servis", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/:dir(img|fonts|brand)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
