/**
 * Determine Whether Matrix Can Be Obtained By Rotation
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var findRotation = function (mat, target) {
  const targetRepresentation = JSON.stringify(target);
  let currentMatrixState = mat.map((rowArray) => [...rowArray]);

  let rotationAttemptCount = 0;
  const maximumRotations = 4;

  while (rotationAttemptCount < maximumRotations) {
    const currentMatrixRepresentation = JSON.stringify(currentMatrixState);
    if (currentMatrixRepresentation === targetRepresentation) {
      return true;
    }

    performRotation(currentMatrixState);
    rotationAttemptCount++;
  }

  return false;
};

function performRotation(inputMatrix) {
  inputMatrix.reverse();

  const matrixSideLength = inputMatrix.length;

  for (
    let rowIndexForSwap = 0;
    rowIndexForSwap < matrixSideLength;
    rowIndexForSwap++
  ) {
    for (
      let columnIndexForSwap = rowIndexForSwap + 1;
      columnIndexForSwap < matrixSideLength;
      columnIndexForSwap++
    ) {
      let temporaryValue = inputMatrix[rowIndexForSwap][columnIndexForSwap];
      inputMatrix[rowIndexForSwap][columnIndexForSwap] =
        inputMatrix[columnIndexForSwap][rowIndexForSwap];
      inputMatrix[columnIndexForSwap][rowIndexForSwap] = temporaryValue;
    }
  }
}
