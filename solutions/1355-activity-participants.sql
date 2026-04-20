WITH activity_stats AS (
  SELECT 
    activity,
    COUNT(*) AS total_count
  FROM Friends
  GROUP BY activity
)
SELECT activity
FROM activity_stats
WHERE total_count NOT IN (
  (SELECT MIN(total_count) FROM activity_stats),
  (SELECT MAX(total_count) FROM activity_stats)
);