/**
 * Range Sum Query 2d Immutable
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var NumMatrix = function (initialMatrix) {
  this.prefixSumGrid = new Array(initialMatrix.length + 1)
    .fill(0)
    .map(() => new Array(initialMatrix[0].length + 1).fill(0));

  let totalRowsMatrix = initialMatrix.length;
  let totalColsMatrix = initialMatrix[0].length;

  for (let rowIterator = 0; rowIterator < totalRowsMatrix; rowIterator++) {
    for (let colIterator = 0; colIterator < totalColsMatrix; colIterator++) {
      let currentMatrixValue = initialMatrix[rowIterator][colIterator];
      let sumFromAbove = this.prefixSumGrid[rowIterator][colIterator + 1];
      let sumFromLeft = this.prefixSumGrid[rowIterator + 1][colIterator];
      let sumFromOverlap = this.prefixSumGrid[rowIterator][colIterator];
      this.prefixSumGrid[rowIterator + 1][colIterator + 1] =
        currentMatrixValue + sumFromAbove + sumFromLeft - sumFromOverlap;
    }
  }
};

NumMatrix.prototype.sumRegion = function (startRow, startCol, endRow, endCol) {
  let sumBottomRight = this.prefixSumGrid[endRow + 1][endCol + 1];
  let sumTopSegment = this.prefixSumGrid[startRow][endCol + 1];
  let sumLeftSegment = this.prefixSumGrid[endRow + 1][startCol];
  let sumOverlapRegion = this.prefixSumGrid[startRow][startCol];

  let resultAreaSum =
    sumBottomRight - sumTopSegment - sumLeftSegment + sumOverlapRegion;
  return resultAreaSum;
};
