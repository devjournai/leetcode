SELECT
  s.product_id,
  p.product_name,
  yr.report_year,
  s.average_daily_sales * (
    (CASE 
        WHEN YEAR(s.period_end) > yr.report_year 
        THEN yr.total_days 
        ELSE DAYOFYEAR(s.period_end) 
     END)
    -
    (CASE 
        WHEN YEAR(s.period_start) < yr.report_year 
        THEN 1 
        ELSE DAYOFYEAR(s.period_start) 
     END)
    + 1
  ) AS total_amount
FROM Sales s
JOIN (
  SELECT 2018 AS report_year, 365 AS total_days
  UNION ALL
  SELECT 2019, 365
  UNION ALL
  SELECT 2020, 366
) yr
  ON YEAR(s.period_start) <= yr.report_year
 AND YEAR(s.period_end) >= yr.report_year
JOIN Product p
  ON p.product_id = s.product_id
ORDER BY s.product_id, yr.report_year;