/**
 * Number Of Ways Of Cutting A Pizza
 * Time Complexity: O(rows * cols * k * (rows + cols))
 * Space Complexity: O(rows * cols * k)
 */
var ways = function (pizza, k) {
  const MODULUS = 1e9 + 7;
  const totalRows = pizza.length;
  const totalCols = pizza[0].length;

  const applesInSuffix = Array.from({ length: totalRows + 1 }, () =>
    Array.from({ length: totalCols + 1 }, () => 0),
  );

  const memoizationTable = Array.from({ length: totalRows + 1 }, () =>
    Array.from({ length: totalCols + 1 }, () =>
      Array.from({ length: k + 1 }, () => -1),
    ),
  );

  for (let rIndex = totalRows - 1; rIndex >= 0; rIndex--) {
    for (let cIndex = totalCols - 1; cIndex >= 0; cIndex--) {
      const currentCellHasApple = pizza[rIndex][cIndex] === "A" ? 1 : 0;
      applesInSuffix[rIndex][cIndex] =
        currentCellHasApple +
        applesInSuffix[rIndex + 1][cIndex] +
        applesInSuffix[rIndex][cIndex + 1] -
        applesInSuffix[rIndex + 1][cIndex + 1];
    }
  }

  function calculateWays(startRow, startCol, cutsRemaining) {
    if (applesInSuffix[startRow][startCol] === 0) {
      return 0;
    }

    if (cutsRemaining === 0) {
      return 1;
    }

    if (memoizationTable[startRow][startCol][cutsRemaining] !== -1) {
      return memoizationTable[startRow][startCol][cutsRemaining];
    }

    let numberOfWays = 0;

    for (let hCutRow = startRow + 1; hCutRow < totalRows; hCutRow++) {
      const applesInUpperPiece =
        applesInSuffix[startRow][startCol] - applesInSuffix[hCutRow][startCol];
      if (applesInUpperPiece > 0) {
        numberOfWays =
          (numberOfWays + calculateWays(hCutRow, startCol, cutsRemaining - 1)) %
          MODULUS;
      }
    }

    for (let vCutCol = startCol + 1; vCutCol < totalCols; vCutCol++) {
      const applesInLeftPiece =
        applesInSuffix[startRow][startCol] - applesInSuffix[startRow][vCutCol];
      if (applesInLeftPiece > 0) {
        numberOfWays =
          (numberOfWays + calculateWays(startRow, vCutCol, cutsRemaining - 1)) %
          MODULUS;
      }
    }

    memoizationTable[startRow][startCol][cutsRemaining] = numberOfWays;
    return numberOfWays;
  }

  return calculateWays(0, 0, k - 1);
};
