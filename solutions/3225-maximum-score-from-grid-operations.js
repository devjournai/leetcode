/**
 * Maximum Score From Grid Operations
 * Intuition: After choosing a "white" height for each column, the score comes from black cells between neighboring column heights; DP can carry the previous height and current height.
 * Approach: Precompute column prefix sums S[j][i]. dp[p][c] is the best score after the previous column with heights p and c. For each next column, build prefix/suffix maxima of previous dp into V[K], then nextDp[p][c] = V[max(p,c)] - S[j-1][p]. Finish with the last column's extra black cells S[n-1][max(p,c)] - S[n-1][c].
 * Dry Run: 1x1 grid has no neighboring-column operations, score 0.
 * Time Complexity: O(N³)
 * Space Complexity: O(N²)
 */
var maximumScore = function (grid) {
  const n = grid.length;
  const S = Array.from({ length: n }, () => Array(n + 1).fill(0));

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      S[j][i + 1] = S[j][i] + grid[i][j];
    }
  }

  let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-Infinity));

  for (let c = 0; c <= n; c++) {
    dp[0][c] = 0;
  }

  for (let j = 1; j < n; j++) {
    const nextDp = Array.from({ length: n + 1 }, () =>
      Array(n + 1).fill(-Infinity)
    );

    for (let p = 0; p <= n; p++) {
      const prefMaxG = Array(n + 1).fill(-Infinity);
      let currentMax = -Infinity;
      for (let K = 0; K <= n; K++) {
        if (dp[K][p] > currentMax) currentMax = dp[K][p];
        prefMaxG[K] = currentMax;
      }

      const suffMaxG = Array(n + 2).fill(-Infinity);
      currentMax = -Infinity;
      for (let K = n; K >= 0; K--) {
        const val = dp[K][p] + S[j - 1][K];
        if (val > currentMax) currentMax = val;
        suffMaxG[K] = currentMax;
      }

      const V = Array(n + 1).fill(-Infinity);
      for (let K = 0; K <= n; K++) {
        const option1 = prefMaxG[K] + S[j - 1][K];
        const option2 = suffMaxG[K + 1];
        V[K] = Math.max(option1, option2);
      }

      const minusSp = S[j - 1][p];
      for (let c = 0; c <= n; c++) {
        const K = Math.max(p, c);
        nextDp[p][c] = V[K] - minusSp;
      }
    }
    dp = nextDp;
  }

  let maxScore = 0;
  for (let p = 0; p <= n; p++) {
    for (let c = 0; c <= n; c++) {
      const score = dp[p][c] + S[n - 1][Math.max(p, c)] - S[n - 1][c];
      if (score > maxScore) {
        maxScore = score;
      }
    }
  }

  return maxScore;
};
