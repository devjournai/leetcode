/**
 * Largest Local Values In A Matrix
 * Intuition: Each cell in the output matrix represents the maximum value within a 3x3 submatrix in the original grid, corresponding to its centered position. We can iterate through the possible top-left corners of these 3x3 submatrices to populate the output matrix.
 * Approach: 1. Determine the size `gridDim` of the input `grid`. 2. Initialize a `(gridDim - 2) x (gridDim - 2)` result matrix, `largestLocalGrid`, with zeros. 3. Iterate through `largestLocalGrid` using `outputRowIterator` and `outputColIterator` from `0` to `gridDim - 3`. 4. For each `(outputRowIterator, outputColIterator)` position, find the maximum value within the corresponding 3x3 submatrix in the original `grid`. This submatrix spans from `grid[outputRowIterator][outputColIterator]` to `grid[outputRowIterator + 2][outputColIterator + 2]`. 5. Use nested loops with `rowOffset` and `colOffset` from `0` to `2` to traverse the 3x3 window. 6. Keep track of the `currentWindowMaximum` and update it with `Math.max` for each element in the 3x3 window. 7. Assign `currentWindowMaximum` to `largestLocalGrid[outputRowIterator][outputColIterator]`. 8. Return `largestLocalGrid`.
 * Dry Run: grid = [[9,9,8,1],[5,6,7,2],[2,3,4,0],[1,0,0,0]]
 * gridDim = 4
 * largestLocalGrid = new Array(2).fill().map(() => new Array(2).fill(0)); // [[0,0],[0,0]]
 *
 * outputRowIterator = 0:
 *   outputColIterator = 0: // Window grid[0..2][0..2] = [[9,9,8],[5,6,7],[2,3,4]]
 *     currentWindowMaximum = 0
 *     rowOffset = 0 to 2, colOffset = 0 to 2
 *     grid[0][0]=9 -> currentWindowMaximum = 9
 *     ... (all elements in the 3x3 window are checked) ...
 *     grid[2][2]=4 -> currentWindowMaximum = 9 (max in this window)
 *     largestLocalGrid[0][0] = 9
 *
 *   outputColIterator = 1: // Window grid[0..2][1..3] = [[9,8,1],[6,7,2],[3,4,0]]
 *     currentWindowMaximum = 0
 *     rowOffset = 0 to 2, colOffset = 0 to 2
 *     grid[0][1]=9 -> currentWindowMaximum = 9
 *     ... (all elements in the 3x3 window are checked) ...
 *     grid[2][3]=0 -> currentWindowMaximum = 9 (max in this window)
 *     largestLocalGrid[0][1] = 9
 *
 * outputRowIterator = 1:
 *   outputColIterator = 0: // Window grid[1..3][0..2] = [[5,6,7],[2,3,4],[1,0,0]]
 *     currentWindowMaximum = 0
 *     rowOffset = 0 to 2, colOffset = 0 to 2
 *     grid[1][0]=5 -> currentWindowMaximum = 5
 *     ...
 *     grid[1][2]=7 -> currentWindowMaximum = 7 (max in this window)
 *     largestLocalGrid[1][0] = 7
 *
 *   outputColIterator = 1: // Window grid[1..3][1..3] = [[6,7,2],[3,4,0],[0,0,0]]
 *     currentWindowMaximum = 0
 *     rowOffset = 0 to 2, colOffset = 0 to 2
 *     grid[1][1]=6 -> currentWindowMaximum = 6
 *     ...
 *     grid[1][2]=7 -> currentWindowMaximum = 7 (max in this window)
 *     largestLocalGrid[1][1] = 7
 *
 * Result: [[9,9],[7,7]]
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var largestLocal = function (grid) {
  const gridDimension = grid.length;
  const resultDimension = gridDimension - 2;
  const largestLocalGrid = new Array(resultDimension)
    .fill(null)
    .map(() => new Array(resultDimension).fill(0));

  for (
    let outputRowIterator = 0;
    outputRowIterator < resultDimension;
    outputRowIterator++
  ) {
    for (
      let outputColIterator = 0;
      outputColIterator < resultDimension;
      outputColIterator++
    ) {
      let currentWindowMaximum = 0;
      for (let rowOffset = 0; rowOffset < 3; rowOffset++) {
        for (let colOffset = 0; colOffset < 3; colOffset++) {
          const actualGridRow = outputRowIterator + rowOffset;
          const actualGridCol = outputColIterator + colOffset;
          currentWindowMaximum = Math.max(
            currentWindowMaximum,
            grid[actualGridRow][actualGridCol],
          );
        }
      }
      largestLocalGrid[outputRowIterator][outputColIterator] =
        currentWindowMaximum;
    }
  }

  return largestLocalGrid;
};
