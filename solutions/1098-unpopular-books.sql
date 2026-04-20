SELECT 
    b.book_id,
    MAX(b.name) AS name
FROM Books b
LEFT JOIN Orders o
    ON b.book_id = o.book_id
    AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'
WHERE b.available_from < DATE_SUB('2019-06-23', INTERVAL 30 DAY)
GROUP BY b.book_id
HAVING COALESCE(SUM(o.quantity), 0) < 10;