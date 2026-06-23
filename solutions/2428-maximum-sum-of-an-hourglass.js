/**
 * Maximum Sum Of An Hourglass
 * Intuition: The problem asks for the largest sum of a specific 7-cell pattern (an hourglass) within a 2D grid. The most direct way to solve this is to systematically examine every possible location where an hourglass can fit in the grid, calculate its sum, and keep track of the highest sum found.
 * Approach: 1. Initialize a numerical variable, `maximumOverallSum`, to negative infinity to correctly capture the maximum sum, especially if grid elements can be negative. 2. Obtain the dimensions of the input `grid`: `matrixRows` for height and `matrixColumns` for width. 3. Iterate through possible starting row indices for the top-left corner of an hourglass using `currentTopRow`. Since an hourglass is 3 rows tall, `currentTopRow` can range from `0` to `matrixRows - 3`. 4. Within the outer loop, iterate through possible starting column indices for the top-left corner of an hourglass using `currentLeftCol`. As an hourglass is 3 columns wide, `currentLeftCol` can range from `0` to `matrixColumns - 3`. 5. For each `(currentTopRow, currentLeftCol)` pair, compute the `currentHourglassValue` by summing the 7 elements that form the hourglass pattern: `grid[currentTopRow][currentLeftCol]`, `grid[currentTopRow][currentLeftCol + 1]`, `grid[currentTopRow][currentLeftCol + 2]`, `grid[currentTopRow + 1][currentLeftCol + 1]`, `grid[currentTopRow + 2][currentLeftCol]`, `grid[currentTopRow + 2][currentLeftCol + 1]`, and `grid[currentTopRow + 2][currentLeftCol + 2]`. 6. Update `maximumOverallSum` by comparing it with `currentHourglassValue`, taking the larger of the two. 7. After completing all iterations, `maximumOverallSum` will hold the maximum hourglass sum. Return this value.
 * Dry Run: grid = [[6,2,1,3],[4,2,1,5],[9,2,8,7],[4,1,2,9]]
 * matrixRows = 4, matrixColumns = 4
 * maximumOverallSum = -Infinity
 *
 * currentTopRow = 0 (loop up to 4 - 3 = 1)
 *   currentLeftCol = 0 (loop up to 4 - 3 = 1)
 *     Hourglass at (0,0) elements:
 *       grid[0][0]=6, grid[0][1]=2, grid[0][2]=1
 *             grid[1][1]=2
 *       grid[2][0]=9, grid[2][1]=2, grid[2][2]=8
 *     currentHourglassValue = 6 + 2 + 1 + 2 + 9 + 2 + 8 = 30
 *     maximumOverallSum = Math.max(-Infinity, 30) = 30
 *   currentLeftCol = 1
 *     Hourglass at (0,1) elements:
 *       grid[0][1]=2, grid[0][2]=1, grid[0][3]=3
 *             grid[1][2]=1
 *       grid[2][1]=2, grid[2][2]=8, grid[2][3]=7
 *     currentHourglassValue = 2 + 1 + 3 + 1 + 2 + 8 + 7 = 24
 *     maximumOverallSum = Math.max(30, 24) = 30
 *
 * currentTopRow = 1
 *   currentLeftCol = 0
 *     Hourglass at (1,0) elements:
 *       grid[1][0]=4, grid[1][1]=2, grid[1][2]=1
 *             grid[2][1]=2
 *       grid[3][0]=4, grid[3][1]=1, grid[3][2]=2
 *     currentHourglassValue = 4 + 2 + 1 + 2 + 4 + 1 + 2 = 16
 *     maximumOverallSum = Math.max(30, 16) = 30
 *   currentLeftCol = 1
 *     Hourglass at (1,1) elements:
 *       grid[1][1]=2, grid[1][2]=1, grid[1][3]=5
 *             grid[2][2]=8
 *       grid[3][1]=1, grid[3][2]=2, grid[3][3]=9
 *     currentHourglassValue = 2 + 1 + 5 + 8 + 1 + 2 + 9 = 28
 *     maximumOverallSum = Math.max(30, 28) = 30
 *
 * After all loops complete, the final maximumOverallSum is 30.
 * Time Complexity: O(m*n)
 * Space Complexity: O(1)
 */
var maxSum = function (grid) {
  let maximumOverallSum = -Infinity;

  const matrixRows = grid.length;
  const matrixColumns = grid[0].length;

  for (
    let currentTopRow = 0;
    currentTopRow <= matrixRows - 3;
    currentTopRow++
  ) {
    for (
      let currentLeftCol = 0;
      currentLeftCol <= matrixColumns - 3;
      currentLeftCol++
    ) {
      let currentHourglassValue = 0;

      currentHourglassValue += grid[currentTopRow][currentLeftCol];
      currentHourglassValue += grid[currentTopRow][currentLeftCol + 1];
      currentHourglassValue += grid[currentTopRow][currentLeftCol + 2];

      currentHourglassValue += grid[currentTopRow + 1][currentLeftCol + 1];

      currentHourglassValue += grid[currentTopRow + 2][currentLeftCol];
      currentHourglassValue += grid[currentTopRow + 2][currentLeftCol + 1];
      currentHourglassValue += grid[currentTopRow + 2][currentLeftCol + 2];

      maximumOverallSum = Math.max(maximumOverallSum, currentHourglassValue);
    }
  }

  return maximumOverallSum;
};
