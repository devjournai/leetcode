SELECT
    l1.user_id AS user_id,
    l2.user_id AS recommended_id
FROM
    Listens l1
    JOIN Listens l2 ON l1.song_id = l2.song_id
    AND l1.day = l2.day
    AND l1.user_id < l2.user_id
WHERE
    NOT EXISTS (
        SELECT
            1
        FROM
            Friendship f
        WHERE
            f.user1_id = l1.user_id
            AND f.user2_id = l2.user_id
    )
GROUP BY
    l1.user_id,
    l2.user_id,
    l1.day
HAVING
    COUNT(DISTINCT l1.song_id) >= 3
UNION
SELECT
    l2.user_id AS user_id,
    l1.user_id AS recommended_id
FROM
    Listens l1
    JOIN Listens l2 ON l1.song_id = l2.song_id
    AND l1.day = l2.day
    AND l1.user_id < l2.user_id
WHERE
    NOT EXISTS (
        SELECT
            1
        FROM
            Friendship f
        WHERE
            f.user1_id = l1.user_id
            AND f.user2_id = l2.user_id
    )
GROUP BY
    l1.user_id,
    l2.user_id,
    l1.day
HAVING
    COUNT(DISTINCT l1.song_id) >= 3;