WITH EventStats AS (
    SELECT 
        business_id,
        event_type,
        occurences,
        AVG(occurences) OVER (PARTITION BY event_type) AS avg_occurences
    FROM Events
)
SELECT business_id
FROM EventStats
WHERE occurences > avg_occurences
GROUP BY business_id
HAVING COUNT(event_type) > 1;