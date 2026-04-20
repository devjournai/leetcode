WITH login_data AS (
  SELECT DISTINCT id, login_date
  FROM Logins
),
ranked AS (
  SELECT
    id,
    login_date,
    DENSE_RANK() OVER (
      PARTITION BY id
      ORDER BY login_date
    ) AS rnk
  FROM login_data
),
grouped AS (
  SELECT
    id,
    login_date,
    DATE_SUB(login_date, INTERVAL rnk DAY) AS grp
  FROM ranked
)
SELECT
  g.id,
  a.name
FROM grouped g
JOIN Accounts a
  ON g.id = a.id
GROUP BY g.id, a.name, g.grp
HAVING COUNT(*) >= 5
ORDER BY g.id;