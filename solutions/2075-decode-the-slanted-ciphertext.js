/**
 * Decode the Slanted Ciphertext
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
