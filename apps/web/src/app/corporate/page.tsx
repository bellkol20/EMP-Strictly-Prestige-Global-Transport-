import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate",
  description: `Corporate chauffeur accounts with ${siteConfig.name}.`,
};

export default function CorporatePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-8">
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
        Corporate accounts
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        Consolidated billing, travel-manager access, and duty-of-care reporting
        for {siteConfig.name} corporate programs — coming soon.
      </p>
    </div>
  );
}
