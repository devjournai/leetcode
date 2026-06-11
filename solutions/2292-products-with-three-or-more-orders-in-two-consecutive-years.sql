SELECT DISTINCT
    product_id
FROM
    (
        SELECT
            product_id,
            yr,
            LEAD (yr) OVER (
                PARTITION BY
                    product_id
                ORDER BY
                    yr
            ) AS next_yr
        FROM
            (
                SELECT
                    product_id,
                    YEAR (purchase_date) AS yr
                FROM
                    Orders
                GROUP BY
                    product_id,
                    YEAR (purchase_date)
                HAVING
                    COUNT(*) >= 3
            ) t
    ) x
WHERE
    next_yr = yr + 1;