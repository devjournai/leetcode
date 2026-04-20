SELECT
    m.employee_id,
    m.name,
    COUNT(r.employee_id) AS reports_count,
    ROUND(AVG(r.age)) AS average_age
FROM
    Employees AS m
JOIN
    Employees AS r
ON
    m.employee_id = r.reports_to
GROUP BY
    m.employee_id,
    m.name
ORDER BY
    m.employee_id;