/**
 * Reconstruct A 2 Row Binary Matrix
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var reconstructMatrix = function (upper, lower, colsum) {
  const totalColumns = colsum.length;
  const finalMatrixGrid = new Array(2);
  finalMatrixGrid[0] = new Array(totalColumns);
  finalMatrixGrid[1] = new Array(totalColumns);

  let currentUpperSumBalance = upper;
  let currentLowerSumBalance = lower;

  for (
    let firstColumnIteration = 0;
    firstColumnIteration < totalColumns;
    firstColumnIteration++
  ) {
    if (colsum[firstColumnIteration] === 2) {
      finalMatrixGrid[0][firstColumnIteration] = 1;
      finalMatrixGrid[1][firstColumnIteration] = 1;
      currentUpperSumBalance--;
      currentLowerSumBalance--;
    } else {
      finalMatrixGrid[0][firstColumnIteration] = 0;
      finalMatrixGrid[1][firstColumnIteration] = 0;
    }
  }

  if (currentUpperSumBalance < 0 || currentLowerSumBalance < 0) {
    return [];
  }

  let secondColumnIteration = 0;
  for (const currentColumnValue of colsum) {
    if (currentColumnValue === 1) {
      if (currentUpperSumBalance > 0) {
        finalMatrixGrid[0][secondColumnIteration] = 1;
        currentUpperSumBalance--;
      } else if (currentLowerSumBalance > 0) {
        finalMatrixGrid[1][secondColumnIteration] = 1;
        currentLowerSumBalance--;
      } else {
        return [];
      }
    }
    secondColumnIteration++;
  }

  if (currentUpperSumBalance === 0 && currentLowerSumBalance === 0) {
    return finalMatrixGrid;
  } else {
    return [];
  }
};
