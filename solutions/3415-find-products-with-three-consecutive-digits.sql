-- Find Products with Three Consecutive Digits
-- Intuition: A product name qualifies if it contains a standalone run of exactly three digits, not part of a longer number.
-- Approach: Match three digits bounded by a non-digit or a string edge on both sides using REGEXP.
-- Time Complexity: O(N * L)
-- Space Complexity: O(1)

SELECT
  product_id,
  name
FROM Products
WHERE
  name REGEXP '[^0-9][0-9]{3}[^0-9]'
  OR name REGEXP '^[0-9]{3}[^0-9]'
  OR name REGEXP '[^0-9][0-9]{3}$'
  OR name REGEXP '^[0-9]{3}$'
ORDER BY 1;
