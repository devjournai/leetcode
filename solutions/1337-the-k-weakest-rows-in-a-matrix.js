/**
 * The K Weakest Rows In A Matrix
 * Time Complexity: O(m*n + m log m)
 * Space Complexity: O(m)
 */
var kWeakestRows = function (mat, k) {
  const rowStrengthPairs = [];
  const matrixLength = mat.length;

  for (let outerRowIndex = 0; outerRowIndex < matrixLength; outerRowIndex++) {
    const currentMatrixRow = mat[outerRowIndex];
    let soldiersCount = 0;
    const rowWidth = currentMatrixRow.length;

    for (let innerColIndex = 0; innerColIndex < rowWidth; innerColIndex++) {
      const cellValue = currentMatrixRow[innerColIndex];
      if (cellValue === 1) {
        soldiersCount++;
      } else {
        break;
      }
    }
    rowStrengthPairs.push([soldiersCount, outerRowIndex]);
  }

  rowStrengthPairs.sort((firstRowPair, secondRowPair) => {
    const strengthDifference = firstRowPair[0] - secondRowPair[0];
    if (strengthDifference !== 0) {
      return strengthDifference;
    }
    const indexDifference = firstRowPair[1] - secondRowPair[1];
    return indexDifference;
  });

  const finalWeakestResult = [];
  for (
    let resultSelectionIndex = 0;
    resultSelectionIndex < k;
    resultSelectionIndex++
  ) {
    const weakestRowTuple = rowStrengthPairs[resultSelectionIndex];
    finalWeakestResult.push(weakestRowTuple[1]);
  }

  return finalWeakestResult;
};
