/**
 * Range Sum Of Sorted Subarray Sums
 * Time Complexity: O(n^2 log n)
 * Space Complexity: O(n^2)
 */
var rangeSum = function (nums, n, left, right) {
  const modulusValue = 1000000007;
  const collectedSubarraySums = [];

  let outerLoopCounter = 0;
  while (outerLoopCounter < n) {
    let currentIterationSum = 0;
    for (
      let innerLoopCounter = outerLoopCounter;
      innerLoopCounter < n;
      innerLoopCounter++
    ) {
      currentIterationSum += nums[innerLoopCounter];
      collectedSubarraySums.push(currentIterationSum);
    }
    outerLoopCounter++;
  }

  collectedSubarraySums.sort((sumEntryA, sumEntryB) => sumEntryA - sumEntryB);

  const relevantSumRange = collectedSubarraySums.slice(left - 1, right);
  const finalResultAccumulator = relevantSumRange.reduce(
    (accumulatorValue, currentElement) => {
      return (accumulatorValue + currentElement) % modulusValue;
    },
    0,
  );

  return finalResultAccumulator;
};
