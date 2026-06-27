SELECT
    a.symbol AS metal,
    b.symbol AS nonmetal
FROM
    Elements a
    CROSS JOIN Elements b
WHERE
    a.type = 'Metal'
    AND b.type = 'Nonmetal';