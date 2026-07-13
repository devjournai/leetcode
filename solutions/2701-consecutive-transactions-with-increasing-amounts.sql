WITH
    cte AS (
        SELECT
            t1.customer_id,
            t1.transaction_date,
            TO_DAYS (t1.transaction_date) - ROW_NUMBER() OVER (
                PARTITION BY
                    t1.customer_id
                ORDER BY
                    t1.transaction_date
            ) AS grp
        FROM
            Transactions t1
            JOIN Transactions t2 ON t1.customer_id = t2.customer_id
        WHERE
            t2.transaction_date = DATE_ADD (t1.transaction_date, INTERVAL 1 DAY)
            AND t2.amount > t1.amount
    )
SELECT
    customer_id,
    MIN(transaction_date) AS consecutive_start,
    DATE_ADD (MIN(transaction_date), INTERVAL COUNT(*) DAY) AS consecutive_end
FROM
    cte
GROUP BY
    customer_id,
    grp
HAVING
    COUNT(*) >= 2
ORDER BY
    customer_id;