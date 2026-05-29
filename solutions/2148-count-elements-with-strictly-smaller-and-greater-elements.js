/**
 * Count Elements With Strictly Smaller And Greater Elements
 * Intuition: An element contributes to the count if and only if it is neither the minimum nor the maximum value present in the entire array.
 * Approach: 1. Handle edge cases where the array length is too small (<= 2) to have any such elements, returning 0. 2. Iterate through the array once to find the global minimum and maximum values. 3. Initialize a counter for eligible elements. 4. Iterate through the array a second time, checking each element against the previously found global minimum and maximum. 5. If an element is strictly greater than the global minimum and strictly less than the global maximum, increment the counter. 6. Return the final count.
 * Dry Run: nums = [1, 2, 3]
 *   1. nums.length (3) is not <= 2.
 *   2. minimumValue = 1, maximumValue = 1.
 *   3. First loop (initialIndex from 1 to 2):
 *      - initialIndex = 1, currentElement = 2. minimumValue remains 1. maximumValue becomes 2.
 *      - initialIndex = 2, currentElement = 3. minimumValue remains 1. maximumValue becomes 3.
 *      After loop: minimumValue = 1, maximumValue = 3.
 *   4. eligibleCount = 0.
 *   5. Second loop (secondIndex from 0 to 2):
 *      - secondIndex = 0, evaluatedElement = 1. (1 > 1 && 1 < 3) is false.
 *      - secondIndex = 1, evaluatedElement = 2. (2 > 1 && 2 < 3) is true. eligibleCount becomes 1.
 *      - secondIndex = 2, evaluatedElement = 3. (3 > 1 && 3 < 3) is false.
 *   6. Loop ends. Return eligibleCount = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countElements = function (nums) {
  if (nums.length <= 2) {
    return 0;
  }

  let minimumValue = nums[0];
  let maximumValue = nums[0];

  for (let initialIndex = 1; initialIndex < nums.length; initialIndex++) {
    let currentElement = nums[initialIndex];
    if (currentElement < minimumValue) {
      minimumValue = currentElement;
    }
    if (currentElement > maximumValue) {
      maximumValue = currentElement;
    }
  }

  let eligibleCount = 0;
  for (let secondIndex = 0; secondIndex < nums.length; secondIndex++) {
    let evaluatedElement = nums[secondIndex];
    if (evaluatedElement > minimumValue && evaluatedElement < maximumValue) {
      eligibleCount++;
    }
  }

  return eligibleCount;
};
