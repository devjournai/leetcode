-- Find Students Who Improved
-- Intuition: Improvement means at least two exams in a subject and the latest score is strictly higher than the first score.
-- Approach: 1. Rank each (student_id, subject) by exam_date ascending and descending. 2. Take the score at rn_asc=1 and rn_desc=1. 3. Keep pairs with more than one exam and latest > first.
-- Time Complexity: O(N log N)
-- Space Complexity: O(N)

WITH
  RankedScores AS (
    SELECT
      student_id,
      subject,
      score,
      exam_date,
      RANK() OVER (
        PARTITION BY student_id, subject
        ORDER BY exam_date
      ) AS rn_asc,
      RANK() OVER (
        PARTITION BY student_id, subject
        ORDER BY exam_date DESC
      ) AS rn_desc
    FROM Scores
  ),
  FirstLastScores AS (
    SELECT
      student_id,
      subject,
      MIN(CASE WHEN rn_asc = 1 THEN score END) AS first_score,
      MAX(CASE WHEN rn_desc = 1 THEN score END) AS latest_score
    FROM RankedScores
    GROUP BY 1, 2
    HAVING COUNT(*) > 1
  )
SELECT
  student_id,
  subject,
  first_score,
  latest_score
FROM FirstLastScores
WHERE latest_score > first_score;
