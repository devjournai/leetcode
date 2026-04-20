WITH combined_data AS (
    SELECT 
        id,
        country,
        amount,
        'approved' AS state,
        DATE_FORMAT(trans_date, '%Y-%m') AS month
    FROM Transactions
    WHERE state = 'approved'

    UNION ALL

    SELECT 
        t.id,
        t.country,
        t.amount,
        'chargeback' AS state,
        DATE_FORMAT(c.trans_date, '%Y-%m') AS month
    FROM Chargebacks c
    JOIN Transactions t
        ON c.trans_id = t.id
)

SELECT
    month,
    country,
    
    COUNT(CASE WHEN state = 'approved' THEN 1 END) AS approved_count,
    SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_amount,
    
    COUNT(CASE WHEN state = 'chargeback' THEN 1 END) AS chargeback_count,
    SUM(CASE WHEN state = 'chargeback' THEN amount ELSE 0 END) AS chargeback_amount

FROM combined_data
GROUP BY month, country;