/**
 * Random Flip Matrix
 * Time Complexity: O(1)
 * Space Complexity: O(K)
 */
var Solution = function (m, n) {
  this.matrixRows = m;
  this.matrixColumns = n;
  this.currentTotalAvailable = m * n;
  this.indexMap = new Map();
};

Solution.prototype.flip = function () {
  const randomChosenIndex = Math.floor(
    Math.random() * this.currentTotalAvailable,
  );

  let resultantMatrixIndex;
  if (this.indexMap.has(randomChosenIndex)) {
    resultantMatrixIndex = this.indexMap.get(randomChosenIndex);
  } else {
    resultantMatrixIndex = randomChosenIndex;
  }

  const lastValidSlotIndex = this.currentTotalAvailable - 1;
  let valueToMove;
  if (this.indexMap.has(lastValidSlotIndex)) {
    valueToMove = this.indexMap.get(lastValidSlotIndex);
  } else {
    valueToMove = lastValidSlotIndex;
  }

  this.indexMap.set(randomChosenIndex, valueToMove);
  this.currentTotalAvailable--;

  const resultingRow = Math.floor(resultantMatrixIndex / this.matrixColumns);
  const resultingColumn = resultantMatrixIndex % this.matrixColumns;

  return [resultingRow, resultingColumn];
};

Solution.prototype.reset = function () {
  this.currentTotalAvailable = this.matrixRows * this.matrixColumns;
  this.indexMap.clear();
};
