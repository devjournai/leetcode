SELECT
    user_id
FROM
    (
        SELECT
            caller_id AS user_id,
            recipient_id,
            DATE(call_time) AS call_date,
            RANK() OVER (
                PARTITION BY
                    caller_id,
                    DATE(call_time)
                ORDER BY
                    call_time
            ) AS first_call,
            RANK() OVER (
                PARTITION BY
                    caller_id,
                    DATE(call_time)
                ORDER BY
                    call_time DESC
            ) AS last_call
        FROM
            (
                SELECT
                    caller_id,
                    recipient_id,
                    call_time
                FROM
                    Calls
                UNION ALL
                SELECT
                    recipient_id,
                    caller_id,
                    call_time
                FROM
                    Calls
            ) t
    ) x
WHERE
    first_call = 1
    OR last_call = 1
GROUP BY
    user_id,
    call_date
HAVING
    COUNT(DISTINCT recipient_id) = 1;