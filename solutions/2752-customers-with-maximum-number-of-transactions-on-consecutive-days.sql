WITH
    cte AS (
        SELECT
            customer_id,
            TO_DAYS (transaction_date) - ROW_NUMBER() OVER (
                PARTITION BY
                    customer_id
                ORDER BY
                    transaction_date
            ) AS grp
        FROM
            Transactions
    )
SELECT
    customer_id
FROM
    (
        SELECT
            customer_id,
            RANK() OVER (
                ORDER BY
                    COUNT(*) DESC
            ) AS rnk
        FROM
            cte
        GROUP BY
            customer_id,
            grp
    ) t
WHERE
    rnk = 1
ORDER BY
    customer_id;