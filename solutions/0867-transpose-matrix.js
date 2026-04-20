/**
 * Transpose Matrix
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var transpose = function (A) {
  const originalRowCount = A.length;
  if (originalRowCount === 0) {
    return [];
  }

  const originalColCount = A[0].length;
  if (originalColCount === 0) {
    return [];
  }

  const resultantMatrix = [];

  for (
    let currentColumnIndex = 0;
    currentColumnIndex < originalColCount;
    currentColumnIndex++
  ) {
    const tempRowCollector = [];
    for (
      let currentRowIndex = 0;
      currentRowIndex < originalRowCount;
      currentRowIndex++
    ) {
      const elementValue = A[currentRowIndex][currentColumnIndex];
      tempRowCollector.push(elementValue);
    }
    resultantMatrix.push(tempRowCollector);
  }

  return resultantMatrix;
};
