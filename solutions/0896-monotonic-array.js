/**
 * Monotonic Array
 * Intuition: The array is monotonic if it never decreases or never increases. Track both flags in one pass.
 * Approach: 1. `checkIncreasing` and `checkDecreasing` start true. 2. Adjacent descent clears increasing; ascent clears decreasing. 3. Return either flag.
 * Dry Run: nums = [1, 2, 2, 3].
 *   - No descent, some ascents → increasing true, decreasing false → true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isMonotonic = function (nums) {
  let checkIncreasing = true;
  let checkDecreasing = true;

  for (
    let currentPosition = 0;
    currentPosition < nums.length - 1;
    currentPosition++
  ) {
    if (nums[currentPosition] > nums[currentPosition + 1]) {
      checkIncreasing = false;
    }
    if (nums[currentPosition] < nums[currentPosition + 1]) {
      checkDecreasing = false;
    }
  }

  return checkIncreasing || checkDecreasing;
};
