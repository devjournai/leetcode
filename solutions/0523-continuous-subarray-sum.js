/**
 * Continuous Subarray Sum
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var checkSubarraySum = function (numberArray, targetValue) {
  const remainderIndices = new Map();
  remainderIndices.set(0, -1);

  let currentPrefixSum = 0;
  let arrayIteration = 0;

  while (arrayIteration < numberArray.length) {
    currentPrefixSum += numberArray[arrayIteration];

    if (targetValue !== 0) {
      currentPrefixSum = currentPrefixSum % targetValue;
    }

    if (remainderIndices.has(currentPrefixSum)) {
      let existingIndex = remainderIndices.get(currentPrefixSum);
      if (arrayIteration - existingIndex >= 2) {
        return true;
      }
    } else {
      remainderIndices.set(currentPrefixSum, arrayIteration);
    }

    arrayIteration++;
  }

  return false;
};
