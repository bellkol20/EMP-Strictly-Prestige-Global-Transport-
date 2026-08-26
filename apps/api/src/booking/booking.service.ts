import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { randomBytes } from 'crypto';
import { getCompanyName } from '../brand/brand';
import { buildBookingConfirmationEmail } from './confirmation-email';
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
  notes?: string;
};

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

    if (!fullName || !email || !pickupAddress) {
      throw new BadRequestException('Full name, email, and pickup are required.');
    }

    if (Number.isNaN(pickupAt.getTime())) {
      throw new BadRequestException('Pickup date and time is invalid.');
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
        status: BookingStatus.CONFIRMED,
        customerId: customer.id,
        serviceType,
        pickupAt,
        pickupAddress,
        dropoffAddress: input.dropoffAddress?.trim() || null,
        passengerCount: input.passengerCount ?? 1,
        notes: input.notes?.trim() || null,
        companyDisplayName,
      },
      include: { customer: true },
    });

    const emailPreview = buildBookingConfirmationEmail({
      customerName: customer.fullName,
      confirmationCode: booking.confirmationCode,
      pickupAt: booking.pickupAt.toISOString(),
      pickupAddress: booking.pickupAddress,
      dropoffAddress: booking.dropoffAddress ?? undefined,
      serviceType: booking.serviceType,
    });

    const emailResult = await this.emailService.sendBookingConfirmation(
      customer.email,
      {
        customerName: customer.fullName,
        confirmationCode: booking.confirmationCode,
        pickupAt: booking.pickupAt.toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
        pickupAddress: booking.pickupAddress,
        dropoffAddress: booking.dropoffAddress ?? undefined,
        serviceType: booking.serviceType,
      },
    );

    return {
      confirmationCode: booking.confirmationCode,
      status: booking.status,
      companyName: companyDisplayName,
      pickupAt: booking.pickupAt.toISOString(),
      pickupAddress: booking.pickupAddress,
      dropoffAddress: booking.dropoffAddress,
      serviceType: booking.serviceType,
      customerEmail: customer.email,
      emailSent: emailResult.sent,
      emailPreview,
    };
  }

  async findByConfirmationCode(confirmationCode: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { confirmationCode: confirmationCode.trim().toUpperCase() },
      include: { customer: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found.');
    }

    return {
      confirmationCode: booking.confirmationCode,
      status: booking.status,
      companyName: booking.companyDisplayName,
      pickupAt: booking.pickupAt.toISOString(),
      pickupAddress: booking.pickupAddress,
      dropoffAddress: booking.dropoffAddress,
      serviceType: booking.serviceType,
      customerName: booking.customer.fullName,
      customerEmail: booking.customer.email,
    };
  }

  async listRecent(limit = 20) {
    const bookings = await this.prisma.booking.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { customer: true },
    });

    return bookings.map((booking) => ({
      confirmationCode: booking.confirmationCode,
      status: booking.status,
      companyName: booking.companyDisplayName,
      pickupAt: booking.pickupAt.toISOString(),
      pickupAddress: booking.pickupAddress,
      customerName: booking.customer.fullName,
      customerEmail: booking.customer.email,
      serviceType: booking.serviceType,
    }));
  }

  private generateConfirmationCode(): string {
    const segment = randomBytes(3).toString('hex').toUpperCase();
    return `ESPGT-${segment}`;
  }
}
