/**
 * Maximum Size Subarray Sum Equals K
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxSubArrayLen = function (inputArray, targetSum) {
  const prefixSumToFirstIndex = new Map();
  prefixSumToFirstIndex.set(0, -1);

  let runningAccumulator = 0;
  let greatestLength = 0;

  for (let loopIdentifier = 0; loopIdentifier < inputArray.length; loopIdentifier++) {
    runningAccumulator += inputArray[loopIdentifier];

    const requiredPreviousSum = runningAccumulator - targetSum;
    if (prefixSumToFirstIndex.has(requiredPreviousSum)) {
      const startIndex = prefixSumToFirstIndex.get(requiredPreviousSum);
      greatestLength = Math.max(greatestLength, loopIdentifier - startIndex);
    }

    if (!prefixSumToFirstIndex.has(runningAccumulator)) {
      prefixSumToFirstIndex.set(runningAccumulator, loopIdentifier);
    }
  }

  return greatestLength;
};