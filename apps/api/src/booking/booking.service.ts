import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { randomBytes } from 'crypto';
import { getCompanyName } from '../brand/brand';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';

export type CreateBookingInput = {
  fullName: string;
  email: string;
  phone?: string;
  serviceType: string;
  pickupAt: string;
  pickupAddress: string;
  dropoffAddress?: string;
  passengerCount?: number;
  durationMinutes?: number;
  notes?: string;
};

const DEFAULT_DURATION_MINUTES = 120;

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(input: CreateBookingInput) {
    const fullName = input.fullName?.trim();
    const email = input.email?.trim().toLowerCase();
    const pickupAddress = input.pickupAddress?.trim();
    const serviceType = input.serviceType?.trim() || 'Chauffeur service';
    const pickupAt = new Date(input.pickupAt);
    const durationMinutes = input.durationMinutes ?? DEFAULT_DURATION_MINUTES;

    if (!fullName || !email || !pickupAddress) {
      throw new BadRequestException('Full name, email, and pickup are required.');
    }

    if (Number.isNaN(pickupAt.getTime())) {
      throw new BadRequestException('Pickup date and time is invalid.');
    }

    if (durationMinutes < 30 || durationMinutes > 720) {
      throw new BadRequestException(
        'Trip duration must be between 30 minutes and 12 hours.',
      );
    }

    const confirmationCode = this.generateConfirmationCode();
    const companyDisplayName = getCompanyName();

    const customer = await this.prisma.customer.upsert({
      where: { email },
      create: {
        email,
        fullName,
        phone: input.phone?.trim() || null,
      },
      update: {
        fullName,
        phone: input.phone?.trim() || null,
      },
    });

    const booking = await this.prisma.booking.create({
      data: {
        confirmationCode,
        status: BookingStatus.PENDING_APPROVAL,
        customerId: customer.id,
        serviceType,
        pickupAt,
        durationMinutes,
        pickupAddress,
        dropoffAddress: input.dropoffAddress?.trim() || null,
        passengerCount: input.passengerCount ?? 1,
        notes: input.notes?.trim() || null,
        companyDisplayName,
      },
      include: { customer: true },
    });

    await this.emailService.sendBookingRequestReceived(
      booking.customer.email,
      this.toEmailInput(booking),
    );

    return this.toPublicBooking(booking);
  }

  async approve(confirmationCode: string) {
    const booking = await this.findBookingRecord(confirmationCode);

    if (booking.status === BookingStatus.CONFIRMED) {
      const emailResult = await this.emailService.sendBookingConfirmation(
        booking.customer.email,
        this.toEmailInput(booking),
      );
      return {
        ...this.toPublicBooking(booking),
        emailSent: emailResult.sent,
        emailReason: emailResult.reason,
        emailDetail: emailResult.detail,
        resent: true,
      };
    }

    if (
      booking.status === BookingStatus.CANCELLED ||
      booking.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException('This booking can no longer be approved.');
    }

    const updated = await this.prisma.booking.update({
      where: { id: booking.id },
      data: { status: BookingStatus.CONFIRMED },
      include: { customer: true },
    });

    const emailResult = await this.emailService.sendBookingConfirmation(
      updated.customer.email,
      this.toEmailInput(updated),
    );

    return {
      ...this.toPublicBooking(updated),
      emailSent: emailResult.sent,
      emailReason: emailResult.reason,
      emailDetail: emailResult.detail,
    };
  }

  async resendConfirmation(confirmationCode: string) {
    const booking = await this.findBookingRecord(confirmationCode);

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new BadRequestException(
        'Confirmation emails can only be resent for approved bookings.',
      );
    }

    const emailResult = await this.emailService.sendBookingConfirmation(
      booking.customer.email,
      this.toEmailInput(booking),
    );

    return {
      ...this.toPublicBooking(booking),
      emailSent: emailResult.sent,
      emailReason: emailResult.reason,
      emailDetail: emailResult.detail,
      resent: true,
    };
  }

  async deny(confirmationCode: string) {
    const booking = await this.findBookingRecord(confirmationCode);

    if (booking.status === BookingStatus.CANCELLED) {
      return this.toPublicBooking(booking);
    }

    if (booking.status === BookingStatus.CONFIRMED) {
      throw new BadRequestException(
        'Confirmed bookings must be cancelled manually, not denied.',
      );
    }

    const updated = await this.prisma.booking.update({
      where: { id: booking.id },
      data: { status: BookingStatus.CANCELLED },
      include: { customer: true },
    });

    return this.toPublicBooking(updated);
  }

  async findByConfirmationCode(confirmationCode: string) {
    const booking = await this.findBookingRecord(confirmationCode);
    return this.toPublicBooking(booking);
  }

  async listRecent(limit = 20) {
    const bookings = await this.prisma.booking.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { customer: true },
    });

    return bookings.map((booking) => this.toPublicBooking(booking));
  }

  private async findBookingRecord(confirmationCode: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { confirmationCode: confirmationCode.trim().toUpperCase() },
      include: { customer: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found.');
    }

    return booking;
  }

  private toPublicBooking(
    booking: {
      confirmationCode: string;
      status: BookingStatus;
      companyDisplayName: string;
      pickupAt: Date;
      durationMinutes: number;
      pickupAddress: string;
      dropoffAddress: string | null;
      serviceType: string;
      customer: { fullName: string; email: string };
    },
  ) {
    return {
      confirmationCode: booking.confirmationCode,
      status: booking.status,
      companyName: booking.companyDisplayName,
      pickupAt: booking.pickupAt.toISOString(),
      durationMinutes: booking.durationMinutes,
      pickupAddress: booking.pickupAddress,
      dropoffAddress: booking.dropoffAddress,
      serviceType: booking.serviceType,
      customerName: booking.customer.fullName,
      customerEmail: booking.customer.email,
    };
  }

  private toEmailInput(booking: {
    confirmationCode: string;
    pickupAt: Date;
    pickupAddress: string;
    dropoffAddress: string | null;
    serviceType: string;
    customer: { fullName: string };
  }) {
    return {
      customerName: booking.customer.fullName,
      confirmationCode: booking.confirmationCode,
      pickupAt: booking.pickupAt.toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
      }),
      pickupAddress: booking.pickupAddress,
      dropoffAddress: booking.dropoffAddress ?? undefined,
      serviceType: booking.serviceType,
    };
  }

  private generateConfirmationCode(): string {
    const segment = randomBytes(3).toString('hex').toUpperCase();
    return `ESPGT-${segment}`;
  }
}
