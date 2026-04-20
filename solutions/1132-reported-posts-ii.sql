SELECT ROUND(AVG(daily_percent) * 100, 2) AS average_daily_percent
FROM (
    SELECT 
        action_date,
        COUNT(DISTINCT CASE WHEN post_id IN (SELECT post_id FROM Removals) THEN post_id END) / COUNT(DISTINCT post_id) AS daily_percent
    FROM Actions
    WHERE extra = 'spam'
    GROUP BY action_date
) AS DailyStats;