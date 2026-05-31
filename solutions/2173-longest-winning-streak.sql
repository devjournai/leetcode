WITH
    wins AS (
        SELECT
            player_id,
            match_day,
            ROW_NUMBER() OVER (
                PARTITION BY
                    player_id
                ORDER BY
                    match_day
            ) AS rn
        FROM
            Matches
        WHERE
            result = 'Win'
    ),
    streaks AS (
        SELECT
            player_id,
            COUNT(*) AS streak
        FROM
            (
                SELECT
                    player_id,
                    rn - ROW_NUMBER() OVER (
                        PARTITION BY
                            player_id
                        ORDER BY
                            match_day
                    ) AS grp
                FROM
                    wins
            ) t
        GROUP BY
            player_id,
            grp
    )
SELECT
    m.player_id,
    COALESCE(MAX(s.streak), 0) AS longest_streak
FROM
    Matches m
    LEFT JOIN streaks s ON m.player_id = s.player_id
GROUP BY
    m.player_id;