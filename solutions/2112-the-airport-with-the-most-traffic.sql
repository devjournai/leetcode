SELECT
    airport_id
FROM
    (
        SELECT
            airport_id,
            RANK() OVER (
                ORDER BY
                    SUM(flights_count) DESC
            ) AS rnk
        FROM
            (
                SELECT
                    departure_airport AS airport_id,
                    flights_count
                FROM
                    Flights
                UNION ALL
                SELECT
                    arrival_airport,
                    flights_count
                FROM
                    Flights
            ) t
        GROUP BY
            airport_id
    ) x
WHERE
    rnk = 1;