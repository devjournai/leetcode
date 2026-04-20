SELECT
  bucket AS bin,
  COUNT(*) AS total
FROM (
  SELECT
    CASE
      WHEN duration <= 300 THEN '[0-5>'
      WHEN duration <= 600 THEN '[5-10>'
      WHEN duration <= 900 THEN '[10-15>'
      ELSE '15 or more'
    END AS bucket
  FROM Sessions
) t
GROUP BY bucket;