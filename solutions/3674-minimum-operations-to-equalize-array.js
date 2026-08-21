/**
 * Minimum Operations To Equalize Array
 * Intuition: AND-ing a subarray can only clear bits. If the array is already uniform, nothing is needed; otherwise one AND of the whole array equalizes every entry.
 * Approach: 1. Compare every element to nums[0]. 2. Return 1 on the first mismatch. 3. Return 0 if all values match.
 * Dry Run: nums = [1, 2] differs, one full-array AND yields [0, 0] → 1. nums = [5, 5, 5] already equal → 0.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  for (const value of nums) {
    if (value !== nums[0]) {
      return 1;
    }
  }
  return 0;
};
