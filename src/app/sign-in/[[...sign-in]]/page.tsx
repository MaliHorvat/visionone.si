import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--vo-bg)] px-4 py-16">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[var(--vo-surface)] border border-[var(--vo-border)] shadow-[var(--vo-card-shadow)]",
          },
        }}
      />
    </div>
  );
}
