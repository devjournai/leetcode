/**
 * Maximum Size Subarray Sum Equals K
 * Intuition: A subarray ending at i sums to k iff some earlier prefix equals runningSum - k. Storing the first index of each prefix maximizes length.
 * Approach: 1. Map prefix 0 → -1. 2. Accumulate runningAccumulator. 3. If runningAccumulator - k was seen, update greatestLength with i - that index. 4. Record the current prefix only if it is new; return greatestLength.
 * Dry Run: inputArray = [1, -1, 5, -2, 3], targetSum = 3.
 *   - Prefixes 1, 0, 5, 3, 6. At prefix 3, required 0 sits at -1 → length 4.
 *   - Return 4.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxSubArrayLen = function (inputArray, targetSum) {
  const prefixSumToFirstIndex = new Map();
  prefixSumToFirstIndex.set(0, -1);

  let runningAccumulator = 0;
  let greatestLength = 0;

  for (
    let loopIdentifier = 0;
    loopIdentifier < inputArray.length;
    loopIdentifier++
  ) {
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
