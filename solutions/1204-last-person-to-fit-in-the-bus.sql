SELECT q1.person_name
FROM Queue q1
JOIN (
    SELECT q2.turn, SUM(q3.weight) AS total_weight
    FROM Queue q2
    JOIN Queue q3 ON q3.turn <= q2.turn
    GROUP BY q2.turn
) t
ON q1.turn = t.turn
WHERE t.total_weight <= 1000
ORDER BY t.total_weight DESC
LIMIT 1;