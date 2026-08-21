/**
 * Binary Search
 * Intuition: On a sorted array, compare the midpoint and discard the half that cannot contain `target`.
 * Approach: 1. `lowerBound=0`, `upperBound=n-1`. 2. Loop while upper>=lower: mid floor average; equal → return index; target smaller → shrink upper; larger → raise lower. 3. Return -1.
 * Dry Run: nums=[-1,0,3,5,9,12], target=9. mid 2 val 3 → lower=3; mid 4 val 9 → return 4.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var search = function (nums, target) {
  let lowerBound = 0;
  let upperBound = nums.length - 1;

  for (; upperBound >= lowerBound;) {
    const currentMidIndex = Math.floor((lowerBound + upperBound) / 2);
    const valueAtMid = nums[currentMidIndex];

    if (target === valueAtMid) {
      return currentMidIndex;
    }

    if (target < valueAtMid) {
      upperBound = currentMidIndex - 1;
    }
    if (target > valueAtMid) {
      lowerBound = currentMidIndex + 1;
    }
  }

  return -1;
};
