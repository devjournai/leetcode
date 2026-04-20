SELECT
  p.product_name,
  p.product_id,
  o.order_id,
  o.order_date
FROM (
  SELECT
    product_id,
    order_id,
    order_date,
    RANK() OVER (
      PARTITION BY product_id
      ORDER BY order_date DESC
    ) AS rn
  FROM Orders
) o
JOIN Products p
  ON o.product_id = p.product_id
WHERE o.rn = 1
ORDER BY p.product_name, p.product_id, o.order_id;