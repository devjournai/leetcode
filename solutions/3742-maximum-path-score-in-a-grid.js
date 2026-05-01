/**
 * Maximum Path Score in a Grid
 * Time Complexity: O(m * n * k)
 * Space Complexity: O(n * k)
 */
var maxPathScore = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;

  const scoreMap = { 0: 0, 1: 1, 2: 2 };
  const costMap = { 0: 0, 1: 1, 2: 1 };

  let dp = Array(n)
    .fill(0)
    .map(() => Array(k + 1).fill(-1));

  dp[0][0] = 0;

  for (let c = 1; c < n; c++) {
    const cellVal = grid[0][c];
    const cellScore = scoreMap[cellVal];
    const cellCost = costMap[cellVal];

    for (let prevCost = 0; prevCost <= k; prevCost++) {
      if (dp[c - 1][prevCost] !== -1) {
        const newCost = prevCost + cellCost;
        if (newCost <= k) {
          const newScore = dp[c - 1][prevCost] + cellScore;
          dp[c][newCost] = Math.max(dp[c][newCost], newScore);
        }
      }
    }
  }

  for (let r = 1; r < m; r++) {
    const nextRowDp = Array(n)
      .fill(0)
      .map(() => Array(k + 1).fill(-1));

    for (let c = 0; c < n; c++) {
      const cellVal = grid[r][c];
      const cellScore = scoreMap[cellVal];
      const cellCost = costMap[cellVal];

      for (let currentCost = 0; currentCost <= k; currentCost++) {
        let maxScoreForCurrentCellCost = -1;

        const prevCostFromUp = currentCost - cellCost;
        if (prevCostFromUp >= 0 && dp[c][prevCostFromUp] !== -1) {
          maxScoreForCurrentCellCost = Math.max(
            maxScoreForCurrentCellCost,
            dp[c][prevCostFromUp] + cellScore,
          );
        }

        if (c > 0) {
          const prevCostFromLeft = currentCost - cellCost;
          if (
            prevCostFromLeft >= 0 &&
            nextRowDp[c - 1][prevCostFromLeft] !== -1
          ) {
            maxScoreForCurrentCellCost = Math.max(
              maxScoreForCurrentCellCost,
              nextRowDp[c - 1][prevCostFromLeft] + cellScore,
            );
          }
        }

        nextRowDp[c][currentCost] = maxScoreForCurrentCellCost;
      }
    }
    dp = nextRowDp;
  }

  let maxOverallScore = -1;
  for (let cost = 0; cost <= k; cost++) {
    maxOverallScore = Math.max(maxOverallScore, dp[n - 1][cost]);
  }

  return maxOverallScore;
};
