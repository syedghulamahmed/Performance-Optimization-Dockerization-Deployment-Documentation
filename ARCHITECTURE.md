# Architecture

## Runtime

```
Browser
  |
  | HTTPS
  v
Vercel static frontend
  |
  | HTTPS JSON
  v
Render API service
  |
  | private PostgreSQL connection
  v
Managed PostgreSQL
```

Local development replaces the hosted services with Docker Compose:

```
Browser -> frontend container -> backend container -> postgres container
```

## Frontend

React + TypeScript + Vite.

The initial catalog route owns search/filter/pagination state. The optional internship details panel is dynamically imported, keeping non-critical UI outside the initial JavaScript chunk.

The frontend sends only server-side catalog parameters. Search is debounced before requests are issued.

## Backend

Express provides HTTP routing and middleware:

1. Helmet/security headers.
2. JSON parser with a bounded body size.
3. Explicit CORS origin.
4. Request logging middleware.
5. Health route.
6. API routes.
7. Error handler.

Prisma is the data-access layer. The catalog query uses an allow-listed sort mapping and a stable secondary ID order.

## Database

PostgreSQL stores users, students, companies, and internships.

Indexes support common equality/order access paths:

- Internship(location)
- Internship(category)
- Internship(createdAt)
- Internship(companyId, createdAt)

The catalog projection selects only fields rendered by the current page.

## Deployment

The API image runs migrations before starting the server in the production deployment command. This is deliberately different from development: development uses `migrate dev`; production uses the already-reviewed migration history with `migrate deploy`. Prisma documents this production workflow and advisory locking for migration deployment. citeturn0search5turn0search0
