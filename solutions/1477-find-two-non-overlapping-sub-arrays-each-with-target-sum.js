/**
 * Find Two Non Overlapping Sub Arrays Each With Target Sum
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
          currentSubarrayLength + bestLengthUntilIndex[previousStartIndex],
        );
      }
    }

    bestLengthUntilIndex[arrayIndex] = minimalLengthSoFar;
    sumIndices.set(currentAggregate, arrayIndex);
  }

  return overallMinimumLength === Infinity ? -1 : overallMinimumLength;
};
