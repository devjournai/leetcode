/**
 * Longest Increasing Path In A Matrix
 * Intuition: From a cell the path length is 1 plus the best path among strictly greater 4-neighbors. Memoize each cell so each is computed once.
 * Approach: 1. Empty matrix → 0. 2. pathMemo starts at 0 (unknown). 3. DFS: if memoized return it; else try up/down/left/right with a greater value and take max 1 + neighbor. 4. Run DFS from every cell and return the global max.
 * Dry Run: matrix = [[9, 9, 4], [6, 6, 8], [2, 1, 1]].
 *   - From 1 → 2 → 6 → 9 the DFS records length 4.
 *   - Other starts are shorter; return 4.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var longestIncreasingPath = function (matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return 0;
  }

  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;

  const pathMemo = Array.from({ length: matrixHeight }, () =>
    Array(matrixWidth).fill(0)
  );

  const directionOffsets = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let maxOverallPath = 0;

  const calculateLongestPath = (currentRowPosition, currentColPosition) => {
    if (pathMemo[currentRowPosition][currentColPosition] !== 0) {
      return pathMemo[currentRowPosition][currentColPosition];
    }

    let pathLengthFromHere = 1;

    for (const directionPair of directionOffsets) {
      const nextRowPosition = currentRowPosition + directionPair[0];
      const nextColPosition = currentColPosition + directionPair[1];

      const isValidRow = nextRowPosition >= 0 && nextRowPosition < matrixHeight;
      const isValidCol = nextColPosition >= 0 && nextColPosition < matrixWidth;

      if (
        isValidRow &&
        isValidCol &&
        matrix[nextRowPosition][nextColPosition] >
          matrix[currentRowPosition][currentColPosition]
      ) {
        const neighborPathResult = calculateLongestPath(
          nextRowPosition,
          nextColPosition
        );
        pathLengthFromHere = Math.max(
          pathLengthFromHere,
          1 + neighborPathResult
        );
      }
    }

    pathMemo[currentRowPosition][currentColPosition] = pathLengthFromHere;
    return pathLengthFromHere;
  };

  for (let rIdx = 0; rIdx < matrixHeight; rIdx++) {
    for (let cIdx = 0; cIdx < matrixWidth; cIdx++) {
      const currentPathValue = calculateLongestPath(rIdx, cIdx);
      maxOverallPath = Math.max(maxOverallPath, currentPathValue);
    }
  }

  return maxOverallPath;
};
