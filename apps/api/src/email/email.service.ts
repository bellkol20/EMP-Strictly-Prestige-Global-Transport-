import { Injectable, Logger } from '@nestjs/common';
import { buildBookingConfirmationEmail } from '../booking/confirmation-email';
import type { BookingConfirmationEmailInput } from '../booking/confirmation-email';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendBookingConfirmation(
    to: string,
    input: BookingConfirmationEmailInput,
  ): Promise<{ sent: boolean; reason?: string }> {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from =
      process.env.EMAIL_FROM?.trim() ??
      process.env.SUPPORT_EMAIL?.trim() ??
      'onboarding@resend.dev';

    const { subject, html, text } = buildBookingConfirmationEmail(input);

    if (!apiKey) {
      this.logger.warn(
        'RESEND_API_KEY not set — skipping customer confirmation email.',
      );
      return { sent: false, reason: 'email_not_configured' };
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          html,
          text,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        this.logger.error(`Resend error: ${response.status} ${body}`);
        return { sent: false, reason: 'email_provider_error' };
      }

      return { sent: true };
    } catch (error) {
      this.logger.error('Failed to send confirmation email', error);
      return { sent: false, reason: 'email_send_failed' };
    }
  }
}
