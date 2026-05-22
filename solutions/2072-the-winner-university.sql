SELECT
    CASE
        WHEN ny_count > ca_count THEN 'New York University'
        WHEN ny_count < ca_count THEN 'California University'
        ELSE 'No Winner'
    END AS winner
FROM
    (
        SELECT
            (
                SELECT
                    COUNT(*)
                FROM
                    NewYork
                WHERE
                    score >= 90
            ) AS ny_count,
            (
                SELECT
                    COUNT(*)
                FROM
                    California
                WHERE
                    score >= 90
            ) AS ca_count
    ) t;