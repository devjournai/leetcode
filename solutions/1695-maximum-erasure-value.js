/**
 * Maximum Erasure Value
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
      currentWindowSummation,
    );

    outerLoopIterator++;
  }

  return maximalScoreAchieved;
};
