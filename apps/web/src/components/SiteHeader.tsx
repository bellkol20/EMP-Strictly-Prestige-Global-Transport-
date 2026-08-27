"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const lightHeaderPrefixes = [
  "/",
  "/services",
  "/fleet",
  "/contact",
  "/corporate",
  "/book",
];

function usesLightHeader(pathname: string) {
  if (pathname.startsWith("/admin")) {
    return false;
  }

  return lightHeaderPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const light = usesLightHeader(pathname);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div
        className={
          light
            ? "border-b border-white/10 bg-[rgba(12,18,24,0.45)] backdrop-blur-sm"
            : ""
        }
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6 md:px-8">
          <Link
            href="/"
            className={`font-display text-[1.05rem] leading-tight tracking-[0.02em] md:text-lg ${
              light ? "text-[var(--paper)]" : "text-[var(--ink)]"
            }`}
          >
            <span className="block">{siteConfig.shortName}</span>
            <span
              className={`mt-0.5 block text-[0.65rem] font-sans font-medium uppercase tracking-[0.22em] ${
                light ? "text-[var(--mist)]" : "text-[var(--muted)]"
              }`}
            >
              Global Transport
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className={`hidden items-center gap-7 text-sm md:flex ${
              light ? "text-[var(--mist)]" : "text-[var(--ink-soft)]"
            }`}
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  light ? "hover:text-[var(--paper)]" : "hover:text-[var(--ink)]"
                }`}
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
      </div>
    </header>
  );
}
