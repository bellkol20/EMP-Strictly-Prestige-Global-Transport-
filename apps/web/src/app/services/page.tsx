import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
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
    <>
      <PageHero
        title="Services"
        description={`Service categories inspired by premium global chauffeur operators, presented under the ${siteConfig.name} standard.`}
      />
      <div className="mx-auto max-w-4xl px-6 pb-24 md:px-8">
        <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {items.map((item) => (
            <li key={item} className="py-5 font-display text-2xl text-[var(--ink)]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
