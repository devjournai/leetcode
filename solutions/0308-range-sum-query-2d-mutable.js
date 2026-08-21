/**
 * Range Sum Query 2d Mutable
 * Intuition: A 2D Fenwick tree stores prefix sums so a point add and a rectangle query are both O(log R log C). The original matrix is kept to compute the delta on update.
 * Approach: 1. Constructor: zero BIT, then for each cell call updateBitTreeInternal(r+1,c+1,val) using i += i&-i. 2. query walks i -= i&-i. 3. update: delta = val - original[r][c], write original, add delta to BIT. 4. sumRegion = Q(r2+1,c2+1)-Q(r1,c2+1)-Q(r2+1,c1)+Q(r1,c1).
 * Dry Run: matrix=[[3,0],[5,6]].
 *   - sumRegion(0,0,1,1)=14. update(0,0,2) applies delta -1. sum becomes 13.
 * Time Complexity: O(R * C * logR * logC)
 * Space Complexity: O(R * C)
 */
var NumMatrix = function (matrix) {
  this.numRows = matrix.length;
  this.numCols = matrix[0].length;
  this.originalMatrixState = matrix;
  this.bitTree = new Array(this.numRows + 1)
    .fill(null)
    .map(() => new Array(this.numCols + 1).fill(0));

  for (let rowIndexIter = 0; rowIndexIter < this.numRows; rowIndexIter++) {
    for (let colIndexIter = 0; colIndexIter < this.numCols; colIndexIter++) {
      this.updateBitTreeInternal(
        rowIndexIter + 1,
        colIndexIter + 1,
        matrix[rowIndexIter][colIndexIter]
      );
    }
  }
};

NumMatrix.prototype.updateBitTreeInternal = function (
  currentUpdateRow,
  currentUpdateCol,
  updateVal
) {
  let rIter = currentUpdateRow;
  while (rIter <= this.numRows) {
    let cIter = currentUpdateCol;
    while (cIter <= this.numCols) {
      this.bitTree[rIter][cIter] += updateVal;
      cIter += cIter & -cIter;
    }
    rIter += rIter & -rIter;
  }
};

NumMatrix.prototype.queryBitTreeInternal = function (queryRow, queryCol) {
  let currentSum = 0;
  let rowCursor = queryRow;
  while (rowCursor > 0) {
    let colCursor = queryCol;
    while (colCursor > 0) {
      currentSum += this.bitTree[rowCursor][colCursor];
      colCursor -= colCursor & -colCursor;
    }
    rowCursor -= rowCursor & -rowCursor;
  }
  return currentSum;
};

NumMatrix.prototype.update = function (row, col, val) {
  const differenceValue = val - this.originalMatrixState[row][col];
  this.originalMatrixState[row][col] = val;
  this.updateBitTreeInternal(row + 1, col + 1, differenceValue);
};

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  const sumAtBottomRight = this.queryBitTreeInternal(row2 + 1, col2 + 1);
  const sumAboveTopLeft = this.queryBitTreeInternal(row1, col2 + 1);
  const sumLeftOfTopLeft = this.queryBitTreeInternal(row2 + 1, col1);
  const sumAtTopLeft = this.queryBitTreeInternal(row1, col1);

  return sumAtBottomRight - sumAboveTopLeft - sumLeftOfTopLeft + sumAtTopLeft;
};
