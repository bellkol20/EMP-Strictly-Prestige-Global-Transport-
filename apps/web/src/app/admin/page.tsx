import Link from "next/link";
import type { Metadata } from "next";
import { AdminBookingActions } from "@/components/AdminBookingActions";
import { getServerApiBaseUrl } from "@/lib/api-server";
import type { BookingStatus } from "@/lib/booking-copy";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
  description: `${siteConfig.name} admin dashboard.`,
};

export type AdminBooking = {
  confirmationCode: string;
  status: string;
  companyName: string;
  pickupAt: string;
  pickupAddress: string;
  dropoffAddress: string | null;
  customerName: string;
  customerEmail: string;
  serviceType: string;
};

async function loadBookings(): Promise<AdminBooking[]> {
  const adminKey = process.env.ADMIN_API_KEY?.trim();
  if (!adminKey) {
    return [];
  }

  const response = await fetch(`${getServerApiBaseUrl()}/bookings/recent`, {
    headers: { "x-admin-key": adminKey },
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function AdminPage() {
  const bookings = await loadBookings();
  const adminConfigured = Boolean(process.env.ADMIN_API_KEY?.trim());

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brass)]">
        Internal
      </p>
      <h1 className="mt-4 font-display text-4xl text-[var(--ink)]">
        {siteConfig.name} Admin
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        Recent reservations from the live booking system.
      </p>

      {!adminConfigured ? (
        <p className="mt-8 rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Set matching <code className="font-mono">ADMIN_API_KEY</code> on
          Railway and Vercel to load bookings here.
        </p>
      ) : bookings.length === 0 ? (
        <p className="mt-8 rounded border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
          No bookings loaded. Confirm <code className="font-mono">ADMIN_API_KEY</code>{" "}
          matches Railway and redeploy both services.
        </p>
      ) : null}

      <div className="mt-10 overflow-x-auto border border-[var(--line)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Confirmation</th>
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Trip</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-[var(--muted)]" colSpan={6}>
                  No bookings yet.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.confirmationCode} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3">
                    <Link
                      className="font-mono underline"
                      href={`/book/confirmation?code=${booking.confirmationCode}`}
                    >
                      {booking.confirmationCode}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>{booking.customerName}</div>
                    <div className="text-[var(--muted)]">
                      {booking.customerEmail}
                    </div>
                  </td>
                  <td className="px-4 py-3">{booking.serviceType}</td>
                  <td className="px-4 py-3">
                    <div>{new Date(booking.pickupAt).toLocaleString()}</div>
                    <div className="mt-1 text-[var(--muted)]">
                      <span className="text-[var(--ink-soft)]">From:</span>{" "}
                      {booking.pickupAddress}
                    </div>
                    {booking.dropoffAddress ? (
                      <div className="mt-1 text-[var(--muted)]">
                        <span className="text-[var(--ink-soft)]">To:</span>{" "}
                        {booking.dropoffAddress}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">{booking.status}</td>
                  <td className="px-4 py-3">
                    <AdminBookingActions
                      confirmationCode={booking.confirmationCode}
                      status={booking.status as BookingStatus}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
