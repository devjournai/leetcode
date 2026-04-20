SELECT
  e.*,
  CASE
    WHEN e.operator = '<' AND l.value < r.value THEN 'true'
    WHEN e.operator = '>' AND l.value > r.value THEN 'true'
    WHEN e.operator = '=' AND l.value = r.value THEN 'true'
    ELSE 'false'
  END AS result
FROM Expressions e
JOIN Variables l
  ON e.left_operand = l.name
JOIN Variables r
  ON e.right_operand = r.name;