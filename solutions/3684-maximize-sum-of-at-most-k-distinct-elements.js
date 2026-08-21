/**
 * Maximize Sum Of At Most K Distinct Elements
 * Intuition: Distinct values should be the k largest unique numbers, returned in strictly descending order.
 * Approach: 1. Sort nums. 2. Walk from the end, skipping duplicates. 3. Collect up to k values.
 * Dry Run: nums = [84, 93, 100, 77, 90], k = 3 → [100, 93, 90].
 * Time Complexity: O(N log N)
 * Space Complexity: O(K)
 */
var maxKDistinct = function (nums, k) {
  nums.sort((left, right) => left - right);
  const chosen = [];
  for (let index = nums.length - 1; index >= 0; index--) {
    if (index + 1 < nums.length && nums[index] === nums[index + 1]) {
      continue;
    }
    chosen.push(nums[index]);
    k--;
    if (k === 0) {
      break;
    }
  }
  return chosen;
};
