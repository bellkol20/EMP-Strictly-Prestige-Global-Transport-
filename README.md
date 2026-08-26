# EMP Strictly Prestige Global Transport

Luxury chauffeur booking platform for **EMP Strictly Prestige Global Transport**.

## Architecture

| Layer | Stack | Host |
| --- | --- | --- |
| Website & booking UI | Next.js + TypeScript + Tailwind | Vercel |
| API | NestJS + TypeScript | Railway |
| Database | PostgreSQL + Prisma | Railway |
| Payments | Square (checkout + saved payment methods) | Square |
| Source control | Git | GitHub |
| Primary AI in Cursor | Claude | — |

Empire Limousines is used as a **structural and business reference** only. Branding, copy, and visual identity are original to EMP Strictly Prestige Global Transport.

## Monorepo layout

```
apps/web          Next.js site (Vercel)
apps/api          NestJS API (Railway)
packages/brand    Canonical company name & brand constants
```

## Brand

Use the shared package everywhere display names, emails, SEO, and confirmations appear:

**EMP Strictly Prestige Global Transport**

```ts
import { COMPANY_NAME, BRAND } from "@espgt/brand";
```

Do not use legacy or alternate company names in product copy.

## Getting started

```bash
npm install

# Web (http://localhost:3000)
npm run dev:web

# API (http://localhost:3001 by default after config)
npm run dev:api
```

Copy env templates:

- `apps/web/.env.example` → `apps/web/.env.local`
- `apps/api/.env.example` → `apps/api/.env`

## Planned product surface (Empire-inspired IA)

- Home / brand hero
- Services (airport, corporate, hourly, wedding, group, long-distance, private aviation)
- Fleet
- Online reservation / quote
- Booking confirmation + customer email
- Corporate accounts (later)
- Admin dashboard (later)

## Development notes

- Keep payments on Square; never store raw card data in our database.
- Prisma schema lives in `apps/api/prisma`.
- Prefer shared brand constants over hard-coded company strings.
