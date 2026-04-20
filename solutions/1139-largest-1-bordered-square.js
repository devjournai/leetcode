/**
 * Largest 1 Bordered Square
 * Time Complexity: O(rows * cols * min(rows, cols))
 * Space Complexity: O(rows * cols)
 */
var largest1BorderedSquare = function (grid) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  const dpHorizontal = Array(gridRows)
    .fill(0)
    .map(() => Array(gridCols).fill(0));
  const dpVertical = Array(gridRows)
    .fill(0)
    .map(() => Array(gridCols).fill(0));

  let maximumSquareSide = 0;

  for (let rowIndex = 0; rowIndex < gridRows; rowIndex++) {
    for (let colIndex = 0; colIndex < gridCols; colIndex++) {
      if (grid[rowIndex][colIndex] === 1) {
        dpHorizontal[rowIndex][colIndex] =
          (colIndex > 0 ? dpHorizontal[rowIndex][colIndex - 1] : 0) + 1;
        dpVertical[rowIndex][colIndex] =
          (rowIndex > 0 ? dpVertical[rowIndex - 1][colIndex] : 0) + 1;

        let currentSideLength = Math.min(
          dpHorizontal[rowIndex][colIndex],
          dpVertical[rowIndex][colIndex],
        );

        while (currentSideLength > maximumSquareSide) {
          const potentialTopRow = rowIndex - currentSideLength + 1;
          const potentialLeftColumn = colIndex - currentSideLength + 1;

          if (
            dpHorizontal[potentialTopRow][colIndex] >= currentSideLength &&
            dpVertical[rowIndex][potentialLeftColumn] >= currentSideLength
          ) {
            maximumSquareSide = currentSideLength;
            break;
          }
          currentSideLength--;
        }
      }
    }
  }

  return maximumSquareSide * maximumSquareSide;
};
