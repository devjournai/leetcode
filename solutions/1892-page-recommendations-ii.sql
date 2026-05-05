SELECT
    f.user_id,
    l.page_id,
    COUNT(DISTINCT f.friend_id) AS friends_likes
FROM
    (
        SELECT
            user1_id AS user_id,
            user2_id AS friend_id
        FROM
            Friendship
        UNION ALL
        SELECT
            user2_id,
            user1_id
        FROM
            Friendship
    ) f
    JOIN Likes l ON f.friend_id = l.user_id
    LEFT JOIN Likes ul ON f.user_id = ul.user_id
    AND l.page_id = ul.page_id
WHERE
    ul.page_id IS NULL
GROUP BY
    f.user_id,
    l.page_id;