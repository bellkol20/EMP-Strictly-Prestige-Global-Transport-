# Admin + email setup — EMP Strictly Prestige Global Transport

## Admin dashboard

URL: `https://your-domain.com/admin`

### Environment variables

Set the **same** admin key on Railway and Vercel:

| Platform | Variable | Example |
| --- | --- | --- |
| Railway | `ADMIN_API_KEY` | `espgt-admin-8f3c...` (long random string) |
| Vercel | `ADMIN_API_KEY` | same value |
| Vercel | `ADMIN_PASSWORD` | your private password |

Vercel `/admin` is protected with HTTP Basic Auth (`admin` + `ADMIN_PASSWORD`).

The dashboard lists recent bookings with links to confirmation pages.

## Customer confirmation emails (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Add and verify domain `empstrictlyprestige.com` (DNS records)
3. Create an API key

### Railway variables

```
RESEND_API_KEY=re_...
EMAIL_FROM=EMP Strictly Prestige Global Transport <reservations@empstrictlyprestige.com>
SUPPORT_EMAIL=reservations@empstrictlyprestige.com
```

Until `RESEND_API_KEY` is set, bookings still save — emails are skipped with a log warning.

## Test checklist

1. Submit a booking on the live site
2. Customer inbox receives branded confirmation
3. Open `/admin` with your password
4. Booking appears in the table

## Next: Square payments

See `docs/DEVELOPMENT_PLAN.md` — Square checkout will attach after email is verified.
