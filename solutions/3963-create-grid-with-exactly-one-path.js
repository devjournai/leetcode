/**
 * Create Grid With Exactly One Path
 * Intuition: We construct the grid as follows:
 * Approach: We construct the grid as follows: - First, construct a grid filled entirely with #. - Set all elements in the first row to .. - Set all elements in the last column to .. - Return the constructed grid.
 * Dry Run: Input: m = 2, n = 3. Output: ["..#","#.."].
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var createGrid = function (m, n) {
  const g = Array.from({ length: m }, () => Array(n).fill("#"));

  g[0].fill(".");

  for (let i = 0; i < m; i++) {
    g[i][n - 1] = ".";
  }

  return g.map((row) => row.join(""));
};
