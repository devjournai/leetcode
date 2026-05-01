SELECT
    t.team_name,
    COUNT(*) AS matches_played,
    SUM(points) AS points,
    SUM(goals_for) AS goal_for,
    SUM(goals_against) AS goal_against,
    SUM(goals_for - goals_against) AS goal_diff
FROM (
    -- Home team perspective
    SELECT
        m.home_team_id AS team_id,
        CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 3
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
        END AS points,
        m.home_team_goals AS goals_for,
        m.away_team_goals AS goals_against
    FROM Matches m

    UNION ALL

    -- Away team perspective
    SELECT
        m.away_team_id AS team_id,
        CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 3
            WHEN m.away_team_goals = m.home_team_goals THEN 1
            ELSE 0
        END AS points,
        m.away_team_goals AS goals_for,
        m.home_team_goals AS goals_against
    FROM Matches m
) stats
JOIN Teams t ON t.team_id = stats.team_id
GROUP BY t.team_name
ORDER BY points DESC, goal_diff DESC, team_name;