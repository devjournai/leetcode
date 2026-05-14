WITH
    senior AS (
        SELECT
            employee_id,
            salary,
            SUM(salary) OVER (
                ORDER BY
                    salary
            ) AS total
        FROM
            Candidates
        WHERE
            experience = 'Senior'
    ),
    junior AS (
        SELECT
            employee_id,
            SUM(salary) OVER (
                ORDER BY
                    salary
            ) + COALESCE(
                (
                    SELECT
                        MAX(total)
                    FROM
                        senior
                    WHERE
                        total <= 70000
                ),
                0
            ) AS total
        FROM
            Candidates
        WHERE
            experience = 'Junior'
    )
SELECT
    employee_id
FROM
    senior
WHERE
    total <= 70000
UNION
SELECT
    employee_id
FROM
    junior
WHERE
    total <= 70000;