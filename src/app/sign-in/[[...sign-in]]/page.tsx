import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";
import { isClerkPublishableConfigured } from "@/lib/clerk-config";

export default function SignInPage() {
  if (!isClerkPublishableConfigured()) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center"
        style={{ backgroundColor: "#f4f7fb", color: "#0c1222" }}
      >
        <div className="max-w-lg rounded-xl border border-slate-300 bg-white p-8 shadow-lg">
          <h1 className="text-xl font-semibold">Prijava trenutno ni na voljo</h1>
          <p className="mt-3 text-sm text-slate-600">
            Na Vercelu v projektu dodaj spremenljivko okolja{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{" "}
            (vrednost iz Clerk Dashboard) in{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">CLERK_SECRET_KEY</code>, nato ponovno objavi
            (Redeploy).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#f4f7fb", color: "#0c1222" }}
    >
      <Suspense
        fallback={
          <p className="text-sm text-slate-600" style={{ color: "#475569" }}>
            Nalaganje prijave…
          </p>
        }
      >
        <SignIn
          appearance={{
            baseTheme: "light",
            elements: {
              rootBox: "mx-auto",
              card: "bg-white border border-slate-200 shadow-lg",
            },
          }}
        />
      </Suspense>
    </div>
  );
}
