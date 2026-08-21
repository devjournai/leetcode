/**
 * Leftmost Column With At Least A One
 * Intuition: Rows are sorted 0s then 1s, so start at the top-right. A 1 means a candidate column and we can move left; a 0 means this row cannot improve further left, so move down.
 * Approach: 1. Read dimensions. 2. Start scanRow=0, scanCol=cols-1, best=-1. 3. While in bounds, if get(row,col) is 1, record col and move left; else move down. 4. Return the leftmost recorded column.
 * Dry Run: matrix rows [0,0,0,1] then [0,0,1,1]
 *   - start (0,3)=1 -> best=3, go left
 *   - (0,2)=0 -> go down
 *   - (1,2)=1 -> best=2, go left
 *   - (1,1)=0 -> go down, out of rows. Return 2.
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
