/**
 * Minimum Path Cost In A Grid
 * Intuition: This problem can be solved using dynamic programming because the minimum cost to reach a cell in the next row depends on the minimum costs to reach cells in the current row, exhibiting optimal substructure and overlapping subproblems.
 * Approach: 1. Initialize a 2D array, `minCostPath`, of the same dimensions as `grid` to store the minimum cost to reach each cell, filling it with `Infinity`. 2. Populate the first row of `minCostPath` directly with the values from the first row of `grid`, as these are the starting costs. 3. Iterate through each row of the grid starting from the first row up to the second-to-last row. For each cell in the current row, iterate through all possible cells in the next row. Calculate the total cost to reach a cell in the next row by summing the minimum cost to reach the current cell, the value of the target cell in the next row, and the move cost from the current cell's value to the target column. Update the `minCostPath` table for the target cell if a lower cost is found. 4. After iterating through all rows and possible moves, the minimum value in the last row of `minCostPath` will be the overall minimum path cost.
 * Dry Run: For grid = [[5,3],[4,0],[2,1]], moveCost = [[9,8],[1,5],[10,12],[18,6],[2,4],[14,3]]
 * numRows = 3, numColumns = 2.
 * Initialize minCostPath = [[Infinity, Infinity], [Infinity, Infinity], [Infinity, Infinity]].
 * Base case (first row):
 * minCostPath[0][0] = grid[0][0] = 5
 * minCostPath[0][1] = grid[0][1] = 3
 * minCostPath becomes [[5, 3], [Infinity, Infinity], [Infinity, Infinity]].
 *
 * Iterate (currentRow = 0):
 *   currentCol = 0 (grid[0][0] = 5):
 *     valueFromCell = 5
 *     targetCol = 0: minCostPath[1][0] = min(Infinity, minCostPath[0][0] + grid[1][0] + moveCost[5][0]) = min(Infinity, 5 + 4 + 14) = 23
 *     targetCol = 1: minCostPath[1][1] = min(Infinity, minCostPath[0][0] + grid[1][1] + moveCost[5][1]) = min(Infinity, 5 + 0 + 3) = 8
 *   minCostPath becomes [[5, 3], [23, 8], [Infinity, Infinity]].
 *   currentCol = 1 (grid[0][1] = 3):
 *     valueFromCell = 3
 *     targetCol = 0: minCostPath[1][0] = min(23, minCostPath[0][1] + grid[1][0] + moveCost[3][0]) = min(23, 3 + 4 + 18) = 23
 *     targetCol = 1: minCostPath[1][1] = min(8, minCostPath[0][1] + grid[1][1] + moveCost[3][1]) = min(8, 3 + 0 + 6) = 8
 *   minCostPath remains [[5, 3], [23, 8], [Infinity, Infinity]].
 *
 * Iterate (currentRow = 1):
 *   currentCol = 0 (grid[1][0] = 4):
 *     valueFromCell = 4
 *     targetCol = 0: minCostPath[2][0] = min(Infinity, minCostPath[1][0] + grid[2][0] + moveCost[4][0]) = min(Infinity, 23 + 2 + 2) = 27
 *     targetCol = 1: minCostPath[2][1] = min(Infinity, minCostPath[1][0] + grid[2][1] + moveCost[4][1]) = min(Infinity, 23 + 1 + 4) = 28
 *   minCostPath becomes [[5, 3], [23, 8], [27, 28]].
 *   currentCol = 1 (grid[1][1] = 0):
 *     valueFromCell = 0
 *     targetCol = 0: minCostPath[2][0] = min(27, minCostPath[1][1] + grid[2][0] + moveCost[0][0]) = min(27, 8 + 2 + 9) = 19
 *     targetCol = 1: minCostPath[2][1] = min(28, minCostPath[1][1] + grid[2][1] + moveCost[0][1]) = min(28, 8 + 1 + 8) = 17
 *   minCostPath becomes [[5, 3], [23, 8], [19, 17]].
 *
 * Find minimum in last row:
 * overallMinimum = min(19, 17) = 17.
 * Return 17.
 * Time Complexity: O(m * n^2)
 * Space Complexity: O(m * n)
 */
var minPathCost = function (grid, moveCost) {
  const numRows = grid.length;
  const numColumns = grid[0].length;

  const minCostPath = Array.from({ length: numRows }, () =>
    new Array(numColumns).fill(Infinity)
  );

  for (
    let initialColIndex = 0;
    initialColIndex < numColumns;
    initialColIndex++
  ) {
    minCostPath[0][initialColIndex] = grid[0][initialColIndex];
  }

  for (let currentRow = 0; currentRow < numRows - 1; currentRow++) {
    for (let currentCol = 0; currentCol < numColumns; currentCol++) {
      const valueFromCell = grid[currentRow][currentCol];
      for (let targetCol = 0; targetCol < numColumns; targetCol++) {
        minCostPath[currentRow + 1][targetCol] = Math.min(
          minCostPath[currentRow + 1][targetCol],
          minCostPath[currentRow][currentCol] +
            grid[currentRow + 1][targetCol] +
            moveCost[valueFromCell][targetCol]
        );
      }
    }
  }

  let overallMinimum = Infinity;
  for (let finalColumn = 0; finalColumn < numColumns; finalColumn++) {
    overallMinimum = Math.min(
      overallMinimum,
      minCostPath[numRows - 1][finalColumn]
    );
  }

  return overallMinimum;
};
