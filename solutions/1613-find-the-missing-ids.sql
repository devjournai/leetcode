WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1
  FROM nums
  WHERE n < (SELECT MAX(customer_id) FROM Customers)
)
SELECT n AS missing_id
FROM nums
WHERE n NOT IN (SELECT customer_id FROM Customers)
ORDER BY n;