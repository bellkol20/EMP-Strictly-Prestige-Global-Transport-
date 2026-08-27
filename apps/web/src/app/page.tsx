import Link from "next/link";
import { siteConfig } from "@/lib/site";

const services = [
  {
    title: "Airport transfers",
    copy: "Flight-tracked meet and greet with flat-rate pricing locked at booking.",
  },
  {
    title: "Corporate travel",
    copy: "Executive roadshows, board circuits, and account-ready invoicing.",
  },
  {
    title: "Private aviation",
    copy: "FBO curb-to-cabin handoffs timed to your manifest.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-atmosphere relative min-h-[100svh] overflow-hidden text-[var(--mist)]">
        <div className="absolute inset-0 animate-veil bg-[radial-gradient(circle_at_80%_20%,rgba(243,238,230,0.06),transparent_35%)]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-24">
          <p className="animate-rise font-display text-4xl leading-[0.95] tracking-[-0.02em] text-[var(--paper)] sm:text-5xl md:max-w-3xl md:text-7xl">
            {siteConfig.name}
          </p>
          <p className="animate-rise-delay mt-6 max-w-xl text-base leading-relaxed text-[var(--mist)] md:text-lg">
            {siteConfig.tagline}
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="bg-[var(--brass)] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-[var(--brass-bright)]"
            >
              Reserve a chauffeur
            </Link>
            <Link
              href="/services"
              className="border border-[rgba(243,238,230,0.35)] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--paper)] transition hover:border-[var(--paper)]"
            >
              View services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brass)]">
          Signature service
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-[var(--ink)] md:text-5xl">
          Chauffeur transport built for executives who refuse improvisation.
        </h2>
        <p className="mt-5 max-w-2xl text-[var(--muted)] md:text-lg">
          {siteConfig.name} pairs disciplined dispatch with a curated fleet —
          airport, city, and cross-border itineraries handled under one
          standard.
        </p>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="border-t border-[var(--line)] pt-6">
              <h3 className="font-display text-2xl text-[var(--ink)]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {service.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--night)] px-6 py-20 text-[var(--paper)] md:px-8 md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl md:text-5xl">
              Ready when your itinerary is.
            </h2>
            <p className="mt-4 text-[var(--mist)]">
              Book online with Square-secured payment methods, or request a
              quote for multi-city programs.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex w-fit bg-[var(--brass)] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-[var(--brass-bright)]"
          >
            Start booking
          </Link>
        </div>
      </section>
    </>
  );
}
