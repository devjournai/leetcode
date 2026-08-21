/**
 * Smallest Range I
 * Intuition: Each value can move by at most k. The min possible max-min is `max(0, (max-k) - (min+k))`.
 * Approach: 1. Scan for `currentMinimum` and `currentMaximum`. 2. Compare `currentMaximum - k` with `currentMinimum + k`. 3. If the former ≤ latter return 0; else return their difference.
 * Dry Run: nums = [1, 3, 6], k = 3.
 *   - min 1 max 6 → 3 vs 4, 3 ≤ 4 → 0.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var smallestRangeI = function (nums, k) {
  let currentMinimum = nums[0];
  let currentMaximum = nums[0];
  const arrayLength = nums.length;

  for (let indexValue = 1; indexValue < arrayLength; indexValue++) {
    if (nums[indexValue] < currentMinimum) {
      currentMinimum = nums[indexValue];
    }
    if (nums[indexValue] > currentMaximum) {
      currentMaximum = nums[indexValue];
    }
  }

  const potentialMinModified = currentMinimum + k;
  const potentialMaxModified = currentMaximum - k;

  if (potentialMaxModified <= potentialMinModified) {
    return 0;
  } else {
    const calculatedDifference = potentialMaxModified - potentialMinModified;
    return calculatedDifference;
  }
};
