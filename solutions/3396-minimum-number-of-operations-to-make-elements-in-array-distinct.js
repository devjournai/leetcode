/**
 * Minimum Number of Operations to Make Elements in Array Distinct
 * Intuition: Each operation drops the first 3 elements. The suffix after the last duplicate is already distinct, so walk from the right until a repeat appears; everything to its left must be removed.
 * Approach: 1. Scan from the end, inserting into a set. 2. On the first duplicate at index `i`, return `ceil((i + 1) / 3)`. 3. If the whole array is unique, return 0.
 * Dry Run: nums = [1,2,3,4,2,3,3]. From the right, 3, then 3 duplicates at i=5 → ceil(6/3)=2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)  // values ≤ 100
 */

var minimumOperations = function (nums) {
  const seenValues = new Set();
  for (let index = nums.length - 1; index >= 0; index--) {
    if (seenValues.has(nums[index])) {
      return Math.floor((index + 1 + 2) / 3);
    }
    seenValues.add(nums[index]);
  }
  return 0;
};
