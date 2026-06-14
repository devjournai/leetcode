SELECT
    city_id,
    day,
    degree
FROM
    (
        SELECT
            city_id,
            day,
            degree,
            RANK() OVER (
                PARTITION BY
                    city_id
                ORDER BY
                    degree DESC,
                    day
            ) AS rnk
        FROM
            Weather
    ) w
WHERE
    rnk = 1;