import { getCompanyName } from '../brand/brand';

export type BookingConfirmationEmailInput = {
  customerName: string;
  confirmationCode: string;
  pickupAt: string;
  pickupAddress: string;
  dropoffAddress?: string;
  serviceType: string;
};

/** Customer-facing booking confirmation copy — always uses EMP brand name */
export function buildBookingConfirmationEmail(
  input: BookingConfirmationEmailInput,
): { subject: string; text: string; html: string } {
  const company = getCompanyName();
  const subject = `${company} booking confirmed — ${input.confirmationCode}`;
  const dropoff = input.dropoffAddress
    ? `\nDrop-off: ${input.dropoffAddress}`
    : '';

  const text = [
    `Dear ${input.customerName},`,
    '',
    `Thank you for booking with ${company}.`,
    '',
    `Confirmation: ${input.confirmationCode}`,
    `Service: ${input.serviceType}`,
    `Pickup: ${input.pickupAt}`,
    `From: ${input.pickupAddress}${dropoff}`,
    '',
    `We look forward to serving you.`,
    '',
    company,
  ].join('\n');

  const html = `
    <div style="font-family: Georgia, serif; color: #14110e; line-height: 1.5;">
      <p>Dear ${escapeHtml(input.customerName)},</p>
      <p>Thank you for booking with <strong>${escapeHtml(company)}</strong>.</p>
      <p>
        <strong>Confirmation:</strong> ${escapeHtml(input.confirmationCode)}<br />
        <strong>Service:</strong> ${escapeHtml(input.serviceType)}<br />
        <strong>Pickup:</strong> ${escapeHtml(input.pickupAt)}<br />
        <strong>From:</strong> ${escapeHtml(input.pickupAddress)}
        ${
          input.dropoffAddress
            ? `<br /><strong>Drop-off:</strong> ${escapeHtml(input.dropoffAddress)}`
            : ''
        }
      </p>
      <p>We look forward to serving you.</p>
      <p>${escapeHtml(company)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
