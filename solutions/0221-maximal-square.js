/**
 * Maximal Square
 * Time Complexity: O(m*n)
 * Space Complexity: O(n)
 */
var maximalSquare = function (matrix) {
  const rowCount = matrix.length;
  if (rowCount === 0) return 0;
  const colCount = matrix[0].length;
  const stateLine = new Array(colCount + 1).fill(0);
  let largestSide = 0;
  let prevDiagonal = 0;
  let rowIndex = 1;
  while (rowIndex <= rowCount) {
    let colIndex = 1;
    prevDiagonal = 0;
    while (colIndex <= colCount) {
      const tempStore = stateLine[colIndex];
      if (matrix[rowIndex - 1][colIndex - 1] === '1') {
        const topValue = stateLine[colIndex];
        const leftValue = stateLine[colIndex - 1];
        const diagonalValue = prevDiagonal;
        const currentSide = Math.min(topValue, leftValue, diagonalValue) + 1;
        stateLine[colIndex] = currentSide;
        if (currentSide > largestSide) {
          largestSide = currentSide;
        }
      } else {
        stateLine[colIndex] = 0;
      }
      prevDiagonal = tempStore;
      colIndex++;
    }
    rowIndex++;
  }
  return largestSide * largestSide;
};
