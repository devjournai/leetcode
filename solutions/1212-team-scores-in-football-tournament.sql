WITH all_matches AS (
    SELECT
        host_team AS team_id,
        host_goals,
        guest_goals
    FROM Matches

    UNION ALL

    SELECT
        guest_team AS team_id,
        guest_goals AS host_goals,
        host_goals AS guest_goals
    FROM Matches
)

SELECT
    t.team_id,
    t.team_name,
    SUM(
        CASE
            WHEN m.host_goals > m.guest_goals THEN 3
            WHEN m.host_goals = m.guest_goals THEN 1
            ELSE 0
        END
    ) AS num_points
FROM Teams t
LEFT JOIN all_matches m
    ON t.team_id = m.team_id
GROUP BY t.team_id, t.team_name
ORDER BY num_points DESC, t.team_id;