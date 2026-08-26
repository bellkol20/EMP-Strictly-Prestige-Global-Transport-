"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBooking } from "@/lib/api";
import { siteConfig } from "@/lib/site";

const serviceOptions = [
  "Airport transfer",
  "Corporate travel",
  "Hourly as-directed",
  "Wedding & events",
  "Private aviation / FBO",
  "Long-distance",
];

export function BookingForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);

    try {
      const result = await createBooking({
        fullName: String(form.get("fullName") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? "") || undefined,
        serviceType: String(form.get("serviceType") ?? "Chauffeur service"),
        pickupAt: String(form.get("pickupAt") ?? ""),
        pickupAddress: String(form.get("pickupAddress") ?? ""),
        dropoffAddress: String(form.get("dropoffAddress") ?? "") || undefined,
        passengerCount: Number(form.get("passengerCount") ?? 1),
        notes: String(form.get("notes") ?? "") || undefined,
      });

      router.push(
        `/book/confirmation?code=${encodeURIComponent(result.confirmationCode)}`,
      );
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit booking.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Full name</span>
        <input
          className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          name="fullName"
          autoComplete="name"
          required
        />
      </label>

      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Email</span>
        <input
          className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
      </label>

      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Phone (optional)</span>
        <input
          className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          type="tel"
          name="phone"
          autoComplete="tel"
        />
      </label>

      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Service type</span>
        <select
          className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          name="serviceType"
          defaultValue={serviceOptions[0]}
          required
        >
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Pickup date & time</span>
        <input
          className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          type="datetime-local"
          name="pickupAt"
          required
        />
      </label>

      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Pickup address</span>
        <input
          className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          name="pickupAddress"
          required
        />
      </label>

      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Drop-off address (optional)</span>
        <input
          className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          name="dropoffAddress"
        />
      </label>

      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Passengers</span>
        <input
          className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          type="number"
          name="passengerCount"
          min={1}
          max={55}
          defaultValue={1}
          required
        />
      </label>

      <label className="block text-sm">
        <span className="text-[var(--ink-soft)]">Notes (optional)</span>
        <textarea
          className="mt-2 min-h-24 w-full border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--brass)]"
          name="notes"
        />
      </label>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="bg-[var(--brass)] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)] disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Request booking"}
      </button>

      <p className="text-sm text-[var(--muted)]">
        Requests are sent to {siteConfig.name}. Payment via Square is coming
        next; your reservation is saved immediately.
      </p>
    </form>
  );
}
