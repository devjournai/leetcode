/**
 * Out Of Boundary Paths
 * Intuition: Count ways to step off an m×n grid in at most `maxMove` moves from the start. DP: after t moves, how many ways to sit on each cell; a step off the board adds those ways to the answer (mod 1e9+7).
 * Approach: 1. `currentDpGrid` starts with 1 at (startRow, startColumn). 2. For each of `maxMove` steps, build `nextDpGridState`. 3. From each cell with paths, try 4 dirs: out of bounds adds to `totalEscapePaths`; else add into the next grid. 4. Swap grids. 5. Return the escape total.
 * Dry Run: m=2, n=2, maxMove=2, start (0,0).
 *   - Move 1: two steps leave the grid (up/left), two stay at (0,1) and (1,0).
 *   - Move 2: more exits from those cells. Total 6.
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
