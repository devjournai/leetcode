WITH UserClassification AS (
    -- Step 1: Calculate total amount per user per day and classify their platform
    SELECT 
        spend_date,
        user_id,
        SUM(amount) AS daily_amount,
        CASE 
            WHEN MIN(platform) = MAX(platform) THEN MIN(platform)
            ELSE 'both'
        END AS platform_type
    FROM Spending
    GROUP BY spend_date, user_id
)
-- Step 2 & 3: Create the Date-Platform spine and join the user data
SELECT 
    Dates.spend_date,
    Platforms.platform,
    IFNULL(SUM(UC.daily_amount), 0) AS total_amount,
    COUNT(UC.user_id) AS total_users
FROM (SELECT DISTINCT spend_date FROM Spending) AS Dates
CROSS JOIN (
    SELECT 'desktop' AS platform 
    UNION ALL SELECT 'mobile' 
    UNION ALL SELECT 'both'
) AS Platforms
LEFT JOIN UserClassification AS UC 
    ON Dates.spend_date = UC.spend_date 
    AND Platforms.platform = UC.platform_type
GROUP BY 
    Dates.spend_date, 
    Platforms.platform;