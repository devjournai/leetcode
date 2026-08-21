/**
 * Maximal Square
 * Intuition: The largest square of 1s ending at a cell is 1 plus the min of the squares ending at top, left, and top-left. One rolling row plus a saved diagonal implements that DP in O(n) extra space.
 * Approach: 1. stateLine[j] is the DP value for the previous row at column j. 2. For each cell '1', new side = min(top, left, prevDiagonal)+1; on '0' store 0. 3. Track prevDiagonal as the old stateLine[j] before overwrite. 4. Return largestSide squared.
 * Dry Run: matrix = [["1","1"],["1","1"]].
 *   - Row 0: sides 1 then 1; largestSide = 1.
 *   - Row 1 col0: min(1,0,0)+1 = 1; col1: min(1,1,1)+1 = 2; largestSide = 2.
 *   - Return 4.
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
      if (matrix[rowIndex - 1][colIndex - 1] === "1") {
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
