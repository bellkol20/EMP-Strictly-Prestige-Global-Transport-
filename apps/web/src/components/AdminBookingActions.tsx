"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BookingStatus } from "@/lib/booking-copy";
import { bookingStatusLabel } from "@/lib/booking-copy";

type Props = {
  confirmationCode: string;
  status: BookingStatus;
};

type ActionResult = {
  emailSent?: boolean;
  emailReason?: string;
  emailDetail?: string;
  resent?: boolean;
};

export function AdminBookingActions({ confirmationCode, status }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<"approve" | "deny" | "resend" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleAction(action: "approve" | "deny" | "resend-confirmation") {
    setBusy(action === "resend-confirmation" ? "resend" : action);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch(
        `/api/admin/bookings/${encodeURIComponent(confirmationCode)}/${action}`,
        { method: "POST" },
      );

      const data = (await response.json()) as ActionResult & { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Action failed.");
      }

      if (action === "approve" || action === "resend-confirmation") {
        if (data.emailSent) {
          setNotice(
            action === "resend-confirmation" || data.resent
              ? "Confirmation email sent to the customer."
              : "Booking approved and confirmation email sent.",
          );
        } else {
          setError(
            `Booking updated, but the confirmation email did not send (${data.emailReason ?? "unknown"}). Check Railway logs and spam folder.`,
          );
        }
      } else {
        setNotice("Booking declined.");
      }

      router.refresh();
    } catch (actionError) {
      setError(
        actionError instanceof Error ? actionError.message : "Action failed.",
      );
    } finally {
      setBusy(null);
    }
  }

  if (status === "CONFIRMED") {
    return (
      <div className="space-y-2">
        <span className="block text-xs uppercase tracking-wide text-[var(--muted)]">
          {bookingStatusLabel(status)}
        </span>
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => handleAction("resend-confirmation")}
          className="border border-[var(--line)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)] disabled:opacity-60"
        >
          {busy === "resend" ? "…" : "Resend email"}
        </button>
        {notice ? <p className="text-xs text-green-800">{notice}</p> : null}
        {error ? <p className="text-xs text-red-700">{error}</p> : null}
      </div>
    );
  }

  if (status !== "PENDING_APPROVAL" && status !== "PENDING_PAYMENT") {
    return (
      <span className="text-xs uppercase tracking-wide text-[var(--muted)]">
        {bookingStatusLabel(status)}
      </span>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => handleAction("approve")}
          className="bg-[var(--brass)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)] disabled:opacity-60"
        >
          {busy === "approve" ? "…" : "Approve"}
        </button>
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => handleAction("deny")}
          className="border border-[var(--line)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)] disabled:opacity-60"
        >
          {busy === "deny" ? "…" : "Deny"}
        </button>
      </div>
      {notice ? <p className="text-xs text-green-800">{notice}</p> : null}
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
