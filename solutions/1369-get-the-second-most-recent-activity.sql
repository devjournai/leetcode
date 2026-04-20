WITH activity_ranked AS (
  SELECT
    ua.username,
    ua.activity,
    ua.startdate,
    ua.enddate,
    RANK() OVER (
      PARTITION BY ua.username
      ORDER BY ua.startdate DESC
    ) AS rnk,
    COUNT(*) OVER (
      PARTITION BY ua.username
    ) AS total_records
  FROM UserActivity ua
)
SELECT
  username,
  activity,
  startdate,
  enddate
FROM activity_ranked
WHERE rnk = 2 OR total_records = 1;