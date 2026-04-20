/**
 * Path With Maximum Minimum Value
 * Time Complexity: O(M * N * log(MinInitialValue))
 * Space Complexity: O(M * N)
 */
var maximumMinimumPath = function (grid) {
  const numberOfRows = grid.length;
  const numberOfCols = grid[0].length;

  const checkIfPathExists = (scoreThreshold) => {
    const matrixRows = grid.length;
    const matrixCols = grid[0].length;

    if (
      grid[0][0] < scoreThreshold ||
      grid[matrixRows - 1][matrixCols - 1] < scoreThreshold
    ) {
      return false;
    }

    const visitedStates = Array(matrixRows)
      .fill(null)
      .map(() => Array(matrixCols).fill(false));
    const movementSteps = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    const traversalQueue = [];

    traversalQueue.push([0, 0]);
    visitedStates[0][0] = true;

    while (traversalQueue.length > 0) {
      const [currentR, currentC] = traversalQueue.shift();

      if (currentR === matrixRows - 1 && currentC === matrixCols - 1) {
        return true;
      }

      for (const [rowChange, colChange] of movementSteps) {
        const nextR = currentR + rowChange;
        const nextC = currentC + colChange;

        if (
          nextR >= 0 &&
          nextR < matrixRows &&
          nextC >= 0 &&
          nextC < matrixCols &&
          !visitedStates[nextR][nextC] &&
          grid[nextR][nextC] >= scoreThreshold
        ) {
          visitedStates[nextR][nextC] = true;
          traversalQueue.push([nextR, nextC]);
        }
      }
    }
    return false;
  };

  let lowerBound = 0;
  let upperBound = Math.min(
    grid[0][0],
    grid[numberOfRows - 1][numberOfCols - 1],
  );
  let ultimateResult = 0;

  while (lowerBound <= upperBound) {
    const potentialScore = Math.floor((lowerBound + upperBound) / 2);

    if (checkIfPathExists(potentialScore)) {
      ultimateResult = potentialScore;
      lowerBound = potentialScore + 1;
    } else {
      upperBound = potentialScore - 1;
    }
  }

  return ultimateResult;
};
