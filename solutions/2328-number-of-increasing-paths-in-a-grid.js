/**
 * Number Of Increasing Paths In A Grid
 * Intuition: Each cell's contribution to the total increasing paths can be calculated by considering it as a starting point. If we know the number of increasing paths that can start from an adjacent cell with a greater value, we can extend those paths from the current cell. This forms a directed acyclic graph (DAG) problem on the grid where edges only go to strictly larger neighbors, making dynamic programming with memoization suitable.
 * Approach: 1. Initialize a 2D memoization table to store the number of increasing paths starting from each cell. 2. Define a recursive helper function that calculates the number of increasing paths starting from a given cell (row, col). This function first checks if the result for (row, col) is already memoized; if so, it returns the cached value. 3. Otherwise, it initializes the path count for the current cell to 1 (representing the path consisting only of the cell itself). 4. It then iterates through all four adjacent neighbors. For each neighbor, it checks if it's within grid boundaries and if its value is strictly greater than the current cell's value. 5. If both conditions are met, it recursively calls the helper function for that neighbor and adds the returned value to the current cell's path count, applying modulo arithmetic at each addition. 6. The computed path count for (row, col) is then stored in the memoization table before being returned. 7. Finally, iterate through every cell in the grid, call the helper function for each cell, and sum up all the returned path counts to get the grand total, again applying modulo arithmetic.
 * Dry Run: grid = [[1,1],[3,4]]
 *   - matrixRows = 2, matrixCols = 2, moduloValue = 1e9 + 7
 *   - memoizationTable = [[0,0],[0,0]]
 *   - grandTotalPaths = 0
 *
 *   - calculateIncreasingPaths(0,0): (grid[0][0] = 1)
 *     - memoizationTable[0][0] is 0.
 *     - totalPathsFromCell = 1
 *     - Neighbors:
 *       - (0,1): grid[0][1]=1. Not > 1. Skip.
 *       - (1,0): grid[1][0]=3. Is > 1.
 *         - calculateIncreasingPaths(1,0): (grid[1][0] = 3)
 *           - memoizationTable[1][0] is 0.
 *           - totalPathsFromCell = 1
 *           - Neighbors:
 *             - (1,1): grid[1][1]=4. Is > 3.
 *               - calculateIncreasingPaths(1,1): (grid[1][1] = 4)
 *                 - memoizationTable[1][1] is 0.
 *                 - totalPathsFromCell = 1
 *                 - No greater neighbors.
 *                 - memoizationTable[1][1] = 1. Return 1.
 *             - totalPathsFromCell = (1 + 1) % MOD = 2.
 *           - No other greater neighbors.
 *           - memoizationTable[1][0] = 2. Return 2.
 *         - totalPathsFromCell = (1 + 2) % MOD = 3.
 *     - memoizationTable[0][0] = 3. Return 3.
 *   - grandTotalPaths = (0 + 3) % MOD = 3.
 *
 *   - calculateIncreasingPaths(0,1): (grid[0][1] = 1)
 *     - memoizationTable[0][1] is 0.
 *     - totalPathsFromCell = 1
 *     - Neighbors:
 *       - (1,1): grid[1][1]=4. Is > 1.
 *         - calculateIncreasingPaths(1,1): memoizationTable[1][1] is 1. Return 1.
 *       - totalPathsFromCell = (1 + 1) % MOD = 2.
 *     - memoizationTable[0][1] = 2. Return 2.
 *   - grandTotalPaths = (3 + 2) % MOD = 5.
 *
 *   - calculateIncreasingPaths(1,0): memoizationTable[1][0] is 2. Return 2.
 *   - grandTotalPaths = (5 + 2) % MOD = 7.
 *
 *   - calculateIncreasingPaths(1,1): memoizationTable[1][1] is 1. Return 1.
 *   - grandTotalPaths = (7 + 1) % MOD = 8.
 *
 *   - Final result: 8.
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var countPaths = function (grid) {
  const moduloValue = 1e9 + 7;
  const matrixRows = grid.length;
  const matrixCols = grid[0].length;
  const memoizationTable = Array(matrixRows)
    .fill(0)
    .map(() => Array(matrixCols).fill(0));
  const directionVectors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  function calculateIncreasingPaths(startRowCoord, startColCoord) {
    if (memoizationTable[startRowCoord][startColCoord]) {
      return memoizationTable[startRowCoord][startColCoord];
    }

    let totalPathsFromCell = 1;
    for (const [deltaRow, deltaCol] of directionVectors) {
      const nextCellRow = startRowCoord + deltaRow;
      const nextCellCol = startColCoord + deltaCol;

      if (
        nextCellRow >= 0 &&
        nextCellRow < matrixRows &&
        nextCellCol >= 0 &&
        nextCellCol < matrixCols &&
        grid[nextCellRow][nextCellCol] > grid[startRowCoord][startColCoord]
      ) {
        totalPathsFromCell =
          (totalPathsFromCell +
            calculateIncreasingPaths(nextCellRow, nextCellCol)) %
          moduloValue;
      }
    }

    memoizationTable[startRowCoord][startColCoord] = totalPathsFromCell;
    return totalPathsFromCell;
  }

  let grandTotalPaths = 0;
  for (let currentGridRow = 0; currentGridRow < matrixRows; currentGridRow++) {
    for (
      let currentGridCol = 0;
      currentGridCol < matrixCols;
      currentGridCol++
    ) {
      grandTotalPaths =
        (grandTotalPaths +
          calculateIncreasingPaths(currentGridRow, currentGridCol)) %
        moduloValue;
    }
  }

  return grandTotalPaths;
};
