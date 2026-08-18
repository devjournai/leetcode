/**
 * Check If Grid Satisfies Conditions
 * Intuition: Each cell must equal the cell below it and differ from the cell to its right.
 * Approach: 1. Scan every cell. 2. If a below neighbor exists and differs, return false. 3. If a right neighbor exists and matches, return false. 4. Return true.
 * Dry Run:
 *   grid = [[1,0,2],[1,0,2]]
 *   Vertical pairs match, horizontal pairs differ. Return true.
 * Time Complexity: O(R * C)
 * Space Complexity: O(1)
 */
var satisfiesConditions = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      if (
        rowIndex + 1 < rowCount &&
        grid[rowIndex][columnIndex] !== grid[rowIndex + 1][columnIndex]
      ) {
        return false;
      }
      if (
        columnIndex + 1 < columnCount &&
        grid[rowIndex][columnIndex] === grid[rowIndex][columnIndex + 1]
      ) {
        return false;
      }
    }
  }
  return true;
};
