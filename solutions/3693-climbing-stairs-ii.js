/**
 * Climbing Stairs II
 * Intuition: From step i you may jump 1, 2, or 3 steps. The cost to land on j is costs[j] + (j-i)^2, so classic DP over the last three landings.
 * Approach: dp[0] = 0. For each step j = 1..n, dp[j] = min over i in [j-3, j-1] of dp[i] + costs[j-1] + (j-i)^2.
 * Dry Run: n = 4, costs = [1, 2, 3, 4]. Path 0→1→2→4 costs 13.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var climbStairs = function (n, costs) {
  n = costs.length;
  const minCost = Array(n + 1).fill(Infinity);
  minCost[0] = 0;

  for (let step = 1; step <= n; step++) {
    const landCost = costs[step - 1];
    for (let from = step - 3; from < step; from++) {
      if (from >= 0) {
        minCost[step] = Math.min(
          minCost[step],
          minCost[from] + landCost + (step - from) * (step - from)
        );
      }
    }
  }
  return minCost[n];
};
