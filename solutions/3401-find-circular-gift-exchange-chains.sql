-- Find Circular Gift Exchange Chains
-- Intuition: Each SecretSanta row is a directed gift edge. A circular chain is a cycle; walking from every giver until we return to the start enumerates the cycle that contains that start.
-- Approach: 1. Recursively follow receiver_id -> giver_id, carrying start_id, and stop when giver_id returns to start_id so cycles are not infinite. 2. For each start_id, count hops and sum gift_value. 3. DISTINCT on (chain_length, total_gift_value) collapses the same cycle started at different nodes. 4. RANK by longer chains, then larger total value.
-- Time Complexity: O(N^2)
-- Space Complexity: O(N^2)

WITH RECURSIVE
  Chains AS (
    SELECT
      *,
      giver_id AS start_id
    FROM SecretSanta
    UNION ALL
    SELECT
      SecretSanta.*,
      Chains.start_id
    FROM SecretSanta
    INNER JOIN Chains
      ON (
        SecretSanta.giver_id = Chains.receiver_id
        AND SecretSanta.giver_id != Chains.start_id
      )
  ),
  ChainSummary AS (
    SELECT
      start_id,
      COUNT(*) AS chain_length,
      SUM(gift_value) AS total_gift_value
    FROM Chains
    GROUP BY 1
  ),
  UniqueChains AS (
    SELECT DISTINCT
      chain_length,
      total_gift_value
    FROM ChainSummary
  )
SELECT
  RANK() OVER (
    ORDER BY chain_length DESC, total_gift_value DESC
  ) AS chain_id,
  chain_length,
  total_gift_value
FROM UniqueChains;
