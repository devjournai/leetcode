/**
 * Special Positions in a Binary Matrix
 * Intuition: A 1 is special if its row and column each contain exactly one 1.
 * Approach: 1. Count 1s per row and column. 2. For rows with count 1, if that 1's column also has count 1, tally.
 * Dry Run: mat = [[1,0,0],[0,0,1],[1,0,0]].
 *   - Only (1,2) has unique row and column 1 → 1.
 * Time Complexity: O(m*n)
 * Space Complexity: O(m+n)
 */
var numSpecial = function (mat) {
  const dimensionRows = mat.length;
  const dimensionColumns = mat[0].length;

  const rowValueCounts = new Array(dimensionRows).fill(0);
  const columnValueCounts = new Array(dimensionColumns).fill(0);

  for (let rowIndex = 0; rowIndex < dimensionRows; rowIndex++) {
    for (let colIndex = 0; colIndex < dimensionColumns; colIndex++) {
      if (mat[rowIndex][colIndex] === 1) {
        rowValueCounts[rowIndex]++;
        columnValueCounts[colIndex]++;
      }
    }
  }

  let specialPositionsDetected = 0;

  for (let scanRow = 0; scanRow < dimensionRows; scanRow++) {
    if (rowValueCounts[scanRow] === 1) {
      for (let scanCol = 0; scanCol < dimensionColumns; scanCol++) {
        if (mat[scanRow][scanCol] === 1) {
          if (columnValueCounts[scanCol] === 1) {
            specialPositionsDetected++;
          }
          break;
        }
      }
    }
  }

  return specialPositionsDetected;
};
