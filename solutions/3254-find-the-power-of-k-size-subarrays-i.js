/**
 * Find the Power of K-Size Subarrays I
 * Intuition: The power of a window is its maximum iff the window is a consecutive increasing sequence; otherwise it is -1. Track the start of the current consecutive run.
 * Approach: 1. Scan left to right. If nums[i] != nums[i-1] + 1, restart the run at i. 2. When i >= k-1, the window ending at i is valid if its run length is at least k; then the power is nums[i], else -1.
 * Dry Run: nums = [1, 2, 3, 4, 3, 2, 5], k = 3. Windows: [1,2,3]->3, [2,3,4]->4, [3,4,3]->-1, [4,3,2]->-1, [3,2,5]->-1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var resultsArray = function (nums, k) {
  const powers = [];
  let consecutiveStart = 0;

  for (let index = 0; index < nums.length; index++) {
    if (index > 0 && nums[index] !== nums[index - 1] + 1) {
      consecutiveStart = index;
    }
    if (index >= k - 1) {
      powers.push(index - consecutiveStart + 1 >= k ? nums[index] : -1);
    }
  }

  return powers;
};
