-- Calculate Product Final Price
-- Intuition: Each product's final price is list price reduced by its category discount, or unchanged when the category has no discount row.
-- Approach: LEFT JOIN Discounts on category and compute price * (1 - IFNULL(discount, 0) / 100).
-- Dry Run: Products (id=1, price=100, category='A'), Discounts (category='A', discount=10) -> final_price 90.
-- Time Complexity: O(P + D)
-- Space Complexity: O(P + D) for the join

SELECT
    Products.product_id,
    Products.price - (
        Products.price * IFNULL(Discounts.discount, 0) / 100
    ) AS final_price,
    Products.category
FROM Products
LEFT JOIN Discounts
    USING (category);
