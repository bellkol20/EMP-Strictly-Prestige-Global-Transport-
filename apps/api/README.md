# EMP Strictly Prestige Global Transport — API

NestJS + TypeScript API for **EMP Strictly Prestige Global Transport**.

## Stack

- NestJS → Railway
- PostgreSQL + Prisma → Railway
- Square → payments and secure customer payment methods

## Scripts

```bash
npm run start:dev
npx prisma migrate dev
npx prisma generate
```

## Brand

Company display name is centralized in `@espgt/brand` and `COMPANY_NAME` env.
Booking confirmation emails and admin payloads use that name only.

## Endpoints (scaffold)

- `GET /` — health + company name
- `GET /brand` — display name for clients
- `GET /admin/overview` — admin dashboard stub
