/**
 * Coloring A Border
 * Time Complexity: O(M*N)
 * Space Complexity: O(M*N)
 */
var colorBorder = function (grid, row, col, color) {
  const totalRows = grid.length;
  const totalCols = grid[0].length;
  const componentOriginColor = grid[row][col];

  const visitedCellsMatrix = Array(totalRows)
    .fill(null)
    .map(() => Array(totalCols).fill(false));

  const borderCellCoordinates = [];

  const bfsQueue = [[row, col]];
  visitedCellsMatrix[row][col] = true;

  const rowOffsets = [-1, 1, 0, 0];
  const colOffsets = [0, 0, -1, 1];

  while (bfsQueue.length > 0) {
    const [currentRowIdx, currentColIdx] = bfsQueue.shift();
    let isCurrentCellABorder = false;

    if (
      currentRowIdx === 0 ||
      currentRowIdx === totalRows - 1 ||
      currentColIdx === 0 ||
      currentColIdx === totalCols - 1
    ) {
      isCurrentCellABorder = true;
    }

    for (let dirIndex = 0; dirIndex < 4; dirIndex++) {
      const neighborRowIdx = currentRowIdx + rowOffsets[dirIndex];
      const neighborColIdx = currentColIdx + colOffsets[dirIndex];

      if (
        neighborRowIdx < 0 ||
        neighborRowIdx >= totalRows ||
        neighborColIdx < 0 ||
        neighborColIdx >= totalCols
      ) {
        isCurrentCellABorder = true;
        continue;
      }

      if (grid[neighborRowIdx][neighborColIdx] !== componentOriginColor) {
        isCurrentCellABorder = true;
      } else if (!visitedCellsMatrix[neighborRowIdx][neighborColIdx]) {
        visitedCellsMatrix[neighborRowIdx][neighborColIdx] = true;
        bfsQueue.push([neighborRowIdx, neighborColIdx]);
      }
    }

    if (isCurrentCellABorder) {
      borderCellCoordinates.push([currentRowIdx, currentColIdx]);
    }
  }

  for (const [rCoordinate, cCoordinate] of borderCellCoordinates) {
    grid[rCoordinate][cCoordinate] = color;
  }

  return grid;
};
