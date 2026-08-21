/**
 * Maximum Erasure Value
 * Intuition: Maximum score is the maximum sum of a subarray of unique values. A sliding window plus a set shrinks from the left until the incoming value is unique, tracking the window sum.
 * Approach: 1. Expand `outerLoopIterator`; while `currentNumber` is in `uniqueElementsRegistry`, delete `nums[windowStartOffset]` and subtract from `currentWindowSummation`. 2. Add the new number and update `maximalScoreAchieved`. 3. Return that max.
 * Dry Run: nums = [4,2,4,5,6]
 * Window [4,2] sum 6; drop first 4 for second 4 → [2,4]; add 5,6 → [2,4,5,6] sum 17.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumUniqueSubarray = function (nums) {
  const uniqueElementsRegistry = new Set();
  let maximalScoreAchieved = 0;
  let currentWindowSummation = 0;
  let windowStartOffset = 0;
  let outerLoopIterator = 0;

  while (outerLoopIterator < nums.length) {
    const currentNumber = nums[outerLoopIterator];

    while (uniqueElementsRegistry.has(currentNumber)) {
      const numberToRemove = nums[windowStartOffset];
      uniqueElementsRegistry.delete(numberToRemove);
      currentWindowSummation -= numberToRemove;
      windowStartOffset++;
    }

    uniqueElementsRegistry.add(currentNumber);
    currentWindowSummation += currentNumber;
    maximalScoreAchieved = Math.max(
      maximalScoreAchieved,
      currentWindowSummation
    );

    outerLoopIterator++;
  }

  return maximalScoreAchieved;
};
