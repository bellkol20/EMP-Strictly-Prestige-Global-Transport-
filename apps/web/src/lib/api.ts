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

/** Browser calls same-origin proxy — avoids CORS issues with Railway. */
export async function createBooking(
  payload: CreateBookingPayload,
): Promise<BookingConfirmation> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Unable to submit booking.";
    try {
      const data = (await response.json()) as { message?: string };
      message = data.message ?? message;
    } catch {
      message = (await response.text()) || message;
    }
    throw new Error(message);
  }

  return response.json();
}
