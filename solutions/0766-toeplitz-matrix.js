/**
 * Toeplitz Matrix
 * Time Complexity: O(m * n)
 * Space Complexity: O(1)
 */
var isToeplitzMatrix = function (matrix) {
  const totalRows = matrix.length;
  const totalCols = matrix[0].length;

  for (
    let currentColumnStart = 0;
    currentColumnStart < totalCols;
    currentColumnStart++
  ) {
    let actualRow = 0;
    let actualColumn = currentColumnStart;
    while (actualRow + 1 < totalRows && actualColumn + 1 < totalCols) {
      if (
        matrix[actualRow][actualColumn] !==
        matrix[actualRow + 1][actualColumn + 1]
      ) {
        return false;
      }
      actualRow++;
      actualColumn++;
    }
  }

  for (
    let currentRowStart = 1;
    currentRowStart < totalRows;
    currentRowStart++
  ) {
    let diagonalRow = currentRowStart;
    let diagonalColumn = 0;
    while (diagonalRow + 1 < totalRows && diagonalColumn + 1 < totalCols) {
      if (
        matrix[diagonalRow][diagonalColumn] !==
        matrix[diagonalRow + 1][diagonalColumn + 1]
      ) {
        return false;
      }
      diagonalRow++;
      diagonalColumn++;
    }
  }

  return true;
};
