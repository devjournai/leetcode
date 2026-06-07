CREATE PROCEDURE PivotProducts()
BEGIN
    SET SESSION group_concat_max_len = 1000000;

    SELECT GROUP_CONCAT(
        DISTINCT CONCAT(
            'SUM(CASE WHEN store = ''',
            store,
            ''' THEN price END) AS `',
            store,
            '`'
        )
    )
    INTO @cols
    FROM Products;

    SET @sql = CONCAT(
        'SELECT product_id, ',
        @cols,
        ' FROM Products
          GROUP BY product_id'
    );

    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END