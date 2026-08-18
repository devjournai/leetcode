/**
 * Find The Minimum Area To Cover All Ones I
 * Intuition: The smallest axis-aligned rectangle covering all 1s is bounded by the min/max row and column that contain a 1.
 * Approach: 1. Scan the grid tracking min/max row and column of 1s. 2. Return (maxRow-minRow+1)*(maxCol-minCol+1).
 * Dry Run:
 *   ones at (0,1),(1,1) -> height 2, width 1, area 2.
 * Time Complexity: O(R * C)
 * Space Complexity: O(1)
 */
var minimumArea = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  let minRow = rowCount;
  let maxRow = -1;
  let minCol = columnCount;
  let maxCol = -1;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      if (grid[rowIndex][columnIndex] === 1) {
        minRow = Math.min(minRow, rowIndex);
        maxRow = Math.max(maxRow, rowIndex);
        minCol = Math.min(minCol, columnIndex);
        maxCol = Math.max(maxCol, columnIndex);
      }
    }
  }
  return (maxRow - minRow + 1) * (maxCol - minCol + 1);
};
