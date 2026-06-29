WITH
    EventGroups AS (
        SELECT
            hall_id,
            start_day,
            end_day,
            IFNULL (
                start_day > MAX(end_day) OVER (
                    PARTITION BY
                        hall_id
                    ORDER BY
                        start_day,
                        end_day DESC ROWS BETWEEN UNBOUNDED PRECEDING
                        AND 1 PRECEDING
                ),
                1
            ) AS new_event
        FROM
            HallEvents
    ),
    GroupedEvents AS (
        SELECT
            hall_id,
            start_day,
            end_day,
            SUM(new_event) OVER (
                PARTITION BY
                    hall_id
                ORDER BY
                    start_day,
                    end_day DESC
            ) AS event_group
        FROM
            EventGroups
    )
SELECT
    hall_id,
    MIN(start_day) AS start_day,
    MAX(end_day) AS end_day
FROM
    GroupedEvents
GROUP BY
    hall_id,
    event_group;