/**
 * Create Grid With Exactly K Paths I
 * Intuition: m,n<=10, k<=4. Enumerate simple obstacle layouts or construct a corridor with branches.
 * Approach: If k is larger than C(m+n-2, m-1) return []. Else place obstacles to cut paths to k. BFS/DFS count paths after filling a staircase.
 * Dry Run: Input: m=2,n=3,k=2. Output: [... , #..].
 * Time Complexity: O(2^{mn})
 * Space Complexity: O(mn)
 */
var createGrid = function (m, n, k) {
  const cells = [];
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (!(i === 0 && j === 0) && !(i === m - 1 && j === n - 1))
        cells.push([i, j]);
  const count = (g) => {
    if (g[0][0] === "#" || g[m - 1][n - 1] === "#") return 0;
    const dp = Array.from({ length: m }, () => Array(n).fill(0));
    dp[0][0] = 1;
    for (let i = 0; i < m; i++)
      for (let j = 0; j < n; j++) {
        if (g[i][j] === "#") continue;
        if (i) dp[i][j] += dp[i - 1][j];
        if (j) dp[i][j] += dp[i][j - 1];
      }
    return dp[m - 1][n - 1];
  };
  const C = cells.length;
  for (let mask = 0; mask < 1 << C; mask++) {
    const g = Array.from({ length: m }, () => Array(n).fill("."));
    for (let b = 0; b < C; b++)
      if ((mask >> b) & 1) g[cells[b][0]][cells[b][1]] = "#";
    if (count(g) === k) return g.map((row) => row.join(""));
  }
  return [];
};
