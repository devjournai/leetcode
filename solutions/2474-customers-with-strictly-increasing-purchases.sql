WITH
    yearly_orders AS (
        SELECT
            customer_id,
            YEAR (order_date) AS year,
            SUM(price) AS total_price
        FROM
            Orders
        GROUP BY
            customer_id,
            YEAR (order_date)
    )
SELECT
    y1.customer_id
FROM
    yearly_orders y1
    LEFT JOIN yearly_orders y2 ON y1.customer_id = y2.customer_id
    AND y2.year = y1.year + 1
    AND y2.total_price > y1.total_price
GROUP BY
    y1.customer_id
HAVING
    COUNT(*) = COUNT(y2.customer_id) + 1;