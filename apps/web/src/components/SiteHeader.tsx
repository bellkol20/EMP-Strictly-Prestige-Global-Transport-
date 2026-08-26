import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6 md:px-8">
        <Link
          href="/"
          className="font-display text-[1.05rem] leading-tight tracking-[0.02em] text-[var(--ink)] md:text-lg"
        >
          <span className="block">{siteConfig.shortName}</span>
          <span className="mt-0.5 block text-[0.65rem] font-sans font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
            Global Transport
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm text-[var(--ink-soft)] md:flex"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/book"
          className="inline-flex items-center bg-[var(--brass)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)] transition hover:bg-[var(--brass-bright)]"
        >
          Book now
        </Link>
      </div>
    </header>
  );
}
