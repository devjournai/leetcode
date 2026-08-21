/**
 * Maximum Profit from Valid Topological Order in DAG
 * Intuition: Profit is score[i] times 1-based position. DP over bitmasks of placed nodes, only placing a node when all predecessors are already in the mask.
 * Approach: 1. need[v] |= 1<<u for each edge. 2. dp[mask] = max profit for that placed set. 3. From each reachable mask, try unused i whose need is subset of mask.
 * Dry Run: n=2, edges=[[0,1]], score=[2,3]. Order 0 then 1: 2*1+3*2=8.
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(2^N)
 */
var maxProfit = function (n, edges, score) {
  const maxMask = 1 << n;
  const need = new Array(n).fill(0);
  const dp = new Array(maxMask).fill(-1);
  dp[0] = 0;

  for (const [u, v] of edges) {
    need[v] |= 1 << u;
  }

  for (let mask = 0; mask < maxMask; mask++) {
    if (dp[mask] === -1) continue;
    const pos = bitCount(mask) + 1;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) continue;
      if ((mask & need[i]) === need[i]) {
        const newMask = mask | (1 << i);
        dp[newMask] = Math.max(dp[newMask], dp[mask] + score[i] * pos);
      }
    }
  }

  return dp[maxMask - 1];
};

function bitCount(mask) {
  let count = 0;
  while (mask) {
    count += mask & 1;
    mask >>= 1;
  }
  return count;
}
