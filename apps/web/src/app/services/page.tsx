import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Chauffeur services from ${siteConfig.name}.`,
};

const items = [
  "Airport chauffeur service",
  "Corporate chauffeur service",
  "Hourly as-directed",
  "Wedding & events",
  "Group & coach",
  "Long-distance / city-to-city",
  "Private aviation / FBO",
  "Financial roadshow logistics",
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-8">
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
        Services
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        Service categories inspired by premium global chauffeur operators,
        presented under the {siteConfig.name} standard.
      </p>
      <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {items.map((item) => (
          <li key={item} className="py-5 font-display text-2xl text-[var(--ink)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
