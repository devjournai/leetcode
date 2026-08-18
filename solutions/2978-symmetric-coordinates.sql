SELECT DISTINCT c1.x, c1.y
FROM Coordinates c1
WHERE
    (
        c1.x < c1.y
        AND EXISTS (
            SELECT 1
            FROM Coordinates c2
            WHERE c2.x = c1.y
              AND c2.y = c1.x
        )
    )
    OR
    (
        c1.x = c1.y
        AND (
            SELECT COUNT(*)
            FROM Coordinates c2
            WHERE c2.x = c1.x
              AND c2.y = c1.y
        ) > 1
    )
ORDER BY x, y;