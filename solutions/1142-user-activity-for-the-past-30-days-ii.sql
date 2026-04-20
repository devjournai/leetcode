WITH stats AS (
  SELECT 
    COUNT(DISTINCT session_id) AS total_sessions,
    COUNT(DISTINCT user_id) AS total_users
  FROM Activity
  WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'
)
SELECT 
  IFNULL(ROUND(total_sessions * 1.0 / total_users, 2), 0.00) 
  AS average_sessions_per_user
FROM stats;