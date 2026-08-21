/**
 * Maximum Area of Two Non-Overlapping Square Submatrices
 * Intuition: Two non-overlapping axis-aligned rectangles can always be separated by a horizontal line or a vertical line (their row intervals or column intervals must be disjoint). Therefore, we only need to consider the case where one square lies entirely above some horizontal dividing line and the other below it, and the case where one lies entirely to the left of some vertical dividing line and the other to its right. The latter can be handled by transposing the matrix and reusing the logic of the former.
 * Approach: Two non-overlapping axis-aligned rectangles can always be separated by a horizontal line or a vertical line (their row intervals or column intervals must be disjoint). Therefore, we only need to consider the case where one square lies entirely above some horizontal dividing line and the other below it, and the case where one lies entirely to the left of some vertical dividing line and the other to its right. The latter can be handled by transposing the matrix and reusing the logic of the former. For the horizontal case, we design a function calc(mat): - Bottom-up dynamic programming: let f[i][j] be the maximum side length of an all-1 square with top-left corner at (i, j). If mat[i][j] = 1, then f[i][j] = min(f[i+1][j], f[i][j+1], f[i+1][j+1]) + 1. We use g[i] to record the maximum side length in row i, then compute the suffix maximum suf[i] = max(suf[i+1], g[i]), which represents the maximum side length of an all-1 square within rows [i, m). - Top-down dynamic programming: let f[i][j] be the maximum side length of an all-1 square with bottom-right corner at (i-1, j-1). If mat[i-1][j-1] = 1, then f[i][j] = min(f[i-1][j], f[i][j-1], f[i-1][j-1]) + 1. Similarly, we compute the prefix maximum pre[i] = max(pre[i-1], g[i]), which represents the maximum side length of an all-1 square within rows [0, i). - Enumerate the dividing line i in [1, m) between every pair of adjacent rows. The maximum side length of an all-1 square above the line is pre[i], and below it is suf[i]. Since the two squares must have equal side lengths, the feasible side length is t = min(pre[i], suf[i]), and we update the answer with t^2.
 * Dry Run: Input: mat = [[1,1,1,0],[1,1,1,1],[0,0,1,1]]. Output: 4.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var maxArea = function (mat) {
  return Math.max(calc(mat), calc(transpose(mat)));
};
var calc = function (mat) {
  const m = mat.length;
  const n = mat[0].length;

  let f = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  let g = Array(m + 1).fill(0);
  let suf = Array(m + 1).fill(0);

  for (let i = m - 1; i > 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (mat[i][j]) {
        f[i][j] = Math.min(f[i + 1][j], f[i][j + 1], f[i + 1][j + 1]) + 1;
        g[i] = Math.max(g[i], f[i][j]);
      }
    }
    suf[i] = Math.max(suf[i + 1], g[i]);
  }

  f = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  g = Array(m + 1).fill(0);
  const pre = Array(m + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (mat[i - 1][j - 1]) {
        f[i][j] = Math.min(f[i - 1][j], f[i][j - 1], f[i - 1][j - 1]) + 1;
        g[i] = Math.max(g[i], f[i][j]);
      }
    }
    pre[i] = Math.max(pre[i - 1], g[i]);
  }

  let ans = 0;
  for (let i = 1; i < m; i++) {
    const t = Math.min(pre[i], suf[i]);
    ans = Math.max(ans, t * t);
  }
  return ans;
};
var transpose = function (mat) {
  const m = mat.length;
  const n = mat[0].length;

  const ans = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans[j][i] = mat[i][j];
    }
  }
  return ans;
};
