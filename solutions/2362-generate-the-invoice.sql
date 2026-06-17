SELECT
    p.product_id,
    pu.quantity,
    pu.quantity * p.price AS price
FROM
    Purchases pu
    JOIN Products p ON pu.product_id = p.product_id
WHERE
    pu.invoice_id = (
        SELECT
            invoice_id
        FROM
            Purchases pu
            JOIN Products p ON pu.product_id = p.product_id
        GROUP BY
            invoice_id
        ORDER BY
            SUM(pu.quantity * p.price) DESC,
            invoice_id
        LIMIT
            1
    );