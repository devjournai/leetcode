SELECT
  u.user_id,
  u.user_name,
  u.credit +
    SUM(
      CASE
        WHEN u.user_id = t.paid_by THEN -t.amount
        WHEN u.user_id = t.paid_to THEN t.amount
        ELSE 0
      END
    ) AS credit,
  CASE
    WHEN u.credit +
         SUM(
           CASE
             WHEN u.user_id = t.paid_by THEN -t.amount
             WHEN u.user_id = t.paid_to THEN t.amount
             ELSE 0
           END
         ) < 0 THEN 'Yes'
    ELSE 'No'
  END AS credit_limit_breached
FROM Users u
LEFT JOIN Transactions t
  ON u.user_id = t.paid_by OR u.user_id = t.paid_to
GROUP BY u.user_id, u.user_name, u.credit;