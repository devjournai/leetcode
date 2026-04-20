WITH medals AS (
  SELECT contest_id, gold_medal AS user_id FROM Contests
  UNION ALL
  SELECT contest_id, silver_medal FROM Contests
  UNION ALL
  SELECT contest_id, bronze_medal FROM Contests
),
grp AS (
  SELECT
    user_id,
    contest_id - ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY contest_id
    ) AS g
  FROM medals
),
qualified AS (
  SELECT user_id
  FROM grp
  GROUP BY user_id, g
  HAVING COUNT(*) >= 3

  UNION

  SELECT gold_medal
  FROM Contests
  GROUP BY gold_medal
  HAVING COUNT(*) >= 3
)
SELECT
  u.name,
  u.mail
FROM Users u
JOIN qualified q
  ON u.user_id = q.user_id;