-- Baseline projection: includes an unused company.logoUrl value.
EXPLAIN (ANALYZE, BUFFERS)
SELECT i.id,i.title,i.location,i.category,i."createdAt",c.name,c."logoUrl"
FROM "Internship" i JOIN "Company" c ON c.id=i."companyId"
ORDER BY i."createdAt" DESC,i.id ASC
LIMIT 12 OFFSET 0;
