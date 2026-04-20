/**
 * Count Submatrices With Equal Frequency of X and Y
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
