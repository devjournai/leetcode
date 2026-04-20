/**
 * Constrained Subsequence Sum
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var constrainedSubsetSum = function (numericArray, windowConstraint) {
  const dynamicProgression = [...numericArray];
  const indicesDeque = [];
  let maximalSubsequenceSum = numericArray[0];

  for (
    let currentIterationIndex = 0;
    currentIterationIndex < numericArray.length;
    currentIterationIndex++
  ) {
    while (
      indicesDeque.length > 0 &&
      indicesDeque[0] < currentIterationIndex - windowConstraint
    ) {
      indicesDeque.shift();
    }

    if (indicesDeque.length > 0) {
      dynamicProgression[currentIterationIndex] = Math.max(
        dynamicProgression[currentIterationIndex],
        dynamicProgression[indicesDeque[0]] +
          numericArray[currentIterationIndex],
      );
    }

    while (
      indicesDeque.length > 0 &&
      dynamicProgression[indicesDeque[indicesDeque.length - 1]] <=
        dynamicProgression[currentIterationIndex]
    ) {
      indicesDeque.pop();
    }

    indicesDeque.push(currentIterationIndex);
    maximalSubsequenceSum = Math.max(
      maximalSubsequenceSum,
      dynamicProgression[currentIterationIndex],
    );
  }

  return maximalSubsequenceSum;
};
