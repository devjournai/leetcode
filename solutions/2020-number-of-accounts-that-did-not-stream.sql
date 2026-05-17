SELECT
    COUNT(DISTINCT s.account_id) AS accounts_count
FROM
    Subscriptions s
    LEFT JOIN Streams st ON s.account_id = st.account_id
WHERE
    2021 BETWEEN YEAR (s.start_date) AND YEAR  (s.end_date)
    AND (
        st.stream_date IS NULL
        OR YEAR (st.stream_date) <> 2021
    );