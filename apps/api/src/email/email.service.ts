import { Injectable, Logger } from '@nestjs/common';
import {
  buildBookingConfirmationEmail,
  buildBookingDenialEmail,
  buildBookingRequestReceivedEmail,
} from '../booking/confirmation-email';
import type { BookingConfirmationEmailInput } from '../booking/confirmation-email';

export type EmailSendResult = {
  sent: boolean;
  reason?: string;
  detail?: string;
};

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendBookingRequestReceived(
    to: string,
    input: BookingConfirmationEmailInput,
  ): Promise<EmailSendResult> {
    const { subject, html, text } = buildBookingRequestReceivedEmail(input);
    return this.send(to, subject, html, text);
  }

  async sendBookingConfirmation(
    to: string,
    input: BookingConfirmationEmailInput,
  ): Promise<EmailSendResult> {
    const { subject, html, text } = buildBookingConfirmationEmail(input);
    return this.send(to, subject, html, text);
  }

  async sendBookingDenial(
    to: string,
    input: BookingConfirmationEmailInput,
  ): Promise<EmailSendResult> {
    const { subject, html, text } = buildBookingDenialEmail(input);
    return this.send(to, subject, html, text);
  }

  private async send(
    to: string,
    subject: string,
    html: string,
    text: string,
  ): Promise<EmailSendResult> {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from =
      process.env.EMAIL_FROM?.trim() ??
      process.env.SUPPORT_EMAIL?.trim() ??
      'onboarding@resend.dev';
    const replyTo = process.env.SUPPORT_EMAIL?.trim();

    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not set — skipping email.');
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
          ...(replyTo ? { reply_to: [replyTo] } : {}),
          subject,
          html,
          text,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        this.logger.error(`Resend error: ${response.status} ${body}`);
        return {
          sent: false,
          reason: 'email_provider_error',
          detail: body,
        };
      }

      return { sent: true };
    } catch (error) {
      this.logger.error('Failed to send email', error);
      return {
        sent: false,
        reason: 'email_send_failed',
        detail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
