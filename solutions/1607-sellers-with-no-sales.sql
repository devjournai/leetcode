SELECT s.seller_name
FROM Seller s
LEFT JOIN Orders o
  ON s.seller_id = o.seller_id
 AND o.sale_date >= '2020-01-01'
 AND o.sale_date < '2021-01-01'
WHERE o.order_id IS NULL
ORDER BY s.seller_name;