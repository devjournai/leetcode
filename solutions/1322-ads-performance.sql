SELECT 
  a.ad_id,
  ROUND(
    IFNULL(
      SUM(CASE WHEN a.action = 'Clicked' THEN 1 ELSE 0 END) /
      SUM(CASE WHEN a.action IN ('Clicked', 'Viewed') THEN 1 ELSE 0 END) * 100,
      0
    ),
    2
  ) AS ctr_percentage
FROM Ads a
GROUP BY a.ad_id
ORDER BY ctr_percentage DESC, a.ad_id;