WITH RECURSIVE m AS (
  SELECT 1 AS month
  UNION ALL
  SELECT month + 1
  FROM m
  WHERE month < 12
)
SELECT
  m.month,
  ROUND(
    IFNULL(
      COUNT(DISTINCT ar.driver_id) /
      COUNT(DISTINCT d.driver_id) * 100,
      0
    ),
    2
  ) AS working_percentage
FROM m
LEFT JOIN Rides r
  ON YEAR(r.requested_at) = 2020
 AND MONTH(r.requested_at) = m.month
LEFT JOIN AcceptedRides ar
  ON r.ride_id = ar.ride_id
LEFT JOIN Drivers d
  ON d.join_date <= LAST_DAY(DATE(CONCAT('2020-', LPAD(m.month,2,'0'), '-01')))
GROUP BY m.month;