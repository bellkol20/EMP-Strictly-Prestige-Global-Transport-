# Connect your domain — EMP Strictly Prestige Global Transport

Recommended domain: **`empstrictlyprestige.com`** (check availability at Cloudflare, Porkbun, or Namecheap).

## Step 1 — Buy the domain

1. Create an account at your registrar
2. Search for `empstrictlyprestige.com`
3. Purchase the domain
4. Keep DNS management at the registrar **or** move DNS to Cloudflare (recommended)

## Step 2 — Connect website on Vercel

1. Open **Vercel** → your web project → **Settings → Domains**
2. Add:
   - `empstrictlyprestige.com`
   - `www.empstrictlyprestige.com`
3. Vercel shows DNS records to add. Typical setup:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | Vercel IP (shown in dashboard) |
| `CNAME` | `www` | `cname.vercel-dns.com` |

4. Wait 5–30 minutes for DNS + SSL
5. In Vercel **Domains**, set `empstrictlyprestige.com` as **primary** (redirect www → apex or vice versa)

## Step 3 — Update environment variables

### Vercel (web)

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://empstrictlyprestige.com` |
| `API_URL` | `https://emp-strictly-prestige-global-transport-production.up.railway.app` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | `reservations@empstrictlyprestige.com` |

Redeploy Vercel after saving.

### Railway (API)

| Variable | Value |
| --- | --- |
| `CORS_ORIGIN` | `https://empstrictlyprestige.com` |
| `SUPPORT_EMAIL` | `reservations@empstrictlyprestige.com` |

Redeploy Railway after saving.

## Step 4 — Email DNS (for Resend)

After buying the domain, set up email in **Resend** (resend.com):

1. Add domain `empstrictlyprestige.com`
2. Add the DNS records Resend provides (SPF, DKIM, optional DMARC)
3. Verify domain in Resend
4. On **Railway**, set:
   - `RESEND_API_KEY` = your Resend API key
   - `EMAIL_FROM` = `EMP Strictly Prestige Global Transport <reservations@empstrictlyprestige.com>`

New bookings will email customers automatically.

## Step 5 — Optional API subdomain

1. Railway → API service → **Networking → Custom Domain**
2. Add `api.empstrictlyprestige.com`
3. Add the CNAME at your registrar
4. Update Vercel `API_URL` → `https://api.empstrictlyprestige.com`
5. Redeploy Vercel

## Step 6 — Test

- [ ] `https://empstrictlyprestige.com` loads the homepage
- [ ] Book form submits successfully
- [ ] Customer receives confirmation email
- [ ] `/admin` shows recent bookings (password protected)

## Admin access

Set on **Vercel**:

- `ADMIN_PASSWORD` = your private admin login password
- `ADMIN_API_KEY` = long random secret (same value on Railway)

Set on **Railway**:

- `ADMIN_API_KEY` = same secret as Vercel

Visit `/admin` — browser will prompt for username `admin` and your password.
