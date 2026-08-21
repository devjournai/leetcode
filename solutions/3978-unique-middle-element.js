/**
 * Unique Middle Element
 * Intuition: We take the element at the middle index of the array and count how many  *  it appears. If the count is 1, return true; otherwise return false.
 * Approach: 1. Follow Simulation. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [1,2,3]. Output: true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isMiddleElementUnique = function (nums) {
  let cnt = 0;
  for (const x of nums) {
    if (x === nums[nums.length >> 1]) {
      ++cnt;
    }
  }
  return cnt === 1;
};
