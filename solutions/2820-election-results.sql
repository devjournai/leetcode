WITH scores AS (
    SELECT candidate, SUM(1.0 / cnt) AS score
    FROM Votes
    JOIN (
        SELECT voter, COUNT(*) AS cnt
        FROM Votes
        GROUP BY voter
    ) v USING (voter)
    WHERE candidate IS NOT NULL
    GROUP BY candidate
)
SELECT candidate
FROM scores
WHERE score = (SELECT MAX(score) FROM scores)
ORDER BY candidate;