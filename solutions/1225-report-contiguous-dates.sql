WITH T AS (
    SELECT fail_date AS dt, 'failed' AS st
    FROM Failed
    WHERE YEAR(fail_date) = 2019

    UNION ALL

    SELECT success_date AS dt, 'succeeded' AS st
    FROM Succeeded
    WHERE YEAR(success_date) = 2019
),
Grouped AS (
    SELECT 
        dt,
        st,
        DATE_SUB(dt, INTERVAL ROW_NUMBER() OVER (PARTITION BY st ORDER BY dt) DAY) AS grp
    FROM T
)
SELECT 
    st AS period_state,
    MIN(dt) AS start_date,
    MAX(dt) AS end_date
FROM Grouped
GROUP BY st, grp
ORDER BY start_date;