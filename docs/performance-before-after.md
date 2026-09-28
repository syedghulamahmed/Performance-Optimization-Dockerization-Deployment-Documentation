# Performance before/after evidence

## Real issue selected

The previous catalog query projected `company.logoUrl` for every row even though the catalog UI did not render logos. That creates unnecessary database-to-application transfer and unnecessary JSON bytes.

Week 5 changes the Prisma projection to `company: { select: { name: true } }`.

## Controlled database evidence

- `explain-before.sql` keeps the original projection.
- `explain-after.sql` removes the unused field.
- Both use the same order, limit, join and database.
- Run both against the same seeded database and preserve the complete EXPLAIN output.

## HTTP measurement

Start the stack, then run:

```bash
API_URL=http://localhost:4000 node docs/benchmark.mjs
```

The benchmark collects 20 samples and reports average, p95, min, max and response bytes.

| Metric | Baseline | Optimized |
|---|---:|---:|
| Average response bytes | Measure Week 4 | Benchmark Week 5 |
| Average HTTP ms | Measure Week 4 | Benchmark Week 5 |
| p95 HTTP ms | Measure Week 4 | Benchmark Week 5 |
| EXPLAIN execution time | Paste Week 4 output | Paste Week 5 output |

No performance number is invented in source control. The benchmark and SQL evidence are included so a reviewer can reproduce the claim.

## Frontend improvement

The details panel is now a Vite dynamic import:

```ts
const Details=lazy(()=>import("./Details"));
```

This creates a separate chunk so the initial catalog does not download the optional dialog component. Record `dist/assets` sizes after `npm run build` and compare with the Week 4 single-entry build.
