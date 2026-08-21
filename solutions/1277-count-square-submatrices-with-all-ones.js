/**
 * Count Square Submatrices With All Ones
 * Intuition: dp[i][j] is the largest square whose bottom-right is (i,j). It is 1+min of up/left/diag if the cell is 1. Summing all dp values counts every square.
 * Approach: 1. Seed first row/col from the matrix, adding 1s to totalSquares. 2. For other cells, if 1 set min(neighbors)+1 and add that to the total. 3. Return totalSquares.
 * Dry Run: matrix = [[1,0],[1,1]]
 *   dp first row [1,0] total 1; first col extra [1] total 2; cell (1,1): min(0,1,1)+1=1, total 3. Return 3.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var countSquares = function (matrix) {
  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;
  const dpMemo = Array.from({ length: matrixHeight }, () =>
    new Array(matrixWidth).fill(0)
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
