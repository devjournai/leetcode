/**
 * Determine Whether Matrix Can Be Obtained By Rotation
 * Intuition: At most four 90° clockwise rotations can match `target`. Compare JSON snapshots after each rotate.
 * Approach: 1. Copy `mat` to `currentMatrixState`. 2. Up to 4 times: stringify-compare to target; else `performRotation` (reverse rows then transpose). 3. Return false if none match.
 * Dry Run: mat=[[0,1],[1,0]], target=[[1,0],[0,1]]. One 90° rotation matches. Return true.
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
