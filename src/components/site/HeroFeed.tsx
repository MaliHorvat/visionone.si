"use client";

import { useEffect, useState } from "react";

function stamp(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

/** Hero kot slika kamere: ura teče v živo, REC utripa. */
export function HeroFeed({ alt, camera }: { alt: string; camera: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    setNow(stamp(new Date()));
    const id = window.setInterval(() => setNow(stamp(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <figure className="s-feed">
      <img src="/img/hero-kamere.webp" alt={alt} width={1400} height={934} fetchPriority="high" />
      <span className="s-corner a" aria-hidden="true" />
      <span className="s-corner b" aria-hidden="true" />
      <span className="s-corner c" aria-hidden="true" />
      <span className="s-corner d" aria-hidden="true" />
      <span className="s-osd tl" aria-hidden="true">
        {camera}
      </span>
      <span className="s-osd tr" aria-hidden="true">
        <span className="s-rec" />
        <span suppressHydrationWarning>{now ?? " "}</span>
      </span>
      <span className="s-osd bl" aria-hidden="true">
        4 MP · 25 fps
      </span>
      <span className="s-osd br" aria-hidden="true">
        VisionOne
      </span>
    </figure>
  );
}
