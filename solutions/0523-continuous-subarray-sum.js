/**
 * Continuous Subarray Sum
 * Intuition: Equal prefix remainders modulo k mean the subarray between them is a multiple of k. Store the first index of each remainder and require length ≥ 2.
 * Approach: 1. Map remainder 0 → index -1. 2. Accumulate `currentPrefixSum`; if `targetValue !== 0`, take `% targetValue`. 3. If the remainder was seen at `existingIndex` and `i - existingIndex >= 2`, return true; else record it the first time only.
 * Dry Run: nums = [23, 2, 4, 6, 7], k = 6.
 *   - Prefix mods: 5, 1, 5. Remainder 5 reappears at index 2 with gap 2. Return true.
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
