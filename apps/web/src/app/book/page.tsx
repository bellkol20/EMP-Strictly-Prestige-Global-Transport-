import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Reserve chauffeur service with ${siteConfig.name}.`,
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brass)]">
        Online reservation
      </p>
      <h1 className="mt-4 font-display text-4xl text-[var(--ink)] md:text-5xl">
        Book with {siteConfig.name}
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        Booking flow, Square payment capture, and confirmation emails land
        next. For now, this page establishes branded reservation entry.
      </p>
      <form className="mt-10 space-y-5" action="#" method="post">
        <label className="block text-sm">
          <span className="text-[var(--ink-soft)]">Full name</span>
          <input
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
            name="fullName"
            autoComplete="name"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--ink-soft)]">Email</span>
          <input
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--ink-soft)]">Pickup address</span>
          <input
            className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
            name="pickup"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-[var(--brass)] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)]"
        >
          Request confirmation preview
        </button>
      </form>
      <p className="mt-8 text-sm text-[var(--muted)]">
        Prefer a human dispatcher?{" "}
        <Link className="text-[var(--ink)] underline" href="/contact">
          Contact {siteConfig.shortName}
        </Link>
        .
      </p>
    </div>
  );
}
