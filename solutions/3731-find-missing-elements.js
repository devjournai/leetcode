/**
 * Find Missing Elements
 * Intuition: The problem guarantees that the smallest and largest integers of the original range are present in the input array `nums`. This means we can determine the full range by simply finding the minimum and maximum values in `nums`. Once we have the full range, we can identify which numbers from this range are missing by checking against the given `nums`.
 * Approach:
 * 1. Find the minimum (`minVal`) and maximum (`maxVal`) integers in the input array `nums`. These define the boundaries of the complete range.
 * 2. Convert the `nums` array into a `Set` (e.g., `numSet`) for efficient O(1) average-time lookups.
 * 3. Initialize an empty array `missingElements` to store the results.
 * 4. Iterate from `minVal` to `maxVal` (inclusive). For each number `i` in this range:
 *    a. Check if `i` is present in `numSet`.
 *    b. If `numSet` does not contain `i`, it means `i` is a missing element. Add `i` to the `missingElements` array.
 * 5. Return the `missingElements` array. Since we iterate in ascending order, the resulting list will naturally be sorted.
 * Dry Run: nums = [1,4,2,5]
 * 1. minVal = 1, maxVal = 5.
 * 2. numSet = new Set([1,4,2,5]) = {1, 2, 4, 5}.
 * 3. missingElements = [].
 * 4. Iterate i from 1 to 5:
 *    - i = 1: numSet.has(1) is true.
 *    - i = 2: numSet.has(2) is true.
 *    - i = 3: numSet.has(3) is false. missingElements.push(3). missingElements = [3].
 *    - i = 4: numSet.has(4) is true.
 *    - i = 5: numSet.has(5) is true.
 * 5. Return [3].
 * Time Complexity: O(N + R)
 * Space Complexity: O(N + R)
 */
var findMissingElements = function (nums) {
  const minVal = Math.min(...nums);
  const maxVal = Math.max(...nums);
  const numSet = new Set(nums);
  const missingElements = [];

  for (let i = minVal; i <= maxVal; i++) {
    if (!numSet.has(i)) {
      missingElements.push(i);
    }
  }

  return missingElements;
};
