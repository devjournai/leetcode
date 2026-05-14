WITH
    cte AS (
        SELECT
            employee_id,
            experience,
            salary,
            ROW_NUMBER() OVER (
                PARTITION BY
                    experience
                ORDER BY
                    salary,
                    employee_id
            ) AS rn,
            SUM(salary) OVER (
                PARTITION BY
                    experience
                ORDER BY
                    salary,
                    employee_id
            ) AS total_salary
        FROM
            Candidates
    ),
    senior AS (
        SELECT
            COUNT(*) AS accepted,
            COALESCE(MAX(total_salary), 0) AS spent
        FROM
            cte
        WHERE
            experience = 'Senior'
            AND total_salary <= 70000
    )
SELECT
    'Senior' AS experience,
    accepted AS accepted_candidates
FROM
    senior
UNION ALL
SELECT
    'Junior',
    COUNT(*)
FROM
    cte
WHERE
    experience = 'Junior'
    AND total_salary <= (
        70000 - (
            SELECT
                spent
            FROM
                senior
        )
    );