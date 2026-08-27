import Link from "next/link";
import { PageHero } from "@/components/PageHero";
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
      <>
        <PageHero
          title="Confirmation"
          description="No confirmation code was provided."
        />
        <div className="mx-auto max-w-2xl px-6 pb-24 md:px-8">
          <Link className="inline-block underline" href="/book">
            Return to booking
          </Link>
        </div>
      </>
    );
  }

  let booking;
  try {
    booking = await fetchBookingServer(code);
  } catch {
    return (
      <>
        <PageHero
          title="Booking not found"
          description={`We couldn't find confirmation code ${code}.`}
        />
        <div className="mx-auto max-w-2xl px-6 pb-24 md:px-8">
          <Link className="inline-block underline" href="/book">
            Start a new booking
          </Link>
        </div>
      </>
    );
  }

  const copy = bookingConfirmationCopy(
    booking.confirmationCode,
    booking.status as import("@/lib/booking-copy").BookingStatus,
  );
  const pickupDate = new Date(booking.pickupAt).toLocaleString();

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.headline}
        description={copy.body}
      />
      <div className="mx-auto max-w-2xl px-6 pb-24 md:px-8">
        <dl className="space-y-4 border border-[var(--line)] bg-[var(--surface)] p-6 text-sm">
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
    </>
  );
}
