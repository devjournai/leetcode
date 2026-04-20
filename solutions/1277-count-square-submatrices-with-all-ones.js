/**
 * Count Square Submatrices With All Ones
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var countSquares = function (matrix) {
  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;
  const dpMemo = Array.from({ length: matrixHeight }, () =>
    new Array(matrixWidth).fill(0),
  );
  let totalSquares = 0;

  for (let colIterator = 0; colIterator < matrixWidth; colIterator++) {
    if (matrix[0][colIterator] === 1) {
      dpMemo[0][colIterator] = 1;
      totalSquares += 1;
    }
  }

  for (let rowIterator = 1; rowIterator < matrixHeight; rowIterator++) {
    if (matrix[rowIterator][0] === 1) {
      dpMemo[rowIterator][0] = 1;
      totalSquares += 1;
    }
  }

  for (let currentX = 1; currentX < matrixHeight; currentX++) {
    for (let currentY = 1; currentY < matrixWidth; currentY++) {
      if (matrix[currentX][currentY] === 1) {
        const valAbove = dpMemo[currentX - 1][currentY];
        const valLeft = dpMemo[currentX][currentY - 1];
        const valDiag = dpMemo[currentX - 1][currentY - 1];
        dpMemo[currentX][currentY] = Math.min(valAbove, valLeft, valDiag) + 1;
        totalSquares += dpMemo[currentX][currentY];
      }
    }
  }

  return totalSquares;
};
