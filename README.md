# TalentBridge — Performance Optimization, Dockerization & Deployment

NeuroFive Solutions Week 5 — Full Stack Web Development.

This repository is a separate production-readiness pass over the TalentBridge internship catalog. It focuses on measurable performance work, PostgreSQL query planning, Docker/Compose, production configuration, health checks, structured logs, OpenAPI, and deployment documentation.

## Deliverables

- React/Vite frontend with a lazy-loaded internship details panel.
- Express/TypeScript backend with Prisma/PostgreSQL.
- Indexed internship catalog query and reduced response projection.
- EXPLAIN ANALYZE before/after scripts and reproducible benchmark script.
- Backend and frontend Dockerfiles.
- One-command local stack with PostgreSQL + API + frontend via Compose.
- /health endpoint and structured request logs.
- Swagger UI at /docs and checked-in OpenAPI JSON.
- Production migration step using `prisma migrate deploy`.
- Render Blueprint configuration for API + PostgreSQL and Vercel static deployment configuration.
- Environment separation and secret hygiene.
- Architecture and deployment documentation.

## Local setup

1. Copy `backend/.env.example` to `backend/.env`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Run:

```bash
docker compose up --build
```

The frontend is available at http://localhost:5173, API at http://localhost:4000, health at http://localhost:4000/health, and Swagger UI at http://localhost:4000/docs.

No manual database setup is required when Compose is used.

## Non-Docker development

Backend:

```bash
cd backend
npm install
npx prisma migrate deploy
npm run seed
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Performance work

The catalog previously selected `logoUrl` for every company even though the catalog card did not render it. The optimized query now projects only the company fields required by the page. The frontend also moves the details panel into a dynamic import so it is not part of the initial route chunk.

The SQL evidence files compare the indexed ordering/filter path. Run them against the same PostgreSQL dataset:

```bash
psql "$DATABASE_URL" -f docs/explain-before.sql
psql "$DATABASE_URL" -f docs/explain-after.sql
```

For a reproducible HTTP measurement after the stack is running:

```bash
node docs/benchmark.mjs
```

Do not replace measured output with invented numbers. Paste the command output into `docs/performance-before-after.md` when collecting deployment evidence.

## API

Swagger UI: `http://localhost:4000/docs`

OpenAPI JSON: `http://localhost:4000/openapi.json`

Main endpoints:

- GET /health
- POST /api/auth/login
- GET /api/internships
- GET /api/internships/options
- GET /api/me

## Production migrations

Committed migrations are applied with:

```bash
npx prisma migrate deploy
```

Prisma documents `migrate deploy` as the production/staging migration command; migrations should be committed and reviewed rather than generated against production. citeturn0search0turn0search2

## Deployment

See [docs/deployment.md](docs/deployment.md) for the researched platform comparison, environment variables, migration order, CORS configuration, health checks, and manual deployment sequence.

The repository contains deployment configuration, but public production URLs are intentionally not fabricated. A real URL only becomes valid after the deployment platform provisions the user's account/project.

## Security and secrets

- Never commit `.env` files.
- Production values belong in the hosting platform's secret/environment-variable manager.
- `JWT_SECRET` must be long and random.
- `CORS_ORIGIN` must be the exact production frontend origin.
- Database migrations run from committed migration files.
