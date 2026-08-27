import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        description={`Reach ${siteConfig.name} for reservations and corporate onboarding.`}
      />
      <div className="mx-auto max-w-3xl px-6 pb-24 md:px-8">
        <p className="text-[var(--ink)]">
          <a className="underline" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
        </p>
      </div>
    </>
  );
}
