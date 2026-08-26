import type { BookingConfirmation } from "@/lib/api";

/** Server-side Railway API base URL (Vercel env). */
export function getServerApiBaseUrl(): string {
  const url =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:3001";
  return url.replace(/\/$/, "");
}

export async function fetchBookingServer(
  confirmationCode: string,
): Promise<BookingConfirmation & { customerName: string }> {
  const response = await fetch(
    `${getServerApiBaseUrl()}/bookings/${encodeURIComponent(confirmationCode)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Booking not found.");
  }

  return response.json();
}
