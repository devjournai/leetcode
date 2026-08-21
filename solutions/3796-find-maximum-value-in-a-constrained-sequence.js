/**
 * Find Maximum Value in a Constrained Sequence
 * Intuition: Adjacent values differ by at most diff[i], a[0]=0, and some indices have upper caps. The tightest cap at each index is the min over all constrained positions propagated through the diff chain.
 * Approach: 1. Initialize dp[0]=0 and dp[idx]=maxVal for each restriction (others Infinity). 2. Forward: dp[i+1] = min(dp[i+1], dp[i]+diff[i]). 3. Backward: dp[i] = min(dp[i], dp[i+1]+diff[i]). 4. Return max(dp).
 * Dry Run: n = 8, restrictions = [[3,2]], diff = [3,5,2,4,2,3,1]. After both passes the peak is 12.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findMaxVal = function (n, restrictions, diff) {
  const dp = Array(n).fill(Infinity);
  dp[0] = 0;
  for (const [i, x] of restrictions) {
    dp[i] = x;
  }
  for (let i = 0; i < n - 1; i++) {
    dp[i + 1] = Math.min(dp[i + 1], dp[i] + diff[i]);
  }
  for (let i = n - 2; i >= 0; i--) {
    dp[i] = Math.min(dp[i], dp[i + 1] + diff[i]);
  }
  return Math.max(...dp);
};
