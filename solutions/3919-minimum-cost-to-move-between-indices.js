/**
 * Minimum Cost to Move Between Indices
 * Intuition: <!-- tabs:start -->: solve according to the problem constraints.
 * Approach: 1. Follow <!-- tabs:start -->. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [-5,-2,3], queries = [[0,2],[2,0],[1,2]]. Output: [6,2,5].
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minCost = function (nums, queries) {
  const n = nums.length;
  const s1 = new Array(n).fill(0);
  const s2 = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    const c1 =
      i > 1 && nums[i - 1] - nums[i - 2] <= nums[i] - nums[i - 1]
        ? nums[i] - nums[i - 1]
        : 1;
    const c2 =
      i < n - 1 && nums[i] - nums[i - 1] > nums[i + 1] - nums[i]
        ? nums[i] - nums[i - 1]
        : 1;
    s1[i] = s1[i - 1] + c1;
    s2[i] = s2[i - 1] + c2;
  }
  const m = queries.length;
  const ans = new Array(m);
  for (let i = 0; i < m; i++) {
    const l = queries[i][0];
    const r = queries[i][1];
    ans[i] = l < r ? s1[r] - s1[l] : s2[l] - s2[r];
  }
  return ans;
};
