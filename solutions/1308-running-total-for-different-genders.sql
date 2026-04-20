SELECT 
  s.gender,
  s.day,
  SUM(s.score_points) OVER (
    PARTITION BY s.gender 
    ORDER BY s.day
  ) AS running_total
FROM Scores s
ORDER BY s.gender, s.day;