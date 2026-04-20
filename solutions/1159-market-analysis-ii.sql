SELECT 
    u.user_id AS seller_id,
    IF(u.favorite_brand = i.item_brand, 'yes', 'no') AS 2nd_item_fav_brand
FROM users u
LEFT JOIN (
    SELECT seller_id, item_id
    FROM (
        SELECT seller_id, item_id,
               ROW_NUMBER() OVER (PARTITION BY seller_id ORDER BY order_date) rn
        FROM orders
    ) t
    WHERE rn = 2
) o ON u.user_id = o.seller_id
LEFT JOIN items i ON o.item_id = i.item_id;