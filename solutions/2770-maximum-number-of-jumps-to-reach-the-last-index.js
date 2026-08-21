/**
 * Maximum Number of Jumps to Reach the Last Index
 * Intuition: A jump i->j is allowed when |nums[j]-nums[i]| <= target. dp[j] is the most jumps to reach j, or -1 if unreachable.
 * Approach: 1. dp[0]=0, others -1. 2. For each j, try every i<j with dp[i] reachable and |nums[j]-nums[i]| <= target; set dp[j] = max(dp[j], dp[i]+1). 3. Return dp[n-1].
 * Dry Run: nums=[1,3,6,4,1,2], target=2. dp becomes [0,1,1,2,3,3]. Last index reachable in 3 jumps.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var maximumJumps = function (nums, target) {
  const n = nums.length;
  const dp = new Array(n).fill(-1);

  dp[0] = 0;

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < j; i++) {
      if (dp[i] !== -1 && Math.abs(nums[j] - nums[i]) <= target) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
      }
    }
  }

  return dp[n - 1];
};
