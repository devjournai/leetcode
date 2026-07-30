SELECT
    f.flight_id,
    LEAST(f.capacity, COUNT(p.flight_id)) AS booked_cnt,
    GREATEST(COUNT(p.flight_id) - f.capacity, 0) AS waitlist_cnt
FROM Flights f
LEFT JOIN Passengers p
ON f.flight_id = p.flight_id
GROUP BY f.flight_id, f.capacity
ORDER BY f.flight_id;