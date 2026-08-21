/**
 * Minimum Cost Path with Teleportations
 * Intuition: Moves go toward the origin from the destination, paying the cell you leave. Up to k teleports assign each value-group the best remaining cost among all cells with value less than or equal to it.
 * Approach: 1. Group cells by value and sort unique values. 2. dp[m-1][n-1]=0. 3. For teleport layer 0..k: propagate left/up paying currentVal; track min leftover cost per value. 4. If more teleports remain, scan values ascending and set every cell of that value to the running min leftover cost.
 * Dry Run: 1×2 grid [1, 2], k = 1. From dest cost 0, left move pays 2 so dp[0][0]=2; teleport can copy min leftover of smaller values onto larger groups.
 * Time Complexity: O(MN * (k + log(MN)))
 * Space Complexity: O(MN)
 */
var minCost = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;

  const groups = new Map();
  const uniqueValues = [];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const val = grid[r][c];
      if (!groups.has(val)) {
        groups.set(val, []);
        uniqueValues.push(val);
      }
      groups.get(val).push([r, c]);
    }
  }

  uniqueValues.sort((a, b) => a - b);

  let dp = Array.from({ length: m }, () => new Float64Array(n).fill(Infinity));
  dp[m - 1][n - 1] = 0;

  const min_vals = new Map();

  for (let i = 0; i <= k; i++) {
    min_vals.clear();

    for (let r = m - 1; r >= 0; r--) {
      for (let c = n - 1; c >= 0; c--) {
        const currentVal = grid[r][c];
        let cost = dp[r][c];
        if (cost !== Infinity) {
          const newCost = cost + currentVal;
          if (r > 0) {
            if (newCost < dp[r - 1][c]) dp[r - 1][c] = newCost;
          }
          if (c > 0) {
            if (newCost < dp[r][c - 1]) dp[r][c - 1] = newCost;
          }

          if (!min_vals.has(currentVal) || cost < min_vals.get(currentVal)) {
            min_vals.set(currentVal, cost);
          }
        }
      }
    }

    if (i === k) break;
    let global_min = Infinity;
    for (const val of uniqueValues) {
      if (min_vals.has(val)) {
        global_min = Math.min(global_min, min_vals.get(val));
      }

      if (global_min !== Infinity) {
        const cells = groups.get(val);
        for (let j = 0; j < cells.length; j++) {
          const [r, c] = cells[j];
          dp[r][c] = global_min;
        }
      }
    }
  }

  return dp[0][0];
};
