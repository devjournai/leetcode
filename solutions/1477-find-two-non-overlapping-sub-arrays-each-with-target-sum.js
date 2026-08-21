/**
 * Find Two Non Overlapping Sub Arrays Each With Target Sum
 * Intuition: Prefix sums locate a subarray ending at i with sum target. bestLengthUntilIndex[i] is the shortest such subarray fully in [0..i], so a new subarray can pair with the best one ending before it.
 * Approach: 1. Map prefix sum -> last index (0 at -1). 2. Accumulate; if prefix-target exists, length = i - prev. 3. Update running min length and, if prev>=0, pair with bestLengthUntilIndex[prev]. 4. Store min-so-far at i; return -1 if never paired.
 * Dry Run: arr = [3,2,2,4,3], target = 3
 *   - prefix sums locate [3] at i=0 (len 1) and [3] at i=4 (len 1)
 *   - they do not overlap, combined length 2. Return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minSumOfLengths = function (arr, target) {
  const sumIndices = new Map();
  sumIndices.set(0, -1);

  let currentAggregate = 0;
  let overallMinimumLength = Infinity;
  let minimalLengthSoFar = Infinity;

  const bestLengthUntilIndex = new Array(arr.length).fill(Infinity);

  for (let arrayIndex = 0; arrayIndex < arr.length; arrayIndex++) {
    currentAggregate += arr[arrayIndex];

    const requiredPreviousSum = currentAggregate - target;
    if (sumIndices.has(requiredPreviousSum)) {
      const previousStartIndex = sumIndices.get(requiredPreviousSum);
      const currentSubarrayLength = arrayIndex - previousStartIndex;

      minimalLengthSoFar = Math.min(minimalLengthSoFar, currentSubarrayLength);

      if (
        previousStartIndex >= 0 &&
        bestLengthUntilIndex[previousStartIndex] !== Infinity
      ) {
        overallMinimumLength = Math.min(
          overallMinimumLength,
          currentSubarrayLength + bestLengthUntilIndex[previousStartIndex]
        );
      }
    }

    bestLengthUntilIndex[arrayIndex] = minimalLengthSoFar;
    sumIndices.set(currentAggregate, arrayIndex);
  }

  return overallMinimumLength === Infinity ? -1 : overallMinimumLength;
};
