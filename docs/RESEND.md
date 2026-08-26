# Resend setup — empstrictlyprestige.com (Porkbun DNS)

Automated emails from **EMP Strictly Prestige Global Transport**:

| When | Email |
| --- | --- |
| Customer submits booking | “We received your request” (pending) |
| Admin clicks **Approve** | “Booking confirmed” |

Zoho stays for your inbox at `reservations@empstrictlyprestige.com`. Resend only **sends** automated messages.

---

## Step 1 — Create Resend account

1. Go to [resend.com](https://resend.com) → sign up (free tier is fine to start)
2. **API Keys** → **Create API Key** → copy it (`re_...`)

---

## Step 2 — Add domain in Resend

1. **Domains** → **Add Domain**
2. Enter: `empstrictlyprestige.com`
3. Resend shows DNS records to add (usually DKIM + SPF/MX for sending)

---

## Step 3 — Add DNS in Porkbun

1. Porkbun → **empstrictlyprestige.com** → **DNS**
2. **Add** each record Resend shows (do not delete Zoho MX records)

### SPF (important — merge with Zoho)

You already have:

```text
v=spf1 include:zoho.com ~all
```

Edit that TXT record on `@` / `empstrictlyprestige.com` to **include Resend**:

```text
v=spf1 include:zoho.com include:amazonses.com ~all
```

(Resend uses Amazon SES — Resend’s dashboard shows the exact SPF value; use theirs if different.)

### DKIM

Add the **3 CNAME** (or TXT) records Resend provides for DKIM — names like `resend._domainkey` etc.

### Do NOT remove

- Zoho **MX** records (`mx.zoho.com`, etc.)
- Zoho **DKIM** (`zmail._domainkey...`)
- Zoho verification TXT

3. Save all records

---

## Step 4 — Verify in Resend

1. Back in Resend → **Domains** → **Verify**
2. Wait until status is **Verified** (often 5–30 minutes)

---

## Step 5 — Railway environment variables

API service → **Variables** → add:

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | `re_...` (your key) |
| `EMAIL_FROM` | `EMP Strictly Prestige Global Transport <reservations@empstrictlyprestige.com>` |
| `SUPPORT_EMAIL` | `reservations@empstrictlyprestige.com` |

**Redeploy** the Railway API.

---

## Step 6 — Test

1. Submit a test booking on https://www.empstrictlyprestige.com/book  
   → Customer should get **“request received”** email  

2. Open `/admin` → **Approve** that booking  
   → Customer should get **“booking confirmed”** email  

3. Check spam folder if nothing arrives in 2–3 minutes

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Domain not verifying | Double-check DKIM CNAMEs in Porkbun; no typos |
| Emails not sending | Confirm `RESEND_API_KEY` on Railway + redeploy |
| “From” rejected | Domain must be **Verified** in Resend; `EMAIL_FROM` must use `@empstrictlyprestige.com` |
| Zoho inbox stops working | Do not remove MX records; only merge SPF TXT |

---

## Optional: notify dispatch on new bookings

Later we can add `DISPATCH_EMAIL=reservations@empstrictlyprestige.com` to BCC dispatch on every new request.
