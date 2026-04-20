WITH visit_stats AS (
  SELECT
    v.user_id,
    v.visit_date,
    COUNT(t.transaction_date) AS txn_count
  FROM Visits v
  LEFT JOIN Transactions t
    ON v.user_id = t.user_id
   AND v.visit_date = t.transaction_date
  GROUP BY v.user_id, v.visit_date
),
numbers AS (
  SELECT 0 AS n
  UNION ALL
  SELECT ROW_NUMBER() OVER () 
  FROM Transactions
)
SELECT
  n.n AS transactions_count,
  COUNT(vs.user_id) AS visits_count
FROM numbers n
LEFT JOIN visit_stats vs
  ON n.n = vs.txn_count
WHERE n.n <= (SELECT MAX(txn_count) FROM visit_stats)
GROUP BY n.n
ORDER BY n.n;