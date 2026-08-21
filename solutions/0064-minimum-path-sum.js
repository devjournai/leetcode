/**
 * Minimum Path Sum
 * Intuition: The cheapest path to a cell is grid[i][j] plus the cheaper of the cell above or to the left. Fill a 2D DP table with first row/column as prefix sums, then the rest.
 * Approach: 1. dp[0][0] = grid[0][0]. 2. Fill the first row and first column by adding along the edge. 3. For other cells, dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). 4. Return dp[m-1][n-1].
 * Dry Run: grid = [[1,3,1],[1,5,1],[4,2,1]].
 *   - First row [1,4,5], first col [1,2,6]. Then dp[1][1]=7, dp[1][2]=6, dp[2][1]=8, dp[2][2]=7. Return 7 (path 1-3-1-1-1).
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var minPathSum = function (grid) {
  const totalRows = grid.length;
  const totalColumns = grid[0].length;

  const dpStorage = Array(totalRows)
    .fill(null)
    .map(() => Array(totalColumns).fill(0));

  dpStorage[0][0] = grid[0][0];

  for (let colIterator = 1; colIterator < totalColumns; colIterator++) {
    dpStorage[0][colIterator] =
      dpStorage[0][colIterator - 1] + grid[0][colIterator];
  }

  for (let rowIterator = 1; rowIterator < totalRows; rowIterator++) {
    dpStorage[rowIterator][0] =
      dpStorage[rowIterator - 1][0] + grid[rowIterator][0];
  }

  for (let computeRow = 1; computeRow < totalRows; computeRow++) {
    for (let computeCol = 1; computeCol < totalColumns; computeCol++) {
      const valueFromAbove = dpStorage[computeRow - 1][computeCol];
      const valueFromLeft = dpStorage[computeRow][computeCol - 1];
      dpStorage[computeRow][computeCol] =
        grid[computeRow][computeCol] + Math.min(valueFromAbove, valueFromLeft);
    }
  }

  return dpStorage[totalRows - 1][totalColumns - 1];
};
