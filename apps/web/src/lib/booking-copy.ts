import { COMPANY_NAME } from "@/lib/site";

/** Client-visible confirmation panel copy */
export function bookingConfirmationCopy(code: string) {
  return {
    headline: `You're confirmed with ${COMPANY_NAME}`,
    body: `Confirmation ${code}. A receipt from ${COMPANY_NAME} is on its way to your email.`,
  };
}
