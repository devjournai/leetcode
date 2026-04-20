SELECT DISTINCT account_id
FROM (
  SELECT
    account_id,
    ip_address,
    logout,
    LEAD(ip_address) OVER (
      PARTITION BY account_id
      ORDER BY login
    ) AS next_ip,
    LEAD(login) OVER (
      PARTITION BY account_id
      ORDER BY login
    ) AS next_login
  FROM LogInfo
) t
WHERE next_login <= logout
  AND ip_address <> next_ip;