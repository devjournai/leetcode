/**
 * Sum of Good Numbers
 * Intuition: nums[i] is good when it is strictly larger than the values k steps away, ignoring missing neighbors.
 * Approach: 1. For each index, check i-k and i+k when they exist. 2. Add nums[i] if both existing neighbors are smaller.
 * Dry Run: nums = [1,3,2,1,5], k = 2. Index 1 (3) > 2; index 4 (5) has only left neighbor 2. Good numbers 3+5=8.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var sumOfGoodNumbers = function (nums, k) {
  const n = nums.length;
  let total = 0;
  for (let index = 0; index < n; index++) {
    const leftOk = index - k < 0 || nums[index] > nums[index - k];
    const rightOk = index + k >= n || nums[index] > nums[index + k];
    if (leftOk && rightOk) {
      total += nums[index];
    }
  }
  return total;
};
