import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate",
  description: `Corporate chauffeur accounts with ${siteConfig.name}.`,
};

export default function CorporatePage() {
  return (
    <>
      <PageHero
        title="Corporate accounts"
        description={`Consolidated billing, travel-manager access, and duty-of-care reporting for ${siteConfig.name} corporate programs — coming soon.`}
      />
    </>
  );
}
