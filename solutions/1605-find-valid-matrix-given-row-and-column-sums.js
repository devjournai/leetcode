/**
 * Find Valid Matrix Given Row And Column Sums
 * Time Complexity: O(rows + cols)
 * Space Complexity: O(rows * cols)
 */
var restoreMatrix = function (rowSum, colSum) {
  const totalMatrixRows = rowSum.length;
  const totalMatrixCols = colSum.length;

  const resultGridMatrix = Array.from({ length: totalMatrixRows }, () =>
    Array(totalMatrixCols).fill(0),
  );

  let currentRowAdvancePointer = 0;
  let currentColAdvancePointer = 0;

  while (
    currentRowAdvancePointer < totalMatrixRows &&
    currentColAdvancePointer < totalMatrixCols
  ) {
    const quantityToPlace = Math.min(
      rowSum[currentRowAdvancePointer],
      colSum[currentColAdvancePointer],
    );
    resultGridMatrix[currentRowAdvancePointer][currentColAdvancePointer] =
      quantityToPlace;

    rowSum[currentRowAdvancePointer] -= quantityToPlace;
    colSum[currentColAdvancePointer] -= quantityToPlace;

    if (rowSum[currentRowAdvancePointer] === 0) {
      currentRowAdvancePointer++;
    }
    if (colSum[currentColAdvancePointer] === 0) {
      currentColAdvancePointer++;
    }
  }

  return resultGridMatrix;
};
