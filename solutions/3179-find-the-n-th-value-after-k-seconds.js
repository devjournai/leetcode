/**
 * Find The N-Th Value After K Seconds
 * Intuition: After each second the array becomes prefix sums of itself, so a[i] is C(n+k-1-i, k) times the initial 1s, equivalently C(n+k-1, n-1) for the last element.
 * Approach: 1. Simulate k rounds of prefix sums modulo 1e9+7 on an array of n ones. 2. Return the last element.
 * Dry Run:
 *   n = 4, k = 5. After prefix-sum simulation the last value is 56.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N)
 */
var valueAfterKSeconds = function (n, k) {
  const MOD = 1000000007;
  const prefixValues = new Array(n).fill(1);
  for (let second = 0; second < k; second++) {
    for (let index = 1; index < n; index++) {
      prefixValues[index] =
        (prefixValues[index] + prefixValues[index - 1]) % MOD;
    }
  }
  return prefixValues[n - 1];
};
