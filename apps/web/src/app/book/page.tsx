import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Reserve chauffeur service with ${siteConfig.name}.`,
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Online reservation"
        title={`Book with ${siteConfig.name}`}
        description="Submit your trip details below. You'll receive a confirmation code instantly while we finalize Square payments and email delivery."
      />
      <div className="mx-auto max-w-3xl px-6 pb-24 md:px-8">
        <BookingForm />
        <p className="mt-8 text-sm text-[var(--muted)]">
          Prefer a human dispatcher?{" "}
          <Link className="text-[var(--ink)] underline" href="/contact">
            Contact {siteConfig.shortName}
          </Link>
          .
        </p>
      </div>
    </>
  );
}
