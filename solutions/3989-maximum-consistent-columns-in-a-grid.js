/**
 * Maximum Consistent Columns in a Grid
 * Intuition: Remaining columns must have adjacent remaining pairs within limit on every row. This is longest path in a DAG of columns where edge i->j (i<j) if all rows satisfy |g[r][j]-g[r][i]|<=limit.
 * Approach: DP: best[j] = 1+max best[i] over i<j compatible(i,j). n<=250.
 * Dry Run: Input: grid=[[-2,0,3]], limit=2. Output: 2.
 * Time Complexity: O(N^2 M)
 * Space Complexity: O(N)
 */
var maxConsistentColumns = function (grid, limit) {
  const m = grid.length,
    n = grid[0].length;
  const ok = (a, b) => {
    for (let i = 0; i < m; i++)
      if (Math.abs(grid[i][b] - grid[i][a]) > limit) return false;
    return true;
  };
  const dp = Array(n).fill(1);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < j; i++)
      if (ok(i, j)) dp[j] = Math.max(dp[j], dp[i] + 1);
  }
  return Math.max(...dp);
};
