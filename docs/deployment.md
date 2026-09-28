# Deployment

## Current platform research — 2026-09-28

| Platform | Current free/low-cost position | Role in this project |
|---|---|---|
| Vercel | Hobby is $0 for personal projects and includes automatic HTTPS/SSL; published usage limits apply. | Static React/Vite frontend |
| Render | Free web services and Free Postgres exist, but Render explicitly says free instances are not for production; Free Postgres is 1 GB and expires after 30 days. | API/database demonstration |
| Railway | New users receive a one-time $5 trial credit for up to 30 days; after that the Free plan provides $1/month credit, while Hobby includes $5/month usage. | Alternative full-stack platform |

Sources: Vercel current pricing/limits, Render free-service documentation, Railway current pricing/trial documentation. citeturn1search1turn1search0turn0search14turn0search11turn0search6

## Production API

Required variables:

- DATABASE_URL
- JWT_SECRET
- CORS_ORIGIN
- PORT
- NODE_ENV=production

Build:

```bash
npm install && npm run build
```

Start/release:

```bash
npx prisma migrate deploy && npm start
```

Health check: `/health`.

Prisma's current production guidance is to commit migration history and use `prisma migrate deploy` rather than `migrate dev` or `db push` against production. citeturn0search0turn0search2

## Frontend

Build with:

```bash
npm install
npm run build
```

Publish `dist` and set:

```
VITE_API_URL=https://<real-api-host>/api
```

## CORS

Set the API's CORS_ORIGIN to the exact HTTPS frontend origin. Never use a wildcard in production.

## Verification order

1. PostgreSQL provisioned.
2. API variables configured.
3. Migrations applied.
4. `/health` returns 200.
5. `/docs` and `/openapi.json` load.
6. Frontend deployed with HTTPS API URL.
7. CORS changed to the real frontend origin.
8. Browser search request succeeds end-to-end.

Public URLs are not fabricated in this repository. Once a hosting platform actually provisions them, the real frontend and API docs URLs can replace the placeholders in the submission notes.
