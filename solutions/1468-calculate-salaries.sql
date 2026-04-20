WITH salary_data AS (
  SELECT
    s.company_id,
    s.employee_id,
    s.employee_name,
    s.salary,
    MAX(s.salary) OVER (PARTITION BY s.company_id) AS max_sal
  FROM Salaries s
)
SELECT
  company_id,
  employee_id,
  employee_name,
  ROUND(
    CASE
      WHEN max_sal < 1000 THEN salary
      WHEN max_sal <= 10000 THEN salary * 0.76
      ELSE salary * 0.51
    END
  ) AS adjusted_salary
FROM salary_data;