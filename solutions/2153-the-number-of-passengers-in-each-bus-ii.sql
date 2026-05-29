WITH
    bus_data AS (
        SELECT
            bus_id,
            arrival_time,
            capacity,
            LAG (arrival_time, 1, 0) OVER (
                ORDER BY
                    arrival_time
            ) AS prev_time
        FROM
            Buses
    ),
    waiting AS (
        SELECT
            b.bus_id,
            b.arrival_time,
            b.capacity,
            COUNT(p.passenger_id) AS waiting_count,
            ROW_NUMBER() OVER (
                ORDER BY
                    b.arrival_time
            ) AS rn
        FROM
            bus_data b
            LEFT JOIN Passengers p ON p.arrival_time > b.prev_time
            AND p.arrival_time <= b.arrival_time
        GROUP BY
            b.bus_id,
            b.arrival_time,
            b.capacity
    ),
    boarding AS (
        SELECT
            rn,
            bus_id,
            LEAST (capacity, waiting_count) AS boarded,
            GREATEST (0, waiting_count - capacity) AS remaining
        FROM
            waiting
        WHERE
            rn = 1
        UNION ALL
        SELECT
            w.rn,
            w.bus_id,
            LEAST (w.capacity, w.waiting_count + b.remaining),
            GREATEST (0, w.waiting_count + b.remaining - w.capacity)
        FROM
            waiting w
            JOIN boarding b ON w.rn = b.rn + 1
    )
SELECT
    bus_id,
    boarded AS passengers_cnt
FROM
    boarding
ORDER BY
    bus_id;