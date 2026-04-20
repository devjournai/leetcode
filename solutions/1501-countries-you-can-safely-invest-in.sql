SELECT
  c.name AS country
FROM Person p
JOIN Country c
  ON LEFT(p.phone_number, 3) = c.country_code
JOIN Calls cl
  ON p.id = cl.caller_id OR p.id = cl.callee_id
GROUP BY c.name
HAVING AVG(cl.duration) > (SELECT AVG(duration) FROM Calls);