WITH RECURSIVE months AS (
  SELECT 1 AS m
  UNION ALL
  SELECT m + 1
  FROM months
  WHERE m < 12
)
SELECT
  m AS month,
  (
    SELECT COUNT(*)
    FROM Drivers d
    WHERE d.join_date < DATE(CONCAT('2020-', LPAD(m,2,'0'), '-01')) + INTERVAL 1 MONTH
  ) AS active_drivers,
  (
    SELECT COUNT(*)
    FROM AcceptedRides ar
    JOIN Rides r
      ON ar.ride_id = r.ride_id
    WHERE r.requested_at >= DATE(CONCAT('2020-', LPAD(m,2,'0'), '-01'))
      AND r.requested_at < DATE(CONCAT('2020-', LPAD(m,2,'0'), '-01')) + INTERVAL 1 MONTH
  ) AS accepted_rides
FROM months;