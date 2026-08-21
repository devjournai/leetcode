/**
 * Find Valid Matrix Given Row And Column Sums
 * Intuition: Greedily fill the current (row, col) with min(remaining rowSum, remaining colSum). That always leaves a feasible leftover because the totals match.
 * Approach: 1. Start at (0,0) on a zeros matrix. 2. Place min(rowSum[r], colSum[c]) and subtract it from both remainders. 3. Advance the row if its remainder hits 0, the column if its remainder hits 0. 4. Repeat until both pointers pass the edges.
 * Dry Run: rowSum = [3,8], colSum = [4,7].
 *   - (0,0)=3; row0 done, col0 leftover 1.
 *   - (1,0)=1; col0 done, row1 leftover 7.
 *   - (1,1)=7. Matrix [[3,0],[1,7]].
 * Time Complexity: O(rows + cols)
 * Space Complexity: O(rows * cols)
 */
var restoreMatrix = function (rowSum, colSum) {
  const totalMatrixRows = rowSum.length;
  const totalMatrixCols = colSum.length;

  const resultGridMatrix = Array.from({ length: totalMatrixRows }, () =>
    Array(totalMatrixCols).fill(0)
  );

  let currentRowAdvancePointer = 0;
  let currentColAdvancePointer = 0;

  while (
    currentRowAdvancePointer < totalMatrixRows &&
    currentColAdvancePointer < totalMatrixCols
  ) {
    const quantityToPlace = Math.min(
      rowSum[currentRowAdvancePointer],
      colSum[currentColAdvancePointer]
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
