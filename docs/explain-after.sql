-- Optimized projection: only fields rendered by the catalog are transferred.
EXPLAIN (ANALYZE, BUFFERS)
SELECT i.id,i.title,i.location,i.category,i."createdAt",c.name
FROM "Internship" i JOIN "Company" c ON c.id=i."companyId"
ORDER BY i."createdAt" DESC,i.id ASC
LIMIT 12 OFFSET 0;
