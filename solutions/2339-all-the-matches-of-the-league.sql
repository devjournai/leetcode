SELECT
    h.team_name AS home_team,
    a.team_name AS away_team
FROM
    Teams h
    CROSS JOIN Teams a
WHERE
    h.team_name <> a.team_name;