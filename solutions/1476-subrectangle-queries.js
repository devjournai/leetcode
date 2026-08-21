/**
 * Subrectangle Queries
 * Intuition: Keep a mutable copy of the matrix. Updates write newValue into the inclusive rectangle; getValue reads a cell.
 * Approach: 1. Constructor shallow-copies each row. 2. updateSubrectangle nested-loops row1..row2, col1..col2 assigning newValue. 3. getValue returns matrixStore[row][col].
 * Dry Run: rectangle [[1,2],[3,4]], update (0,0,1,1,5), get (1,1)
 *   - entire 2x2 becomes 5
 *   - get returns 5
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
  newValue
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
