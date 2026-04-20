/**
 * Out Of Boundary Paths
 * Time Complexity: O(maxMove * m * n)
 * Space Complexity: O(m * n)
 */
var findPaths = function (m, n, maxMove, startRow, startColumn) {
  const modConstant = 1000000007;
  const movementDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let currentDpGrid = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));
  currentDpGrid[startRow][startColumn] = 1;

  let totalEscapePaths = 0;

  for (let moveCounter = 0; moveCounter < maxMove; moveCounter++) {
    let nextDpGridState = Array(m)
      .fill(0)
      .map(() => Array(n).fill(0));

    for (let rowIterator = 0; rowIterator < m; rowIterator++) {
      for (let colIterator = 0; colIterator < n; colIterator++) {
        if (currentDpGrid[rowIterator][colIterator] > 0) {
          const pathsFromCell = currentDpGrid[rowIterator][colIterator];

          for (const [deltaR, deltaC] of movementDirections) {
            const newRPosition = rowIterator + deltaR;
            const newCPosition = colIterator + deltaC;

            if (
              newRPosition < 0 ||
              newRPosition >= m ||
              newCPosition < 0 ||
              newCPosition >= n
            ) {
              totalEscapePaths =
                (totalEscapePaths + pathsFromCell) % modConstant;
            } else {
              nextDpGridState[newRPosition][newCPosition] =
                (nextDpGridState[newRPosition][newCPosition] + pathsFromCell) %
                modConstant;
            }
          }
        }
      }
    }
    currentDpGrid = nextDpGridState;
  }

  return totalEscapePaths;
};
