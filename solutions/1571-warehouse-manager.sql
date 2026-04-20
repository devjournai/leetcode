SELECT
  w.name AS warehouse_name,
  SUM(w.units * p.width * p.length * p.height) AS total_volume
FROM Warehouse w
JOIN Products p
  ON w.product_id = p.product_id
GROUP BY w.name;