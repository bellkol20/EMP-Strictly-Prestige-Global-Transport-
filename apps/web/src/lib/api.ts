import { siteConfig } from "@/lib/site";

export function getApiBaseUrl(): string {
  return siteConfig.apiUrl.replace(/\/$/, "");
}

export type CreateBookingPayload = {
  fullName: string;
  email: string;
  phone?: string;
  serviceType: string;
  pickupAt: string;
  pickupAddress: string;
  dropoffAddress?: string;
  passengerCount?: number;
  notes?: string;
};

export type BookingConfirmation = {
  confirmationCode: string;
  status: string;
  companyName: string;
  pickupAt: string;
  pickupAddress: string;
  dropoffAddress: string | null;
  serviceType: string;
  customerEmail: string;
};

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<BookingConfirmation> {
  const response = await fetch(`${getApiBaseUrl()}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to submit booking.");
  }

  return response.json();
}

export async function fetchBooking(
  confirmationCode: string,
): Promise<BookingConfirmation & { customerName: string }> {
  const response = await fetch(
    `${getApiBaseUrl()}/bookings/${encodeURIComponent(confirmationCode)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Booking not found.");
  }

  return response.json();
}
