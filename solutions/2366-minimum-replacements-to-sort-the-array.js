/**
 * Minimum Replacements To Sort The Array
 * Intuition: To minimize operations, we must ensure that each element (or its parts) is as large as possible while satisfying the non-decreasing order from left to right. This implies processing the array from right to left. For each element, we determine the maximum value it can take (after potential splits) such that it is less than or equal to the element immediately to its right (or its parts). If an element is larger than this allowed value, we must split it. To minimize splits, we should make the resulting parts as large and equal as possible. The smallest part after splitting becomes the new upper bound for the element to its left.
 * Approach: 1. Initialize `totalOperationsCount` to zero. 2. Initialize `previousMaximumAllowed` with the value of the last element in the input array. 3. Iterate through the array from the second to last element down to the first element. 4. In each iteration, if the `currentNumber` is greater than `previousMaximumAllowed`: a. Calculate `requiredSplits` as the ceiling of `currentNumber` divided by `previousMaximumAllowed`. b. Add `requiredSplits - 1` to `totalOperationsCount`. c. Update `previousMaximumAllowed` to the floor of `currentNumber` divided by `requiredSplits` (this is the new maximum allowed value for elements to the left). 5. Otherwise (if `currentNumber` is less than or equal to `previousMaximumAllowed`): a. No splits are needed, so update `previousMaximumAllowed` to `currentNumber` (this maintains the tightest possible upper bound for elements to the left). 6. After the loop, return `totalOperationsCount`.
 * Dry Run: nums = [3, 9, 3]
 *   Initialize: totalOperationsCount = 0, arrayLen = 3, previousMaximumAllowed = nums[2] = 3.
 *   Loop (currentElementIndex = 1):
 *     currentNumber = nums[1] = 9.
 *     Is 9 > 3? Yes.
 *     requiredSplits = Math.ceil(9 / 3) = 3.
 *     totalOperationsCount = 0 + (3 - 1) = 2.
 *     previousMaximumAllowed = Math.floor(9 / 3) = 3.
 *   Loop (currentElementIndex = 0):
 *     currentNumber = nums[0] = 3.
 *     Is 3 > 3? No.
 *     previousMaximumAllowed = 3.
 *   Loop ends.
 *   Return totalOperationsCount = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumReplacement = function (nums) {
  let totalOperationsCount = 0;
  let arrayLength = nums.length;
  let previousMaximumAllowed = nums[arrayLength - 1];

  for (
    let currentElementIndex = arrayLength - 2;
    currentElementIndex >= 0;
    currentElementIndex--
  ) {
    let currentNumber = nums[currentElementIndex];
    if (currentNumber > previousMaximumAllowed) {
      let requiredSplits = Math.ceil(currentNumber / previousMaximumAllowed);
      totalOperationsCount += requiredSplits - 1;
      previousMaximumAllowed = Math.floor(currentNumber / requiredSplits);
    } else {
      previousMaximumAllowed = currentNumber;
    }
  }

  return totalOperationsCount;
};
