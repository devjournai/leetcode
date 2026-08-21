/**
 * Minimum Operations to Make Array Non Decreasing
 * Intuition: We can traverse the array from left to right and calculate the difference between each pair of adjacent elements. If the current element is smaller than the previous one, we need to increase the current element so that it is at least equal to the previous element. The amount to increase is the difference between the previous element and the current element.
 * Approach: 1. Follow Greedy. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [3,3,2,1]. Output: 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  let ans = 0;
  for (let i = 1; i < nums.length; ++i) {
    ans += Math.max(nums[i - 1] - nums[i], 0);
  }
  return ans;
};
