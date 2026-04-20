SELECT customer_number
FROM 
(SELECT customer_number, COUNT(order_number) AS top
FROM Orders
GROUP BY customer_number
ORDER BY top DESC) AS temp
LIMIT 1;

