import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
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
        Submit your trip details below. You&apos;ll receive a confirmation code
        instantly while we finalize Square payments and email delivery.
      </p>
      <BookingForm />
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
