/**
 * The Number Of Ways To Make The Sum
 * Intuition: Unlimited coins of 1, 2, and 6, plus at most two coins of 4. DP ways with {1,2,6} then add cases using one or two 4s.
 * Approach: 1. dp[x] = ways to make x with 1,2,6 unlimited (order-insensitive coin change). 2. Answer = dp[n] + dp[n-4] (if n>=4) + dp[n-8] (if n>=8).
 * Dry Run:
 *   n = 5. Without 4s: 5=2+2+1 etc. Plus using one 4: leftover 1. Standard leetcode sample n=4 -> 4 ways.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var numberOfWays = function (n) {
  const MOD = 1000000007;
  const waysWithOneTwoSix = new Array(n + 1).fill(0);
  waysWithOneTwoSix[0] = 1;
  for (const coinValue of [1, 2, 6]) {
    for (let amount = coinValue; amount <= n; amount++) {
      waysWithOneTwoSix[amount] =
        (waysWithOneTwoSix[amount] + waysWithOneTwoSix[amount - coinValue]) %
        MOD;
    }
  }
  let totalWays = waysWithOneTwoSix[n];
  if (n >= 4) {
    totalWays = (totalWays + waysWithOneTwoSix[n - 4]) % MOD;
  }
  if (n >= 8) {
    totalWays = (totalWays + waysWithOneTwoSix[n - 8]) % MOD;
  }
  return totalWays;
};
