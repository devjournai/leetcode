/**
 * Count Routes to Climb a Rectangular Grid
 * Intuition: Moves go to the same row or one row up, Euclidean distance <= d, and two consecutive same-row moves are forbidden. Process rows from the bottom, first placing an optional same-row hop then a required up-move.
 * Approach: Maintain dp[col] = ways to be at the current row in that column. Sliding-window sums of width 2d+1 add ways from columns within Chebyshev/Euclidean-feasible range (here |dc| <= d since dr is 0 or 1). Blocked cells stay 0. Sum the top row.
 * Dry Run: grid = ["..","#."], d = 1. From bottom-right we can go up to top-right, optionally after a same-row stay, for 2 routes.
 * Time Complexity: O(N * M)
 * Space Complexity: O(M)
 */
var numberOfRoutes = function (grid, d) {
  const MOD = 1e9 + 7;
  const update = (dp, dist, arr) => {
    const m = arr.length;
    const newDp = Array(m).fill(0);
    let curr = 0;
    for (let i = 0; i < Math.min(dist, m); i++) {
      curr = (curr + dp[i]) % MOD;
    }
    for (let i = 0; i < m; i++) {
      if (i - dist - 1 >= 0) {
        curr = (curr - dp[i - dist - 1] + MOD) % MOD;
      }
      if (i + dist < m) {
        curr = (curr + dp[i + dist]) % MOD;
      }
      newDp[i] = arr[i] === "." ? curr : 0;
    }
    return newDp;
  };

  let dp = Array(grid[0].length).fill(1);
  for (let i = grid.length - 1; i >= 0; i--) {
    dp = update(dp, i !== grid.length - 1 ? d - 1 : 0, grid[i]);
    dp = update(dp, d, grid[i]);
  }
  return dp.reduce((a, x) => (a + x) % MOD, 0);
};
