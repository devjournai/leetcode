/**
 * Transpose Matrix
 * Intuition: Result[j][i] = A[i][j]. Build each new row by walking down a column of A.
 * Approach: 1. Empty rows or empty first row → []. 2. For each column index, collect A[row][col] into `tempRowCollector`, push as a row of `resultantMatrix`. 3. Return it.
 * Dry Run: A=[[1,2,3],[4,5,6]] → rows [1,4], [2,5], [3,6].
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
