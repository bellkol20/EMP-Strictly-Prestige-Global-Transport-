"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BookingStatus } from "@/lib/booking-copy";
import { bookingStatusLabel } from "@/lib/booking-copy";

type Props = {
  confirmationCode: string;
  status: BookingStatus;
};

export function AdminBookingActions({ confirmationCode, status }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<"approve" | "deny" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(action: "approve" | "deny") {
    setBusy(action);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/bookings/${encodeURIComponent(confirmationCode)}/${action}`,
        { method: "POST" },
      );

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Action failed.");
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
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
