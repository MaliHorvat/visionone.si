type PortalLoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function PortalLoginPage({ searchParams }: PortalLoginPageProps) {
  const params = await searchParams;
  const showError = params?.error === "1";

  return (
    <div className="flex min-h-screen min-w-0 items-center justify-center bg-[var(--vo-bg)] px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-[var(--vo-border)] bg-[var(--vo-surface)] p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex justify-center">
          <img src="/visionone-logo.png" alt="VisionOne" className="h-20 w-20 rounded object-contain" />
        </div>
        <h1 className="text-xl font-semibold text-[var(--vo-fg)]">Prijava v portal</h1>
        <p className="mt-1 text-sm text-[var(--vo-muted)]">Dostop je trenutno omejen na interne uporabnike.</p>

        <form action="/api/portal-login" method="post" className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-[var(--vo-fg)]">
              Uporabniško ime
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="min-h-11 w-full rounded-lg border border-[var(--vo-border)] bg-transparent px-3 py-2 text-base outline-none ring-0 placeholder:text-[var(--vo-muted)] focus:border-[var(--vo-accent)] sm:min-h-0 sm:text-sm"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-[var(--vo-fg)]">
              Geslo
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="min-h-11 w-full rounded-lg border border-[var(--vo-border)] bg-transparent px-3 py-2 text-base outline-none ring-0 placeholder:text-[var(--vo-muted)] focus:border-[var(--vo-accent)] sm:min-h-0 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {showError ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Napačno uporabniško ime ali geslo.
            </p>
          ) : null}

          <button
            type="submit"
            className="min-h-11 w-full rounded-lg bg-[var(--vo-accent)] px-4 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 sm:min-h-0 sm:py-2 sm:text-sm"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
}
