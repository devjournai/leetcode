/**
 * Count the Number of Inversions
 * Intuition: Build a permutation left to right. Inserting the next number into one of i positions among the first i-1 values adds between 0 and i-1 new inversions. DP counts ways to reach each inversion total, constrained at required prefixes.
 * Approach: 1. Map requirement end+1 -> inversion count (`endToCnt`). 2. `dp[i][j]` = ways to arrange first i numbers with j inversions. 3. dp[1][0] = 1. 4. For i=2..n, try adding `newInversions` in [0, i), transferring `dp[i-1][j]` to `j + newInversions` unless a requirement forbids that count. 5. Return `dp[n][endToCnt[n]]`.
 * Dry Run: n = 3, requirements = [[2,2],[0,0]]
 *   endToCnt[1]=0, endToCnt[3]=2
 *   dp[1][0]=1
 *   i=2: only j+new matching; prefix 0 has no extra req at i=2
 *   i=3: keep only inversionsAfterInsertion == 2
 *   Answer is 2 (permutations 1,2,0 and 2,0,1 in 0-index values)
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var numberOfPermutations = function (n, requirements) {
  const MOD = 1000000007;
  const MAX_INVERSIONS = 400;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(MAX_INVERSIONS + 1).fill(0)
  );
  const endToCnt = Array(n + 1).fill(-1);

  for (const [end, cnt] of requirements) {
    endToCnt[end + 1] = cnt;
  }

  dp[1][0] = 1;

  for (let i = 2; i <= n; i++) {
    for (let newInversions = 0; newInversions < i; newInversions++) {
      for (let j = 0; j + newInversions <= MAX_INVERSIONS; j++) {
        const inversionsAfterInsertion = j + newInversions;
        if (endToCnt[i] !== -1 && inversionsAfterInsertion !== endToCnt[i]) {
          continue;
        }
        dp[i][inversionsAfterInsertion] =
          (dp[i][inversionsAfterInsertion] + dp[i - 1][j]) % MOD;
      }
    }
  }

  return dp[n][endToCnt[n]];
};
