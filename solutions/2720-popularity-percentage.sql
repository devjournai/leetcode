WITH
    FriendsList AS (
        SELECT
            user1 AS user,
            user2 AS friend
        FROM
            Friends
        UNION ALL
        SELECT
            user2,
            user1
        FROM
            Friends
    )
SELECT
    user,
    ROUND(
        COUNT(DISTINCT friend) * 100.0 / COUNT(*) OVER (),
        2
    ) AS percentage_popularity
FROM
    FriendsList
GROUP BY
    user
ORDER BY
    user;