SELECT e.employee_id
FROM Employees e
JOIN Employees m ON e.manager_id = m.employee_id
JOIN Employees sm ON m.manager_id = sm.employee_id
WHERE sm.manager_id = 1
  AND e.employee_id <> 1;