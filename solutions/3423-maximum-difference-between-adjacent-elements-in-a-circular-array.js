/**
 * Maximum Difference Between Adjacent Elements in a Circular Array
 * Intuition: Adjacent pairs are nums[i], nums[i+1] plus the wrap-around nums[n-1], nums[0]. The answer is the max absolute gap among those n pairs.
 * Approach: 1. Start with |first - last|. 2. Scan consecutive pairs and keep the max abs difference.
 * Dry Run: nums = [1,2,4]. Gaps 1,2, and |4-1|=3 → 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var maxAdjacentDistance = function (nums) {
  let maximumDifference = Math.abs(nums[0] - nums[nums.length - 1]);
  for (let index = 0; index + 1 < nums.length; index++) {
    maximumDifference = Math.max(
      maximumDifference,
      Math.abs(nums[index] - nums[index + 1])
    );
  }
  return maximumDifference;
};
