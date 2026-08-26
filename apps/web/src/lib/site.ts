import {
  COMPANY_NAME,
  COMPANY_NAME_SHORT,
  BRAND,
} from "@espgt/brand";

export { COMPANY_NAME, COMPANY_NAME_SHORT, BRAND };

export const siteConfig = {
  name: COMPANY_NAME,
  shortName: COMPANY_NAME_SHORT,
  tagline: BRAND.tagline,
  description: BRAND.defaultMetaDescription,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "bookings@example.com",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  nav: [
    { href: "/services", label: "Services" },
    { href: "/fleet", label: "Fleet" },
    { href: "/book", label: "Book" },
    { href: "/corporate", label: "Corporate" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
