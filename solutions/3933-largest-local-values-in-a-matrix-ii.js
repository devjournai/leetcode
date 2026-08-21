/**
 * Largest Local Values in a Matrix II
 * Intuition: A non-zero cell x is a local max if no considered neighbor in the x-radius diamond-without-corners exceeds x.
 * Approach: 1. For each non-zero cell, scan the window of radius x skipping the four corners at Chebyshev? Problem: cells within x rows AND x columns, ignore those with both distances exactly x. 2. Count cells that pass.
 * Dry Run: Input: 7x7 with 2 at center. Output: 1.
 * Time Complexity: O(sum x^2)
 * Space Complexity: O(1)
 */
var countLocalMaximums = function (matrix) {
  const n = matrix.length,
    m = matrix[0].length;
  let ans = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      const x = matrix[r][c];
      if (x === 0) continue;
      let ok = true;
      for (let i = r - x; i <= r + x && ok; i++) {
        for (let j = c - x; j <= c + x; j++) {
          if (i < 0 || j < 0 || i >= n || j >= m) continue;
          const dr = Math.abs(i - r),
            dc = Math.abs(j - c);
          if (dr === x && dc === x) continue;
          if (matrix[i][j] > x) {
            ok = false;
            break;
          }
        }
      }
      if (ok) ans++;
    }
  }
  return ans;
};
