/**
 * Range Sum Of Sorted Subarray Sums
 * Intuition: Generate every contiguous subarray sum, sort them, then sum ranks left..right modulo 1e9+7.
 * Approach: 1. Nested prefix from each start to collect sums. 2. Sort. 3. Slice [left-1, right) and reduce mod 1e9+7.
 * Dry Run: nums = [1,2,3,4], n = 4, left = 1, right = 5.
 *   - Sorted sums start 1,2,3,3,4; first five sum to 13.
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
    0
  );

  return finalResultAccumulator;
};
