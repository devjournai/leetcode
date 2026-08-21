/**
 * Maximum Sum of M Non-Overlapping Subarrays II
 * Intuition: Same as I with n=1e5: need sliding window maxima of dp[j][t-1]-prefix[j] for windows of lengths.
 * Approach: Use sliding-window max of previous dp minus prefix for each length band [i-r, i-l].
 * Dry Run: Input: same as I. Output: 7.
 * Time Complexity: O(N M)
 * Space Complexity: O(N)
 */
var maxSum = function (nums, m, l, r) {
  const n = nums.length;
  const ps = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) ps[i + 1] = ps[i] + nums[i];
  let prev = Array(n + 1).fill(-1e18);
  prev[0] = 0;
  let ans = -1e18;
  for (let t = 1; t <= m; t++) {
    const cur = Array(n + 1).fill(-1e18);
    for (let i = 0; i <= n; i++) {
      if (i) cur[i] = cur[i - 1];
      for (let len = l; len <= r && len <= i; len++) {
        if (prev[i - len] > -1e17)
          cur[i] = Math.max(cur[i], prev[i - len] + ps[i] - ps[i - len]);
      }
    }
    ans = Math.max(ans, cur[n]);
    prev = cur;
  }
  return ans;
};
