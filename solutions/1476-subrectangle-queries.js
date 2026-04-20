/**
 * Subrectangle Queries
 * Time Complexity: O(R*C)
 * Space Complexity: O(R*C)
 */
var SubrectangleQueries = function (rectangle) {
  this.matrixStore = rectangle.map((initialMatrixRow) => [...initialMatrixRow]);
};

SubrectangleQueries.prototype.updateSubrectangle = function (
  row1,
  col1,
  row2,
  col2,
  newValue,
) {
  let currentRowPointer = row1;
  while (currentRowPointer <= row2) {
    let currentColumnPointer = col1;
    while (currentColumnPointer <= col2) {
      this.matrixStore[currentRowPointer][currentColumnPointer] = newValue;
      currentColumnPointer++;
    }
    currentRowPointer++;
  }
};

SubrectangleQueries.prototype.getValue = function (row, col) {
  return this.matrixStore[row][col];
};
