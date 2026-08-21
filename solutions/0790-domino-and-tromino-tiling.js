/**
 * Domino And Tromino Tiling
 * Intuition: Fully tiling a 2×n board with dominos and L-trominos satisfies dp[n] = 2*dp[n-1] + dp[n-3] (mod 10^9+7), with base 1, 2, 5 for n=1,2,3.
 * Approach: 1. If n is 1, 2, or 3, return those bases. 2. Fill `tilingCounts[1..3]`, then for `currentDimension` from 4 to n set `(2 * tilingCounts[n-1] + tilingCounts[n-3]) % moduloCeiling`. 3. Return `tilingCounts[n]`.
 * Dry Run: n = 4.
 *   - dp[1]=1, dp[2]=2, dp[3]=5. dp[4] = (2*5 + 1) % MOD = 11. Return 11.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var numTilings = function (n) {
  const moduloCeiling = 1_000_000_007;

  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  if (n === 3) {
    return 5;
  }

  const tilingCounts = new Array(n + 1);
  tilingCounts[1] = 1;
  tilingCounts[2] = 2;
  tilingCounts[3] = 5;

  let currentDimension = 4;
  while (currentDimension <= n) {
    const waysForPreviousThree = tilingCounts[currentDimension - 3];
    const waysForPreviousOne = tilingCounts[currentDimension - 1];
    let calculatedTotalWays =
      (2 * waysForPreviousOne + waysForPreviousThree) % moduloCeiling;
    tilingCounts[currentDimension] = calculatedTotalWays;
    currentDimension++;
  }

  return tilingCounts[n];
};
