/**
 * Special Positions in a Binary Matrix
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
