import Link from "next/link";
import { CookieSettingsButton } from "@/components/public/CookieSettingsButton";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--vo-border)] bg-[var(--vo-surface)] py-8 pb-10 sm:py-10">
      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-8 px-4 md:flex-row md:justify-between md:px-6">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold text-[var(--vo-fg)]">
            <img src="/visionone-mark.png" alt="VisionOne znak" className="h-8 w-8 rounded object-contain" />
            <img src="/visionone-wordmark.png" alt="VisionOne napis" className="h-6 w-auto object-contain" />
          </div>
          <p className="mt-2 max-w-sm text-sm text-[var(--vo-muted)]">
            Videonadzor, domofoni, omrežja in 24/7 proaktivna podpora za podjetja in stanovanjske
            sklope.
          </p>
        </div>
        <div className="text-sm text-[var(--vo-muted)]">
          <div className="font-medium text-[var(--vo-fg)]">Kontakt</div>
          <a
            className="mt-2 block break-all hover:text-[var(--vo-accent)] sm:break-normal"
            href="mailto:info@visionone.si"
          >
            info@visionone.si
          </a>
          <Link className="mt-3 inline-block text-[var(--vo-accent)] hover:underline" href="/kontakt">
            Kontaktni obrazec
          </Link>
        </div>
        <div className="flex flex-col gap-3 text-xs text-[var(--vo-muted)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
            <Link className="hover:text-[var(--vo-accent)]" href="/zasebnost">
              Zasebnost
            </Link>
            <Link className="hover:text-[var(--vo-accent)]" href="/piskotki">
              Piškotki
            </Link>
            <CookieSettingsButton className="inline-flex min-h-11 items-center sm:min-h-0" />
          </div>
          <div>© {new Date().getFullYear()} VisionOne</div>
        </div>
      </div>
    </footer>
  );
}
