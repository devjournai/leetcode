/**
 * Palindrome Removal
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var minimumMoves = function (arr) {
  const arrayLength = arr.length;
  const minMovesMatrix = new Array(arrayLength)
    .fill(0)
    .map(() => new Array(arrayLength).fill(Infinity));

  for (let diagonalIndex = 0; diagonalIndex < arrayLength; diagonalIndex++) {
    minMovesMatrix[diagonalIndex][diagonalIndex] = 1;
  }

  for (
    let currentWindowLength = 2;
    currentWindowLength <= arrayLength;
    currentWindowLength++
  ) {
    for (
      let startWindowIndex = 0;
      startWindowIndex <= arrayLength - currentWindowLength;
      startWindowIndex++
    ) {
      const endWindowIndex = startWindowIndex + currentWindowLength - 1;

      if (arr[startWindowIndex] === arr[endWindowIndex]) {
        if (currentWindowLength === 2) {
          minMovesMatrix[startWindowIndex][endWindowIndex] = 1;
        } else {
          minMovesMatrix[startWindowIndex][endWindowIndex] =
            minMovesMatrix[startWindowIndex + 1][endWindowIndex - 1];
        }
      }

      for (
        let splitIndex = startWindowIndex;
        splitIndex < endWindowIndex;
        splitIndex++
      ) {
        minMovesMatrix[startWindowIndex][endWindowIndex] = Math.min(
          minMovesMatrix[startWindowIndex][endWindowIndex],
          minMovesMatrix[startWindowIndex][splitIndex] +
            minMovesMatrix[splitIndex + 1][endWindowIndex],
        );
      }
    }
  }

  return minMovesMatrix[0][arrayLength - 1];
};
