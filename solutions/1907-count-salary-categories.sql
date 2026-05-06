WITH
    CategoryCounts AS (
        SELECT
            SUM(
                CASE
                    WHEN income < 20000 THEN 1
                    ELSE 0
                END
            ) AS low_salary_count,
            SUM(
                CASE
                    WHEN income >= 20000
                    AND income <= 50000 THEN 1
                    ELSE 0
                END
            ) AS average_salary_count,
            SUM(
                CASE
                    WHEN income > 50000 THEN 1
                    ELSE 0
                END
            ) AS high_salary_count
        FROM
            Accounts
    )
SELECT
    'Low Salary' AS category,
    low_salary_count AS accounts_count
FROM
    CategoryCounts
UNION ALL
SELECT
    'Average Salary' AS category,
    average_salary_count AS accounts_count
FROM
    CategoryCounts
UNION ALL
SELECT
    'High Salary' AS category,
    high_salary_count AS accounts_count
FROM
    CategoryCounts;