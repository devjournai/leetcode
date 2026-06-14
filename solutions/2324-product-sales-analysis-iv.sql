SELECT
    user_id,
    product_id
FROM
    (
        SELECT
            s.user_id,
            s.product_id,
            RANK() OVER (
                PARTITION BY
                    s.user_id
                ORDER BY
                    SUM(s.quantity * p.price) DESC
            ) AS rnk
        FROM
            Sales s
            JOIN Product p ON s.product_id = p.product_id
        GROUP BY
            s.user_id,
            s.product_id
    ) t
WHERE
    rnk = 1;