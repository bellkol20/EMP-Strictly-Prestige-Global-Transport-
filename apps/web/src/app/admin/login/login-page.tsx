"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Login failed.");
      }

      const next = searchParams.get("next") ?? "/admin";
      router.push(next);
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Login failed.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brass)]">
        Internal
      </p>
      <h1 className="mt-4 font-display text-3xl text-[var(--ink)]">
        {siteConfig.shortName} Admin
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Enter your admin password to view bookings.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm">
          <span className="text-[var(--ink-soft)]">Password</span>
          <input
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="bg-[var(--brass)] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)] disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
