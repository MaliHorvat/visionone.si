import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--vo-bg)] px-4 py-16">
      <SignUp
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
