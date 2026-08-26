import { BookingStatus } from '@prisma/client';

/** Statuses that block the same chauffeur window on the calendar */
export const CALENDAR_BLOCKING_STATUSES: BookingStatus[] = [
  BookingStatus.PENDING_APPROVAL,
  BookingStatus.PENDING_PAYMENT,
  BookingStatus.CONFIRMED,
  BookingStatus.IN_PROGRESS,
];

export function getBookingWindow(
  pickupAt: Date,
  durationMinutes: number,
): { start: Date; end: Date } {
  return {
    start: pickupAt,
    end: new Date(pickupAt.getTime() + durationMinutes * 60_000),
  };
}

export function windowsOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}
