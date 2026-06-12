SELECT
    user_id,
    gender
FROM
    Genders
ORDER BY
    ROW_NUMBER() OVER (
        PARTITION BY
            gender
        ORDER BY
            user_id
    ),
    gender DESC;