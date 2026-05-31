SELECT
    tp.team_id,
    tp.name,
    RANK() OVER (
        ORDER BY
            tp.points DESC,
            tp.name
    ) - RANK() OVER (
        ORDER BY
            tp.points + pc.points_change DESC,
            tp.name
    ) AS rank_diff
FROM
    TeamPoints tp
    JOIN PointsChange pc ON tp.team_id = pc.team_id;