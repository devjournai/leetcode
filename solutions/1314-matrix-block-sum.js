/**
 * Matrix Block Sum
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var matrixBlockSum = function (mat, k) {
  const matrixRows = mat.length;
  const matrixCols = mat[0].length;

  const integralImage = new Array(matrixRows + 1)
    .fill()
    .map(() => new Array(matrixCols + 1).fill(0));

  for (let rowIndex = 0; rowIndex < matrixRows; rowIndex++) {
    for (let colIndex = 0; colIndex < matrixCols; colIndex++) {
      integralImage[rowIndex + 1][colIndex + 1] =
        integralImage[rowIndex + 1][colIndex] +
        integralImage[rowIndex][colIndex + 1] -
        integralImage[rowIndex][colIndex] +
        mat[rowIndex][colIndex];
    }
  }

  const answerMatrix = new Array(matrixRows)
    .fill()
    .map(() => new Array(matrixCols).fill(0));

  for (let rCoord = 0; rCoord < matrixRows; rCoord++) {
    for (let cCoord = 0; cCoord < matrixCols; cCoord++) {
      const topBoundary = Math.max(0, rCoord - k);
      const bottomBoundary = Math.min(matrixRows - 1, rCoord + k);
      const leftBoundary = Math.max(0, cCoord - k);
      const rightBoundary = Math.min(matrixCols - 1, cCoord + k);

      answerMatrix[rCoord][cCoord] =
        integralImage[bottomBoundary + 1][rightBoundary + 1] -
        integralImage[bottomBoundary + 1][leftBoundary] -
        integralImage[topBoundary][rightBoundary + 1] +
        integralImage[topBoundary][leftBoundary];
    }
  }

  return answerMatrix;
};
