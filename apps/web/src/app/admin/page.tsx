import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
  description: `${siteConfig.name} admin dashboard (scaffold).`,
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brass)]">
        Internal
      </p>
      <h1 className="mt-4 font-display text-4xl text-[var(--ink)]">
        {siteConfig.name} Admin
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        Dashboard scaffold. Bookings, customers, fleet, and Square payment
        status will appear here.
      </p>
    </div>
  );
}
