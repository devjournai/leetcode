/**
 * Surface Area Of 3d Shapes
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
