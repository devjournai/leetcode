SELECT
    CONCAT (
        GROUP_CONCAT (
            CONCAT (
                IF (factor > 0, '+', ''),
                factor,
                IF (power = 0, '', 'X'),
                IF (power IN (0, 1), '', CONCAT ('^', power))
            )
            ORDER BY
                power DESC SEPARATOR ''
        ),
        '=0'
    ) AS equation
FROM
    Terms;