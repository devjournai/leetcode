WITH ReportedPosts AS (
    SELECT DISTINCT 
        post_id, 
        extra AS report_reason
    FROM Actions
    WHERE action_date = '2019-07-04' 
      AND action = 'report'
)
SELECT 
    report_reason, 
    COUNT(post_id) AS report_count
FROM ReportedPosts
GROUP BY report_reason;