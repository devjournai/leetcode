/**
 * Unique Paths II
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
