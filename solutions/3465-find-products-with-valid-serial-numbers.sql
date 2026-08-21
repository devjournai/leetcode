-- Find Products with Valid Serial Numbers
-- A valid serial is SN followed by 4 digits, a hyphen, and 4 more digits,
-- not extended by extra digits afterward.
SELECT product_id, product_name, description
FROM Products
WHERE
  description REGEXP 'SN[0-9]{4}-[0-9]{4}$'
  OR description REGEXP 'SN[0-9]{4}-[0-9]{4}[^0-9]+'
ORDER BY 1;
