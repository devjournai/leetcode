SELECT
  c.name AS customer_name,
  c.customer_id,
  o.order_id,
  o.order_date
FROM (
  SELECT
    order_id,
    order_date,
    customer_id,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY order_date DESC
    ) AS rn
  FROM Orders
) o
JOIN Customers c
  ON o.customer_id = c.customer_id
WHERE o.rn <= 3
ORDER BY c.name, c.customer_id, o.order_date DESC;