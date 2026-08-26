import Link from "next/link";
import { fetchBookingServer } from "@/lib/api-server";
import { bookingConfirmationCopy } from "@/lib/booking-copy";
import { siteConfig } from "@/lib/site";

type Props = {
  searchParams: Promise<{ code?: string }>;
};

export default async function BookingConfirmationPage({ searchParams }: Props) {
  const { code } = await searchParams;

  if (!code) {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-32 md:px-8">
        <h1 className="font-display text-4xl text-[var(--ink)]">
          Confirmation
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          No confirmation code was provided.
        </p>
        <Link className="mt-6 inline-block underline" href="/book">
          Return to booking
        </Link>
      </div>
    );
  }

  let booking;
  try {
    booking = await fetchBookingServer(code);
  } catch {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-32 md:px-8">
        <h1 className="font-display text-4xl text-[var(--ink)]">
          Booking not found
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          We couldn&apos;t find confirmation code {code}.
        </p>
        <Link className="mt-6 inline-block underline" href="/book">
          Start a new booking
        </Link>
      </div>
    );
  }

  const copy = bookingConfirmationCopy(
    booking.confirmationCode,
    booking.status as import("@/lib/booking-copy").BookingStatus,
  );
  const pickupDate = new Date(booking.pickupAt).toLocaleString();

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-32 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brass)]">
        {copy.eyebrow}
      </p>
      <h1 className="mt-4 font-display text-4xl text-[var(--ink)]">
        {copy.headline}
      </h1>
      <p className="mt-4 text-[var(--muted)]">{copy.body}</p>

      <dl className="mt-10 space-y-4 border border-[var(--line)] bg-[var(--surface)] p-6 text-sm">
        <div>
          <dt className="text-[var(--muted)]">Status</dt>
          <dd>{booking.status.replaceAll("_", " ")}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Confirmation</dt>
          <dd className="font-display text-2xl text-[var(--ink)]">
            {booking.confirmationCode}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Guest</dt>
          <dd>{booking.customerName}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Service</dt>
          <dd>{booking.serviceType}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Pickup</dt>
          <dd>
            {pickupDate}
            <br />
            {booking.pickupAddress}
          </dd>
        </div>
        {booking.dropoffAddress ? (
          <div>
            <dt className="text-[var(--muted)]">Drop-off</dt>
            <dd>{booking.dropoffAddress}</dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Questions? Email{" "}
        <a className="underline" href={`mailto:${siteConfig.supportEmail}`}>
          {siteConfig.supportEmail}
        </a>
        .
      </p>
    </div>
  );
}
