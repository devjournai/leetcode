WITH
    cte AS (
        SELECT
            id,
            drink,
            SUM(drink IS NOT NULL) OVER (
                ORDER BY
                    id
            ) AS grp
        FROM
            CoffeeShop
    )
SELECT
    id,
    FIRST_VALUE (drink) OVER (
        PARTITION BY
            grp
        ORDER BY
            id
    ) AS drink
FROM
    cte;