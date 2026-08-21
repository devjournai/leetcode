/**
 * K Inverse Pairs Array
 * Intuition: `dpCounts[j]` is the number of length-`n` permutations with `j` inversions. Adding a new largest element can create 0..n-1 new inversions. The 1-D recurrence uses prefix-style `dp[j] = prev[j] + dp[j-1] - prev[j-n]` (mod 1e9+7).
 * Approach: 1. `dpCounts` size `k+1`, `dpCounts[0]=1`. 2. For `elementsAdded` 1..n, snapshot `previousCounts`, reset `dpCounts[0]=1`. 3. For `targetInversions` 1..k, `currentCalculation = (previousCounts[j] + dpCounts[j-1]) % mod`; if `j >= elementsAdded` subtract `previousCounts[j - elementsAdded]`. 4. Return `dpCounts[k]`.
 * Dry Run: n=3, k=1.
 *   - After 1 elem: [1,0,...]. After 2: ways for 0 and 1 inversions. After 3: dp[1]=2 (perms 132 and 213). Return 2.
 * Time Complexity: O(n * k)
 * Space Complexity: O(k)
 */
var kInversePairs = function (n, k) {
  const modulusValue = 1e9 + 7;
  const dpCounts = new Array(k + 1).fill(0);

  dpCounts[0] = 1;

  for (let elementsAdded = 1; elementsAdded <= n; elementsAdded++) {
    const previousCounts = dpCounts.slice();
    dpCounts[0] = 1;

    for (let targetInversions = 1; targetInversions <= k; targetInversions++) {
      let currentCalculation =
        (previousCounts[targetInversions] + dpCounts[targetInversions - 1]) %
        modulusValue;

      if (targetInversions >= elementsAdded) {
        currentCalculation =
          (currentCalculation -
            previousCounts[targetInversions - elementsAdded] +
            modulusValue) %
          modulusValue;
      }
      dpCounts[targetInversions] = currentCalculation;
    }
  }

  return dpCounts[k];
};
