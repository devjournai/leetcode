/**
 * Random Flip Matrix
 * Intuition: Treat the matrix as a shrinking 1D range `[0, available)`. Map flipped indices to the last unused slot so each `flip` samples uniformly among remaining zeros in O(1).
 * Approach: 1. Constructor stores m, n, `currentTotalAvailable=m*n`, empty `indexMap`. 2. `flip` picks `randomChosenIndex` in `[0, available)`, resolves via the map, swaps that slot with the last unused index, decrements available, returns `[r,c]`. 3. `reset` restores available and clears the map.
 * Dry Run: 1x2 matrix. First flip may pick 0 or 1. If 0, map 0→1 and available=1; second flip always yields the remaining cell. Reset restores both.
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
    Math.random() * this.currentTotalAvailable
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
