/**
 * Find All Possible Stable Binary Arrays II
 * Intuition: Count arrays by how many 0s/1s used and which bit they end with, subtracting the overcount of runs longer than limit.
 * Approach: dp[i][j][0/1] = ways with i zeros, j ones ending in 0 or 1. Recur as (previous same-end + previous other-end), then if i > limit subtract dp[i-limit-1][j][1] (a run of limit+1 zeros); analogously for ones. Seed prefixes of only 0s or only 1s up to limit.
 * Dry Run: zero=1, one=1, limit=2 -> dp[1][1] = 2 (01 and 10).
 * Time Complexity: O(zero * one)
 * Space Complexity: O(one * one)
 */
var numberOfStableArrays = function (zero, one, limit) {
  const MOD = 1000000007;

  let dp = Array.from({ length: zero + 1 }, () =>
    Array.from({ length: one + 1 }, () => [0, 0])
  );

  for (let i = 1; i <= Math.min(zero, limit); i++) {
    dp[i][0][0] = 1;
  }
  for (let j = 1; j <= Math.min(one, limit); j++) {
    dp[0][j][1] = 1;
  }

  for (let i = 1; i <= zero; i++) {
    for (let j = 1; j <= one; j++) {
      dp[i][j][0] = (dp[i - 1][j][0] + dp[i - 1][j][1]) % MOD;
      if (i > limit) {
        dp[i][j][0] = (dp[i][j][0] - dp[i - limit - 1][j][1] + MOD) % MOD;
      }

      dp[i][j][1] = (dp[i][j - 1][0] + dp[i][j - 1][1]) % MOD;
      if (j > limit) {
        dp[i][j][1] = (dp[i][j][1] - dp[i][j - limit - 1][0] + MOD) % MOD;
      }
    }
  }

  return (dp[zero][one][0] + dp[zero][one][1]) % MOD;
};
