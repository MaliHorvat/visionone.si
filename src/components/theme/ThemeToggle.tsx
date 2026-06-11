"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolved, toggle } = useTheme();
  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-[var(--vo-border)] bg-[var(--vo-surface)]/90 text-[var(--vo-muted)] backdrop-blur-sm transition hover:border-[var(--vo-accent)]/40 hover:text-[var(--vo-accent)] ${className}`}
      aria-label={isDark ? "Preklopi na svetlo temo" : "Preklopi na temno temo"}
      title={isDark ? "Svetla tema" : "Temna tema"}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
}
