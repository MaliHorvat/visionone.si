import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--vo-border)] bg-[var(--vo-surface)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:justify-between md:px-6">
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
          <a className="mt-2 block hover:text-[var(--vo-accent)]" href="mailto:info@visionone.si">
            info@visionone.si
          </a>
          <a className="block hover:text-[var(--vo-accent)]" href="tel:+38631234567">
            +386 31 234 567
          </a>
          <Link className="mt-3 inline-block text-[var(--vo-accent)] hover:underline" href="/kontakt">
            Kontaktni obrazec
          </Link>
        </div>
        <div className="text-xs text-[var(--vo-muted)]">© {new Date().getFullYear()} VisionOne</div>
      </div>
    </footer>
  );
}
