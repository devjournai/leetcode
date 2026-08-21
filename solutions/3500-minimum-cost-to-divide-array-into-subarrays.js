/**
 * Minimum Cost to Divide Array Into Subarrays
 * Intuition: Splitting into contiguous subarrays has optimal substructure: the cost of finishing from i depends on the next cut j and the already-optimal cost from j+1. Prefix sums of nums and cost turn a candidate cut into O(1). The extra k * remaining cost-sum for every subarray starting at i factors out of the recurrence.
 * Approach: 1. Build prefixNums and prefixCost. 2. dp[n] = 0; dp[i] is min cost to partition nums[i..n-1]. 3. For i from n-1 down to 0, try every end j >= i: dp[i] = min of prefixNums[j+1] * (prefixCost[j+1]-prefixCost[i]) + k * (prefixCost[n]-prefixCost[i]) + dp[j+1]. 4. Return dp[0].
 * Dry Run: nums = [1,2], cost = [2,3], k = 1.
 *   - Suffix [1..1]: 3*(3) + 1*3 = 12.
 *   - Whole array as one piece: 3*5 + 1*5 = 20.
 *   - Cut after 0: 1*2 + 1*5 + 12 = 19. dp[0] = 19.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minimumCost = function (nums, cost, k) {
  const n = nums.length;
  const prefixNums = new Array(n + 1).fill(0);
  const prefixCost = new Array(n + 1).fill(0);
  const dp = new Array(n + 1).fill(Infinity);

  for (let i = 0; i < n; i++) {
    prefixNums[i + 1] = prefixNums[i] + nums[i];
    prefixCost[i + 1] = prefixCost[i] + cost[i];
  }

  dp[n] = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      const cutCost =
        prefixNums[j + 1] * (prefixCost[j + 1] - prefixCost[i]) +
        k * (prefixCost[n] - prefixCost[i]) +
        dp[j + 1];
      dp[i] = Math.min(dp[i], cutCost);
    }
  }

  return dp[0];
};
