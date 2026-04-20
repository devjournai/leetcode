SELECT
  user_id,
  MAX(
    DATEDIFF(
      LEAD(visit_date, 1, '2021-01-01') OVER (
        PARTITION BY user_id
        ORDER BY visit_date
      ),
      visit_date
    )
  ) AS biggest_window
FROM userVisits
GROUP BY user_id;