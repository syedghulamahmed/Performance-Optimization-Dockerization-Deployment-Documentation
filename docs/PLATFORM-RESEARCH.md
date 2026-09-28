# Platform research — 2026-09-28

## Vercel

Hobby is currently $0/month for personal projects. Current limits include 100 deployments/day, one concurrent build, and published usage caps; the pricing page lists 100 GB/month Fast Data Transfer. It provides automatic HTTPS/SSL. citeturn1search1turn1search0

## Render

Render currently offers free web services and Free Postgres. Render explicitly states that free instances are not for production. Free Postgres is 1 GB and expires 30 days after creation. citeturn0search14

## Railway

Railway's current free trial gives $5 in one-time credits for up to 30 days. The current Free plan provides $1/month credit; Hobby includes $5/month usage. citeturn0search11turn0search6

## Decision

Use Vercel for the static frontend and a managed container/Postgres platform for the API/database. Render configuration is included because its deployment model maps directly to this Express + Prisma architecture, but its free Postgres tier is explicitly documented as non-production and expiring.
