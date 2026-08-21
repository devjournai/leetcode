/**
 * Constructing Two Increasing Arrays
 * Intuition: 0s must become unused even positives and 1s unused odd positives, both sequences strictly increasing. The shared pool of positives means the last (largest) value is minimized by DP over how we interleave the two sequences.
 * Approach: 1. dp[i][j] = minimum possible largest number after placing the first i values of nums1 and first j of nums2. 2. The next number after prev with required parity num is prev+2 if prev already has that parity, else prev+1. 3. Transition from dp[i-1][j] or dp[i][j-1].
 * Dry Run:
 *   nums1 = [], nums2 = [1, 0, 1, 1]
 *   Place 1,2,3,5. Largest is 5.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var minLargest = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));
  dp[0][0] = 0;

  const nextNumber = (prev, num) => prev + (prev % 2 === num ? 2 : 1);

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i > 0) {
        dp[i][j] = Math.min(dp[i][j], nextNumber(dp[i - 1][j], nums1[i - 1]));
      }
      if (j > 0) {
        dp[i][j] = Math.min(dp[i][j], nextNumber(dp[i][j - 1], nums2[j - 1]));
      }
    }
  }

  return dp[m][n];
};
