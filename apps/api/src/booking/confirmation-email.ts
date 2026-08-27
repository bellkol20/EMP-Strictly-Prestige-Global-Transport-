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

/** Sent immediately when a customer submits a pending reservation */
export function buildBookingRequestReceivedEmail(
  input: BookingConfirmationEmailInput,
): { subject: string; text: string; html: string } {
  const company = getCompanyName();
  const subject = `${company} — we received your reservation request (${input.confirmationCode})`;
  const dropoff = input.dropoffAddress
    ? `\nDrop-off: ${input.dropoffAddress}`
    : '';

  const text = [
    `Dear ${input.customerName},`,
    '',
    `Thank you for contacting ${company}. We received your chauffeur request and our dispatch team is reviewing it now.`,
    '',
    `Reference: ${input.confirmationCode}`,
    `Service: ${input.serviceType}`,
    `Pickup: ${input.pickupAt}`,
    `From: ${input.pickupAddress}${dropoff}`,
    '',
    `You will receive another email once your trip is confirmed.`,
    '',
    company,
  ].join('\n');

  const html = `
    <div style="font-family: Georgia, serif; color: #14110e; line-height: 1.5;">
      <p>Dear ${escapeHtml(input.customerName)},</p>
      <p>Thank you for contacting <strong>${escapeHtml(company)}</strong>. We received your chauffeur request and our dispatch team is reviewing it now.</p>
      <p>
        <strong>Reference:</strong> ${escapeHtml(input.confirmationCode)}<br />
        <strong>Service:</strong> ${escapeHtml(input.serviceType)}<br />
        <strong>Pickup:</strong> ${escapeHtml(input.pickupAt)}<br />
        <strong>From:</strong> ${escapeHtml(input.pickupAddress)}
        ${
          input.dropoffAddress
            ? `<br /><strong>Drop-off:</strong> ${escapeHtml(input.dropoffAddress)}`
            : ''
        }
      </p>
      <p>You will receive another email once your trip is confirmed.</p>
      <p>${escapeHtml(company)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

/** Sent when dispatch declines a pending reservation */
export function buildBookingDenialEmail(
  input: BookingConfirmationEmailInput,
): { subject: string; text: string; html: string } {
  const company = getCompanyName();
  const supportEmail = process.env.SUPPORT_EMAIL?.trim();
  const subject = `${company} — update on your reservation request (${input.confirmationCode})`;
  const dropoff = input.dropoffAddress
    ? `\nDrop-off: ${input.dropoffAddress}`
    : '';
  const contactLine = supportEmail
    ? `If you would like to discuss alternatives or submit a new request, please contact us at ${supportEmail}.`
    : `If you would like to discuss alternatives or submit a new request, please contact ${company}.`;

  const text = [
    `Dear ${input.customerName},`,
    '',
    `Thank you for your interest in ${company}. After reviewing your request, we are unable to confirm the following reservation at this time.`,
    '',
    `Reference: ${input.confirmationCode}`,
    `Service: ${input.serviceType}`,
    `Pickup: ${input.pickupAt}`,
    `From: ${input.pickupAddress}${dropoff}`,
    '',
    contactLine,
    '',
    company,
  ].join('\n');

  const html = `
    <div style="font-family: Georgia, serif; color: #14110e; line-height: 1.5;">
      <p>Dear ${escapeHtml(input.customerName)},</p>
      <p>Thank you for your interest in <strong>${escapeHtml(company)}</strong>. After reviewing your request, we are unable to confirm the following reservation at this time.</p>
      <p>
        <strong>Reference:</strong> ${escapeHtml(input.confirmationCode)}<br />
        <strong>Service:</strong> ${escapeHtml(input.serviceType)}<br />
        <strong>Pickup:</strong> ${escapeHtml(input.pickupAt)}<br />
        <strong>From:</strong> ${escapeHtml(input.pickupAddress)}
        ${
          input.dropoffAddress
            ? `<br /><strong>Drop-off:</strong> ${escapeHtml(input.dropoffAddress)}`
            : ''
        }
      </p>
      <p>${escapeHtml(contactLine)}</p>
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
