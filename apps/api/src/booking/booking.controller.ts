import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminKeyGuard } from '../admin/admin-key.guard';
import { BookingService, CreateBookingInput } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() body: CreateBookingInput) {
    return this.bookingService.create(body);
  }

  @Get('recent')
  @UseGuards(AdminKeyGuard)
  listRecent() {
    return this.bookingService.listRecent();
  }

  @Post(':confirmationCode/approve')
  @UseGuards(AdminKeyGuard)
  approve(@Param('confirmationCode') confirmationCode: string) {
    return this.bookingService.approve(confirmationCode);
  }

  @Post(':confirmationCode/deny')
  @UseGuards(AdminKeyGuard)
  deny(@Param('confirmationCode') confirmationCode: string) {
    return this.bookingService.deny(confirmationCode);
  }

  @Get(':confirmationCode')
  findOne(@Param('confirmationCode') confirmationCode: string) {
    return this.bookingService.findByConfirmationCode(confirmationCode);
  }
}
