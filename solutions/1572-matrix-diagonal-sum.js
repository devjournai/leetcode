/**
 * Matrix Diagonal Sum
 * Intuition: Add primary and secondary diagonals; subtract the center once when n is odd.
 * Approach: 1. For i from 0..n-1 add mat[i][i] and mat[i][n-1-i]. 2. If i==n-1-i subtract the double-counted cell.
 * Dry Run: mat = [[1,2,3],[4,5,6],[7,8,9]].
 *   - 1+5+9 + 3+5+7 - 5 = 25.
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
