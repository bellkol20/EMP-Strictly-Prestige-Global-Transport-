# Connect domain + go live — EMP Strictly Prestige Global Transport

## 1. Fix the Vercel website URL (if you see 404)

The production URL only works after a **successful** deployment is assigned.

1. Vercel → your project → **Deployments**
2. Open the latest **Ready** deployment → **Visit**
3. Use **that exact URL** everywhere below (not a guessed `.vercel.app` name)

## 2. Vercel environment variables

**Settings → Environment Variables** (plain variables, not Secret):

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `https://emp-strictly-prestige-global-transport-production.up.railway.app` |
| `NEXT_PUBLIC_SITE_URL` | Your working Vercel URL |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | `reservations@empstrictlyprestige.com` |

Redeploy after saving.

## 3. Railway API variables

| Name | Value |
| --- | --- |
| `DATABASE_URL` | Linked from Postgres |
| `CORS_ORIGIN` | Same Vercel URL (no trailing slash) |
| `COMPANY_NAME` | `EMP Strictly Prestige Global Transport` |

Redeploy API after saving.

## 4. Buy and connect your domain

Recommended registrar: **Cloudflare**, **Porkbun**, or **Namecheap**.

Example domain: `empstrictlyprestige.com` (check availability).

### Website (Vercel)

1. Vercel → **Settings → Domains**
2. Add `empstrictlyprestige.com` and `www.empstrictlyprestige.com`
3. At your registrar, add the DNS records Vercel shows (usually `A` + `CNAME`)
4. Wait for SSL (often 5–30 minutes)

Update env vars:

- Vercel `NEXT_PUBLIC_SITE_URL` → `https://empstrictlyprestige.com`
- Railway `CORS_ORIGIN` → `https://empstrictlyprestige.com`

Redeploy both.

### API subdomain (optional, recommended)

1. Railway → API → **Networking → Custom Domain**
2. Add `api.empstrictlyprestige.com`
3. At registrar, add the CNAME Railway provides
4. Update Vercel `NEXT_PUBLIC_API_URL` → `https://api.empstrictlyprestige.com`

## 5. Test booking

1. Open your live site → **Book**
2. Submit a test reservation
3. You should land on `/book/confirmation?code=ESPGT-...`
4. API health should show `"database": "connected"` at `/`

## 6. Still to build

- Square checkout + saved payment methods
- Transactional email (Resend / SendGrid)
- Admin dashboard wired to `/bookings/recent`
- Quote/pricing engine
