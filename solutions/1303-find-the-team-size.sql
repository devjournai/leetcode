SELECT 
  e.employee_id,
  COUNT(1) OVER (PARTITION BY e.team_id) AS total_members
FROM Employee e;