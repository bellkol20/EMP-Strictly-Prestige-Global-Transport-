import { COMPANY_NAME } from "@/lib/site";

export type BookingStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export function bookingStatusLabel(status: BookingStatus): string {
  switch (status) {
    case "PENDING_APPROVAL":
      return "Pending review";
    case "PENDING_PAYMENT":
      return "Pending payment";
    case "CONFIRMED":
      return "Confirmed";
    case "IN_PROGRESS":
      return "In progress";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Declined";
    default:
      return status;
  }
}

/** Client-visible confirmation panel copy */
export function bookingConfirmationCopy(
  code: string,
  status: BookingStatus = "PENDING_APPROVAL",
) {
  if (status === "CONFIRMED") {
    return {
      eyebrow: "Confirmed",
      headline: `You're confirmed with ${COMPANY_NAME}`,
      body: `Confirmation ${code}. A receipt from ${COMPANY_NAME} is on its way to your email.`,
    };
  }

  if (status === "CANCELLED") {
    return {
      eyebrow: "Not available",
      headline: "This reservation could not be confirmed",
      body: `Reference ${code}. Please contact ${COMPANY_NAME} to choose another time.`,
    };
  }

  return {
    eyebrow: "Request received",
    headline: "We received your reservation request",
    body: `Reference ${code}. ${COMPANY_NAME} will review availability and email you once the trip is confirmed or if we need another time.`,
  };
}
