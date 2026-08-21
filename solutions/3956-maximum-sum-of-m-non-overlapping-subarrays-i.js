/**
 * Maximum Sum of M Non-Overlapping Subarrays I
 * Intuition: Standard DP: dp[i][t] max using first i elements and t subarrays of length in [l,r]. n<=1000.
 * Approach: 1. Prefix sums. 2. dp[i+1][t] = max(dp[i][t], max over len in [l,r] dp[i-len][t-1]+sum).
 * Dry Run: Input: nums = [4,1,-5,2], m=2, l=1, r=3. Output: 7.
 * Time Complexity: O(N^2 M)
 * Space Complexity: O(N M)
 */
var maxSum = function (nums, m, l, r) {
  const n = nums.length;
  const ps = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) ps[i + 1] = ps[i] + nums[i];
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1e18));
  dp[0][0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let t = 0; t <= m; t++) dp[i][t] = dp[i - 1][t];
    for (let t = 1; t <= m; t++) {
      for (let len = l; len <= r && len <= i; len++) {
        if (dp[i - len][t - 1] > -1e17)
          dp[i][t] = Math.max(
            dp[i][t],
            dp[i - len][t - 1] + ps[i] - ps[i - len]
          );
      }
    }
  }
  let ans = -1e18;
  for (let t = 1; t <= m; t++) ans = Math.max(ans, dp[n][t]);
  return ans;
};
