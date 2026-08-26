import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-8">
      <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
        Contact
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        Reach {siteConfig.name} for reservations and corporate onboarding.
      </p>
      <p className="mt-8 text-[var(--ink)]">
        <a className="underline" href={`mailto:${siteConfig.supportEmail}`}>
          {siteConfig.supportEmail}
        </a>
      </p>
    </div>
  );
}
