WITH Scores AS (
    SELECT first_player AS player_id, first_score AS score FROM Matches
    UNION ALL
    SELECT second_player, second_score FROM Matches
)
SELECT group_id, player_id
FROM (
    SELECT 
        p.player_id,
        p.group_id,
        RANK() OVER (
            PARTITION BY p.group_id
            ORDER BY COALESCE(SUM(s.score), 0) DESC, p.player_id
        ) AS rnk
    FROM Players p
    LEFT JOIN Scores s
        ON p.player_id = s.player_id
    GROUP BY p.player_id, p.group_id
) t
WHERE rnk = 1;