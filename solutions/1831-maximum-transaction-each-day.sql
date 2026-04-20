SELECT transaction_id
FROM (
  SELECT
    transaction_id,
    RANK() OVER (
      PARTITION BY DATE(day)
      ORDER BY amount DESC
    ) AS rn
  FROM Transactions
) t
WHERE rn = 1
ORDER BY transaction_id;