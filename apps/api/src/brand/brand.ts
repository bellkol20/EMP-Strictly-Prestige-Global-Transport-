/** Canonical company name for EMP Strictly Prestige Global Transport (API). */
export const COMPANY_NAME = 'EMP Strictly Prestige Global Transport' as const;
export const COMPANY_NAME_SHORT = 'EMP Strictly Prestige' as const;
export const COMPANY_LEGAL_NAME = 'EMP Strictly Prestige Global Transport' as const;

export function getCompanyName(): string {
  return process.env.COMPANY_NAME?.trim() || COMPANY_NAME;
}
