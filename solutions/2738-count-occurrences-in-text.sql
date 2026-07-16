SELECT
    'bull' AS word,
    COUNT(*) AS count
FROM
    Files
WHERE
    content LIKE '% bull %'
UNION ALL
SELECT
    'bear',
    COUNT(*)
FROM
    Files
WHERE
    content LIKE '% bear %';