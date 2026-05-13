SELECT
    p.platform,
    e.experiment_name,
    COUNT(ex.experiment_id) AS num_experiments
FROM
    (
        SELECT
            'Android' AS platform
        UNION ALL
        SELECT
            'IOS'
        UNION ALL
        SELECT
            'Web'
    ) p
    CROSS JOIN (
        SELECT
            'Reading' AS experiment_name
        UNION ALL
        SELECT
            'Sports'
        UNION ALL
        SELECT
            'Programming'
    ) e
    LEFT JOIN Experiments ex ON p.platform = ex.platform
    AND e.experiment_name = ex.experiment_name
GROUP BY
    p.platform,
    e.experiment_name;