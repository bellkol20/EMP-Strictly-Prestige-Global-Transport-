-- Add pending approval status and trip duration for overlap checks
ALTER TYPE "BookingStatus" ADD VALUE IF NOT EXISTS 'PENDING_APPROVAL';

ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "durationMinutes" INTEGER NOT NULL DEFAULT 120;
