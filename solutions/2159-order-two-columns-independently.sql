SELECT
    f.first_col,
    s.second_col
FROM
    (
        SELECT
            first_col,
            ROW_NUMBER() OVER (
                ORDER BY
                    first_col
            ) AS rn
        FROM
            Data
    ) f
    JOIN (
        SELECT
            second_col,
            ROW_NUMBER() OVER (
                ORDER BY
                    second_col DESC
            ) AS rn
        FROM
            Data
    ) s ON f.rn = s.rn;