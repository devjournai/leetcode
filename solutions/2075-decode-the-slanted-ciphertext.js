/**
 * Decode the Slanted Ciphertext
 * Intuition: The encoded string is a row-major matrix; original characters sit on diagonals that start at each column of the first row.
 * Approach: 1. If rows = 1, return the string. 2. columns = length / rows. 3. For each start column, walk down-right collecting chars. 4. Trim trailing spaces.
 * Dry Run: encoded = "abcdef", rows = 2. 2x3 grid: abc / def. Diagonals from each start column: a+e, b+f, c. Result "aebfc" after trimEnd.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var decodeCiphertext = function (encodedMessage, matrixRows) {
  if (matrixRows === 1) {
    return encodedMessage;
  }

  const encodedLength = encodedMessage.length;
  const totalColumns = encodedLength / matrixRows;
  let decodedResult = "";

  for (
    let startColumnIndex = 0;
    startColumnIndex < totalColumns;
    startColumnIndex++
  ) {
    let currentDiagonalStep = 0;
    while (
      currentDiagonalStep < matrixRows &&
      currentDiagonalStep + startColumnIndex < totalColumns
    ) {
      const currentMatrixRow = currentDiagonalStep;
      const currentMatrixColumn = startColumnIndex + currentDiagonalStep;
      const characterSourceIndex =
        currentMatrixRow * totalColumns + currentMatrixColumn;
      decodedResult += encodedMessage[characterSourceIndex];
      currentDiagonalStep++;
    }
  }

  return decodedResult.trimEnd();
};
