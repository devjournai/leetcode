SELECT
  sale_date,
  SUM(
    CASE 
      WHEN fruit = 'apples' THEN sold_num
      ELSE -sold_num
    END
  ) AS difference
FROM Sales
GROUP BY sale_date;