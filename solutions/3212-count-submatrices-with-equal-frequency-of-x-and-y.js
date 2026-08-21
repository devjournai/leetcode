/**
 * Count Submatrices With Equal Frequency of X and Y
 * Intuition: Submatrices from (0,0) to (r,c) are valid when they contain at least one X and equally many Y.
 * Approach: Maintain 2D prefix counts of X and Y; for each cell increment the answer if prefixX > 0 and prefixX === prefixY.
 * Dry Run: grid [["X","Y"],["Y","."]] -> cell (0,0) has 1 X 0 Y; (0,1) 1 X 1 Y counts; (1,0) 1 X 1 Y counts; (1,1) 1 X 1 Y counts; answer 3.
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var numberOfSubmatrices = function (grid) {
  const R = grid.length;
  const C = grid[0].length;

  const prefixX = Array(R)
    .fill(0)
    .map(() => Array(C).fill(0));
  const prefixY = Array(R)
    .fill(0)
    .map(() => Array(C).fill(0));

  let ans = 0;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const currentX = grid[r][c] === "X" ? 1 : 0;
      const currentY = grid[r][c] === "Y" ? 1 : 0;

      let prevXUp = r > 0 ? prefixX[r - 1][c] : 0;
      let prevXLeft = c > 0 ? prefixX[r][c - 1] : 0;
      let prevXDiag = r > 0 && c > 0 ? prefixX[r - 1][c - 1] : 0;
      prefixX[r][c] = currentX + prevXUp + prevXLeft - prevXDiag;

      let prevYUp = r > 0 ? prefixY[r - 1][c] : 0;
      let prevYLeft = c > 0 ? prefixY[r][c - 1] : 0;
      let prevYDiag = r > 0 && c > 0 ? prefixY[r - 1][c - 1] : 0;
      prefixY[r][c] = currentY + prevYUp + prevYLeft - prevYDiag;

      if (prefixX[r][c] > 0 && prefixX[r][c] === prefixY[r][c]) {
        ans++;
      }
    }
  }

  return ans;
};
