WITH SellerCounts AS (
    SELECT
        u.seller_id,
        COUNT(DISTINCT o.item_id) AS num_items
    FROM Users u
    JOIN Orders o
        ON u.seller_id = o.seller_id
    JOIN Items i
        ON o.item_id = i.item_id
    WHERE i.item_brand != u.favorite_brand
    GROUP BY u.seller_id
)
SELECT seller_id, num_items
FROM SellerCounts
WHERE num_items = (
    SELECT MAX(num_items)
    FROM SellerCounts
);