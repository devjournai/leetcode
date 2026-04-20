SELECT 
    first_login AS login_date, 
    COUNT(user_id) AS user_count
FROM (
    SELECT user_id, MIN(activity_date) AS first_login
    FROM Traffic
    WHERE activity = 'login'
    GROUP BY user_id
) AS FirstLogins
WHERE DATEDIFF('2019-06-30', first_login) <= 90
GROUP BY 1;