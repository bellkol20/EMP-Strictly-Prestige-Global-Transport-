/**
 * Canonical brand identity for EMP Strictly Prestige Global Transport.
 * Import from @espgt/brand anywhere display names, SEO, or emails are needed.
 */
export const COMPANY_NAME = "EMP Strictly Prestige Global Transport" as const;

/** Short label for tight UI — still clearly this brand */
export const COMPANY_NAME_SHORT = "EMP Strictly Prestige" as const;

export const COMPANY_LEGAL_NAME = "EMP Strictly Prestige Global Transport" as const;

export const BRAND = {
  companyName: COMPANY_NAME,
  companyNameShort: COMPANY_NAME_SHORT,
  legalName: COMPANY_LEGAL_NAME,
  tagline: "Global luxury chauffeur transport, delivered with precision.",
  defaultMetaDescription:
    "EMP Strictly Prestige Global Transport provides professional chauffeur service for airport transfers, corporate travel, events, and private aviation worldwide.",
} as const;

export type Brand = typeof BRAND;
