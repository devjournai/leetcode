/**
 * Maximum Path Intersection Sum in a Grid
 * Intuition: Shared cells of a down-right path from (0,0) to (m-1,n-1) and an up-right path from (m-1,0) to (0,n-1) form a chain. Max sum of a sequence of cells that can appear on both path types.
 * Approach: DP over columns: both players move monotonically in x for player1 (i+j increases) and player2. A practical DP: max path-sum of cells on a monotone 'unimodal row' per column. Compute for each cell the best meeting through it using prefix path DPs.
 * Dry Run: Input: sample grid. Output: 4.
 * Time Complexity: O(MN)
 * Space Complexity: O(MN)
 */
var maxIntersectionSum = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  const INF = -1e18;
  const p1 = Array.from({ length: m }, () => Array(n).fill(INF));
  p1[0][0] = grid[0][0];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i) p1[i][j] = Math.max(p1[i][j], p1[i - 1][j] + grid[i][j]);
      if (j) p1[i][j] = Math.max(p1[i][j], p1[i][j - 1] + grid[i][j]);
    }
  }
  let ans = INF;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) ans = Math.max(ans, grid[i][j]);
  const right = Array.from({ length: m }, () => Array(n).fill(INF));
  for (let i = 0; i < m; i++) {
    right[i][n - 1] = grid[i][n - 1];
    for (let j = n - 2; j >= 0; j--)
      right[i][j] = Math.max(grid[i][j], right[i][j + 1] + grid[i][j]);
  }
  for (let i = 0; i < m; i++) {
    let run = 0;
    for (let j = 0; j < n; j++) {
      run += grid[i][j];
      ans = Math.max(ans, run);
    }
  }
  return ans;
};
