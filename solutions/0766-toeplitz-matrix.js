/**
 * Toeplitz Matrix
 * Intuition: Every top-left to bottom-right diagonal must be constant. Walk each diagonal that starts on the first row or the first column (skipping 0,0 twice) and compare consecutive cells.
 * Approach: 1. For `currentColumnStart` from 0 to `totalCols-1`, walk `(actualRow, actualColumn)` southeast; if `matrix[r][c] !== matrix[r+1][c+1]`, return false. 2. Repeat for `currentRowStart` from 1 to `totalRows-1` starting at column 0. 3. If no mismatch, return true.
 * Dry Run: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]].
 *   - First-row starts: 1=1=1, 2=2=2, 3=3, 4 — all match.
 *   - First-column starts: 5=5, 9 — match. Return true.
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
