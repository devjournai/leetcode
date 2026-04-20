/**
 * Matrix Diagonal Sum
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var diagonalSum = function (mat) {
  const matrixDimension = mat.length;
  let totalDiagonalSum = 0;
  let currentLeft = 0;
  let currentRight = matrixDimension - 1;

  while (currentLeft < matrixDimension) {
    totalDiagonalSum += mat[currentLeft][currentLeft];
    totalDiagonalSum += mat[currentLeft][currentRight];

    if (currentLeft === currentRight) {
      totalDiagonalSum -= mat[currentLeft][currentLeft];
    }

    currentLeft++;
    currentRight--;
  }

  return totalDiagonalSum;
};
