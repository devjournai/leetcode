SELECT
  LOWER(TRIM(product_name)) AS product_name,
  DATE_FORMAT(sale_date, '%Y-%m') AS month,
  COUNT(*) AS total_sales
FROM Sales
GROUP BY product_name, month
ORDER BY product_name, month;