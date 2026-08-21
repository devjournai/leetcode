/**
 * Find the Number of K-Even Arrays
 * Intuition: A k-even array of length n over [1, m] has exactly k adjacent even-even pairs. Only parity matters: evenCount = floor(m/2), oddCount = m - evenCount.
 * Approach: dp[j][0/1] = arrays so far with j even-pairs ending even/odd. Append even: pairs increase if previous ended even. Append odd: pairs stay the same. Roll n-1 times from length 1.
 * Dry Run: n=3, m=4, k=1. even=2, odd=2. Length-1: [2 even, 2 odd] with 0 pairs. After two more placements, sum dp[1] is the answer.
 * Time Complexity: O(N * K)
 * Space Complexity: O(K)
 */

var countOfArrays = function (n, m, k) {
  const MOD = 1000000007;
  const evenCount = Math.floor(m / 2);
  const oddCount = m - evenCount;
  let dp = Array.from({ length: k + 1 }, () => [0, 0]);
  dp[0][0] = evenCount;
  dp[0][1] = oddCount;

  for (let length = 2; length <= n; length++) {
    const nextDp = Array.from({ length: k + 1 }, () => [0, 0]);
    for (let pairs = 0; pairs <= k; pairs++) {
      const evenFromEven = pairs > 0 ? dp[pairs - 1][0] : 0;
      nextDp[pairs][0] =
        (evenFromEven * evenCount + dp[pairs][1] * evenCount) % MOD;
      nextDp[pairs][1] = ((dp[pairs][0] + dp[pairs][1]) * oddCount) % MOD;
    }
    dp = nextDp;
  }

  return (dp[k][0] + dp[k][1]) % MOD;
};
