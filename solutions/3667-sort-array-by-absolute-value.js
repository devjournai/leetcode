/**
 * Sort Array By Absolute Value
 * Intuition: The required order is ordinary sort keyed on |x|; equal absolute values may appear in any relative order.
 * Approach: 1. Copy is unnecessary; sort in place. 2. Comparator returns Math.abs(a) - Math.abs(b). 3. Return the sorted array.
 * Dry Run: nums = [3, -1, -4, 1, 5] sorts by 3,1,4,1,5 → one valid result is [-1, 1, 3, -4, 5].
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var sortByAbsoluteValue = function (nums) {
  return nums.sort((left, right) => Math.abs(left) - Math.abs(right));
};
