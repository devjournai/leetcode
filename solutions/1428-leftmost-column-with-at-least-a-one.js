/**
 * Leftmost Column With At Least A One
 * Time Complexity: O(rows + cols)
 * Space Complexity: O(1)
 */
var leftMostColumnWithOne = function (binaryMatrix) {
  const matrixDimensions = binaryMatrix.dimensions();
  const numRows = matrixDimensions[0];
  const numCols = matrixDimensions[1];

  let currentBestColumn = -1;
  let scanRow = 0;
  let scanCol = numCols - 1;

  for (;;) {
    if (scanRow >= numRows || scanCol < 0) {
      break;
    }

    if (binaryMatrix.get(scanRow, scanCol) === 1) {
      currentBestColumn = scanCol;
      scanCol--;
    } else {
      scanRow++;
    }
  }

  return currentBestColumn;
};
