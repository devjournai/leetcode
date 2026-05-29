SELECT
    b.bus_id,
    COUNT(p.passenger_id) AS passengers_cnt
FROM
    (
        SELECT
            bus_id,
            arrival_time,
            LAG (arrival_time, 1, 0) OVER (
                ORDER BY
                    arrival_time
            ) AS prev_time
        FROM
            Buses
    ) b
    LEFT JOIN Passengers p ON p.arrival_time > b.prev_time
    AND p.arrival_time <= b.arrival_time
GROUP BY
    b.bus_id
ORDER BY
    b.bus_id;