/**
 * Build Array From Permutation
 * Intuition: ans[i] must be nums[nums[i]]. Map each index through the permutation twice.
 * Approach: 1. `nums.map((currentNumValue) => nums[currentNumValue])`.
 * Dry Run: nums=[0,2,1]. ans = [nums[0], nums[2], nums[1]] = [0,1,2].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var buildArray = function (nums) {
  return nums.map((currentNumValue) => nums[currentNumValue]);
};
