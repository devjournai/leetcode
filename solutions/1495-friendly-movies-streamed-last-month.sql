SELECT DISTINCT
  c.title
FROM Content c
JOIN TVProgram t
  ON c.content_id = t.content_id
WHERE
  c.kids_content = 'Y'
  AND c.content_type = 'Movies'
  AND t.program_date >= '2020-06-01'
  AND t.program_date < '2020-07-01';