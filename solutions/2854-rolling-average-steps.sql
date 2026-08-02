SELECT
    user_id,
    steps_date,
    ROUND(
        AVG(steps_count) OVER (
            PARTITION BY user_id
            ORDER BY steps_date
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ),
        2
    ) AS rolling_average
FROM (
    SELECT *,
           LAG(steps_date, 2) OVER (
               PARTITION BY user_id
               ORDER BY steps_date
           ) AS prev_date
    FROM Steps
) s
WHERE DATEDIFF(steps_date, prev_date) = 2
ORDER BY user_id, steps_date;