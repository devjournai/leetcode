WITH exam_ranks AS (
  SELECT
    e.student_id,
    RANK() OVER (
      PARTITION BY e.exam_id 
      ORDER BY e.score ASC
    ) AS low_rank,
    RANK() OVER (
      PARTITION BY e.exam_id 
      ORDER BY e.score DESC
    ) AS high_rank
  FROM Exam e
)
SELECT s.*
FROM Student s
WHERE s.student_id IN (
  SELECT student_id
  FROM exam_ranks
  GROUP BY student_id
  HAVING MIN(low_rank) > 1 
     AND MIN(high_rank) > 1
)
ORDER BY s.student_id;