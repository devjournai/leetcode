SELECT *
FROM Stadium s
WHERE s.people >= 100
  AND (
        (s.id - 1 IN (SELECT id FROM Stadium WHERE people >= 100)
         AND s.id - 2 IN (SELECT id FROM Stadium WHERE people >= 100))
     OR (s.id + 1 IN (SELECT id FROM Stadium WHERE people >= 100)
         AND s.id + 2 IN (SELECT id FROM Stadium WHERE people >= 100))
     OR (s.id - 1 IN (SELECT id FROM Stadium WHERE people >= 100)
         AND s.id + 1 IN (SELECT id FROM Stadium WHERE people >= 100))
      )
ORDER BY s.visit_date;
