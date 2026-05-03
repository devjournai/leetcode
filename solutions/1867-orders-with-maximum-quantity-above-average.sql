SELECT
    order_id
FROM
    OrdersDetails
GROUP BY
    order_id
HAVING
    MAX(quantity) > (
        SELECT
            MAX(avg_q)
        FROM
            (
                SELECT
                    AVG(quantity) AS avg_q
                FROM
                    OrdersDetails
                GROUP BY
                    order_id
            ) t
    );