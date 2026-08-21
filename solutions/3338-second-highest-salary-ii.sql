-- Second Highest Salary II
-- Intuition: Within each department, rank salaries descending with ties sharing a rank, then keep employees whose rank is exactly 2.
-- Approach: DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC). Filter rank = 2 and order by emp_id.
-- Dry Run: Engineering salaries 100, 90, 90, 80 -> ranks 1, 2, 2, 3. Both 90 employees are returned.
-- Time Complexity: O(N log N)
-- Space Complexity: O(N)

WITH
  RankedEmployees AS (
    SELECT *, DENSE_RANK() OVER(
      PARTITION BY dept
      ORDER BY salary DESC
    ) AS `rank`
    FROM Employees
  )
SELECT emp_id, dept
FROM RankedEmployees
WHERE `rank` = 2
ORDER BY 1;
