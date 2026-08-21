/**
 * Surface Area Of 3d Shapes
 * Intuition: Each tower of height h contributes 2 (top/bottom) plus 4h sides. Shared faces with the north or west neighbor are counted twice, so subtract 2 * min(heights) for those adjacencies.
 * Approach: 1. For each cell with `towerHeight > 0`, add `2 + 4*height`. 2. If row > 0, subtract `2 * min(height, grid[row-1][col])`. 3. If col > 0, subtract `2 * min(height, grid[row][col-1])`. 4. Return `computedSurfaceArea`.
 * Dry Run: grid = [[1,2],[3,4]].
 *   - (0,0) h=1 → 6. (0,1) h=2 → 10−2=8. (1,0) h=3 → 14−2=12. (1,1) h=4 → 18−4−6=8. Sum 34.
 * Time Complexity: O(N^2) where N is the dimension of the grid.
 * Space Complexity: O(1)
 */
var surfaceArea = function (grid) {
  let computedSurfaceArea = 0;
  let matrixDimension = grid.length;

  let currentGridRow = 0;
  while (currentGridRow < matrixDimension) {
    let currentGridCol = 0;
    while (currentGridCol < matrixDimension) {
      let towerHeight = grid[currentGridRow][currentGridCol];

      if (towerHeight > 0) {
        computedSurfaceArea += 2;
        computedSurfaceArea += 4 * towerHeight;

        if (currentGridRow > 0) {
          let adjacentHeightUp = grid[currentGridRow - 1][currentGridCol];
          let overlapReductionUp = Math.min(towerHeight, adjacentHeightUp);
          computedSurfaceArea -= 2 * overlapReductionUp;
        }

        if (currentGridCol > 0) {
          let adjacentHeightLeft = grid[currentGridRow][currentGridCol - 1];
          let overlapReductionLeft = Math.min(towerHeight, adjacentHeightLeft);
          computedSurfaceArea -= 2 * overlapReductionLeft;
        }
      }
      currentGridCol++;
    }
    currentGridRow++;
  }

  return computedSurfaceArea;
};
