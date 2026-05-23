SELECT
    order_id,
    customer_id,
    order_type
FROM
    (
        SELECT
            order_id,
            customer_id,
            order_type,
            RANK() OVER (
                PARTITION BY
                    customer_id
                ORDER BY
                    order_type
            ) AS rnk
        FROM
            Orders
    ) t
WHERE
    rnk = 1;