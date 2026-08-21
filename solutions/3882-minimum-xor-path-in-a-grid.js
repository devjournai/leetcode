/**
 * Minimum XOR Path in a Grid
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: grid = [[1,2],[3,4]] => Output: 6
 * Time Complexity: O(M N * 1024)
 * Space Complexity: O(M N * 1024)
 */
var minXorPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => new Uint8Array(1024))
  );
  dp[0][0][grid[0][0]] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let x = 0; x < 1024; x++) {
        if (!dp[i][j][x]) continue;
        if (i + 1 < m) dp[i + 1][j][x ^ grid[i + 1][j]] = 1;
        if (j + 1 < n) dp[i][j + 1][x ^ grid[i][j + 1]] = 1;
      }
    }
  }
  for (let x = 0; x < 1024; x++) if (dp[m - 1][n - 1][x]) return x;
  return 0;
};
