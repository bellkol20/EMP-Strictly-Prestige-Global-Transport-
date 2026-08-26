import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-sm">
          <p className="font-display text-xl text-[var(--ink)]">
            {siteConfig.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {siteConfig.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--ink-soft)]">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p>
            <a
              className="hover:text-[var(--ink)]"
              href={`mailto:${siteConfig.supportEmail}`}
            >
              {siteConfig.supportEmail}
            </a>
          </p>
          {siteConfig.supportPhone ? (
            <p className="mt-2">
              <a
                className="hover:text-[var(--ink)]"
                href={`tel:${siteConfig.supportPhone.replace(/\s+/g, "")}`}
              >
                {siteConfig.supportPhone}
              </a>
            </p>
          ) : null}
        </div>
      </div>
      <div className="border-t border-[var(--line)] px-6 py-4 text-center text-xs text-[var(--muted)] md:px-8">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
