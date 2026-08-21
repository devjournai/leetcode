/**
 * Unique Paths II
 * Intuition: Same grid-path DP as Unique Paths, but an obstacle cell has 0 ways. A 1D array stores the current row; obstacles zero that column, and first-row/first-column cases only take from the left or keep the incoming top value.
 * Approach: 1. If the start is blocked, return 0. 2. dp[0]=1. 3. For each cell, if it is an obstacle set dp[col]=0; else on row 0 copy from the left, on col 0 leave the previous-row value, otherwise add left + current (from above). 4. Return dp[last].
 * Dry Run: grid = [[0,0,0],[0,1,0],[0,0,0]].
 *   - After row 0: [1,1,1]. Hit obstacle at (1,1) → [1,0,1]. Last row: [1,1,2]. Return 2.
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(cols)
 */
var uniquePathsWithObstacles = function (grid) {
  const totalRows = grid.length;
  const totalColumns = grid[0].length;

  if (grid[0][0] === 1) {
    return 0;
  }

  const pathCounts = new Array(totalColumns).fill(0);
  pathCounts[0] = 1;

  for (let currentGridRow = 0; currentGridRow < totalRows; currentGridRow++) {
    for (
      let currentGridColumn = 0;
      currentGridColumn < totalColumns;
      currentGridColumn++
    ) {
      if (grid[currentGridRow][currentGridColumn] === 1) {
        pathCounts[currentGridColumn] = 0;
      } else {
        if (currentGridRow === 0 && currentGridColumn === 0) {
          continue;
        } else if (currentGridRow === 0) {
          pathCounts[currentGridColumn] = pathCounts[currentGridColumn - 1];
        } else if (currentGridColumn === 0) {
          continue;
        } else {
          pathCounts[currentGridColumn] =
            pathCounts[currentGridColumn] + pathCounts[currentGridColumn - 1];
        }
      }
    }
  }

  return pathCounts[totalColumns - 1];
};
