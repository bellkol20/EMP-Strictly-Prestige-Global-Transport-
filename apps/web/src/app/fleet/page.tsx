import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fleet",
  description: `Executive fleet from ${siteConfig.name}.`,
};

const fleet = [
  { name: "Executive sedan", capacity: "1–3 passengers" },
  { name: "Luxury SUV", capacity: "1–5 passengers" },
  { name: "Sprinter van", capacity: "Up to 14 passengers" },
];

export default function FleetPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-8">
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
        Fleet
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        Vehicle classes for {siteConfig.name}. Detailed model pages and
        imagery come next.
      </p>
      <div className="mt-12 grid gap-6">
        {fleet.map((vehicle) => (
          <article
            key={vehicle.name}
            className="border border-[var(--line)] bg-[var(--surface)] px-6 py-8"
          >
            <h2 className="font-display text-2xl text-[var(--ink)]">
              {vehicle.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{vehicle.capacity}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
