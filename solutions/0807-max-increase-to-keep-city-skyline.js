/**
 * Max Increase To Keep City Skyline
 * Intuition: A cell can rise to `min(max of its row, max of its column)` without changing those skylines.
 * Approach: 1. Compute `rowMaximumHeights` and `colMaximumHeights`. 2. Sum `min(rowMax, colMax) - grid[r][c]` over all cells.
 * Dry Run: [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]. Corner (0,1) 0 → min(8,3)=3, gain 3. Total 35.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var maxIncreaseKeepingSkyline = function (grid) {
  const dimensionN = grid.length;
  let totalIncreaseAmount = 0;

  const rowMaximumHeights = new Array(dimensionN).fill(0);
  for (let currentGridRow = 0; currentGridRow < dimensionN; currentGridRow++) {
    let highestInThisRow = 0;
    for (
      let currentGridCol = 0;
      currentGridCol < dimensionN;
      currentGridCol++
    ) {
      if (grid[currentGridRow][currentGridCol] > highestInThisRow) {
        highestInThisRow = grid[currentGridRow][currentGridCol];
      }
    }
    rowMaximumHeights[currentGridRow] = highestInThisRow;
  }

  const colMaximumHeights = new Array(dimensionN).fill(0);
  for (
    let currentColumnIdx = 0;
    currentColumnIdx < dimensionN;
    currentColumnIdx++
  ) {
    let highestInThisColumn = 0;
    for (let currentRowIdx = 0; currentRowIdx < dimensionN; currentRowIdx++) {
      if (grid[currentRowIdx][currentColumnIdx] > highestInThisColumn) {
        highestInThisColumn = grid[currentRowIdx][currentColumnIdx];
      }
    }
    colMaximumHeights[currentColumnIdx] = highestInThisColumn;
  }

  for (let rIndex = 0; rIndex < dimensionN; rIndex++) {
    for (let cIndex = 0; cIndex < dimensionN; cIndex++) {
      const existingBuildingHeight = grid[rIndex][cIndex];
      const maxPossibleRowHeight = rowMaximumHeights[rIndex];
      const maxPossibleColumnHeight = colMaximumHeights[cIndex];
      const ultimateMaxHeight = Math.min(
        maxPossibleRowHeight,
        maxPossibleColumnHeight
      );
      totalIncreaseAmount += ultimateMaxHeight - existingBuildingHeight;
    }
  }

  return totalIncreaseAmount;
};
