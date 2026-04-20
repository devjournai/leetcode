/**
 * Minimum Number Of Flips To Convert Binary Matrix To Zero Matrix
 * Time Complexity: O(2^(M*N) * M*N)
 * Space Complexity: O(2^(M*N))
 */
var minFlips = function (mat) {
  const matrixRows = mat.length;
  const matrixCols = mat[0].length;
  const targetState = 0;

  let initialMatrixValue = 0;
  for (let firstRowIter = 0; firstRowIter < matrixRows; firstRowIter++) {
    for (let firstColIter = 0; firstColIter < matrixCols; firstColIter++) {
      if (mat[firstRowIter][firstColIter] === 1) {
        initialMatrixValue |= 1 << (firstRowIter * matrixCols + firstColIter);
      }
    }
  }

  const stateQueue = [[initialMatrixValue, 0]];
  const visitedStates = new Set([initialMatrixValue]);

  const neighborOffsets = [
    [0, 0],
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (stateQueue.length > 0) {
    const [currentMatrixState, currentFlipCount] = stateQueue.shift();

    if (currentMatrixState === targetState) {
      return currentFlipCount;
    }

    for (let flipRowIter = 0; flipRowIter < matrixRows; flipRowIter++) {
      for (let flipColIter = 0; flipColIter < matrixCols; flipColIter++) {
        let transformedState = currentMatrixState;

        for (const [drOffset, dcOffset] of neighborOffsets) {
          const adjacentRowPos = flipRowIter + drOffset;
          const adjacentColPos = flipColIter + dcOffset;

          if (
            adjacentRowPos >= 0 &&
            adjacentRowPos < matrixRows &&
            adjacentColPos >= 0 &&
            adjacentColPos < matrixCols
          ) {
            const cellBitPosition =
              adjacentRowPos * matrixCols + adjacentColPos;
            transformedState ^= 1 << cellBitPosition;
          }
        }

        if (!visitedStates.has(transformedState)) {
          visitedStates.add(transformedState);
          stateQueue.push([transformedState, currentFlipCount + 1]);
        }
      }
    }
  }

  return -1;
};
