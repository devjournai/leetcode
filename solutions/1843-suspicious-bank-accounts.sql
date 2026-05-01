WITH monthly_totals AS (
    SELECT
        t.account_id,
        DATE_FORMAT(t.day, '%Y-%m-01') AS month_start,
        SUM(t.amount) AS total_amount,
        a.max_income
    FROM Transactions t
    JOIN Accounts a 
        ON t.account_id = a.account_id
    WHERE t.type = 'Creditor'
    GROUP BY t.account_id, month_start, a.max_income
    HAVING SUM(t.amount) > a.max_income
)

SELECT DISTINCT m1.account_id
FROM monthly_totals m1
JOIN monthly_totals m2
    ON m1.account_id = m2.account_id
   AND TIMESTAMPDIFF(MONTH, m1.month_start, m2.month_start) = 1;