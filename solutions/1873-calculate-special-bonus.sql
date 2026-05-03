SELECT
    order_id
FROM
    OrdersDetails
GROUP BY
    order_id
HAVING
    MAX(quantity) > (
        SELECT
            MAX(avg_quantity)
        FROM
            (
                SELECT
                    AVG(quantity) AS avg_quantity
                FROM
                    OrdersDetails
                GROUP BY
                    order_id
            ) t
    );