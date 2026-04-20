WITH RECURSIVE m AS (
  SELECT 1 AS month
  UNION ALL
  SELECT month + 1
  FROM m
  WHERE month < 12
)
SELECT
  m.month,
  ROUND(IFNULL(SUM(ar.ride_distance) / 3, 0), 2) AS average_ride_distance,
  ROUND(IFNULL(SUM(ar.ride_duration) / 3, 0), 2) AS average_ride_duration
FROM m
LEFT JOIN Rides r
  ON YEAR(r.requested_at) = 2020
 AND MONTH(r.requested_at) BETWEEN m.month AND m.month + 2
LEFT JOIN AcceptedRides ar
  ON r.ride_id = ar.ride_id
WHERE m.month <= 10
GROUP BY m.month;