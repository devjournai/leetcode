/**
 * Find the Minimum Area to Cover All Ones II
 * Intuition: Three non-overlapping rectangles covering all 1s come from splitting the grid into three blocks: T/L shapes (one full strip plus a perpendicular split of the remainder) or three parallel strips. Minimize the sum of each block's bounding-box area.
 * Approach: 1. Helper `minimumArea(si,ei,sj,ej)` returns the bounding-box area of 1s in that subgrid (0 if empty). 2. Try all splits: top strip + left/right below; bottom strip + left/right above; left strip + top/bottom to the right; right strip + top/bottom to the left; three horizontal strips; three vertical strips. 3. Return the minimum sum.
 * Dry Run: grid = [[1,0,1],[1,1,1]]
 *   Three 1x1 (or 1x1 + 1x1 + 1x2) covers exist; one optimal is area 5
 * Time Complexity: O(m^2 n^2)
 * Space Complexity: O(1)
 */
var minimumSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let ans = m * n;

  for (let i = 0; i < m; i++) {
    const top = minimumArea(grid, 0, i, 0, n - 1);
    for (let j = 0; j < n; j++) {
      ans = Math.min(
        ans,
        top +
          minimumArea(grid, i + 1, m - 1, 0, j) +
          minimumArea(grid, i + 1, m - 1, j + 1, n - 1)
      );
    }
  }

  for (let i = 0; i < m; i++) {
    const bottom = minimumArea(grid, i, m - 1, 0, n - 1);
    for (let j = 0; j < n; j++) {
      ans = Math.min(
        ans,
        bottom +
          minimumArea(grid, 0, i - 1, 0, j) +
          minimumArea(grid, 0, i - 1, j + 1, n - 1)
      );
    }
  }

  for (let j = 0; j < n; j++) {
    const left = minimumArea(grid, 0, m - 1, 0, j);
    for (let i = 0; i < m; i++) {
      ans = Math.min(
        ans,
        left +
          minimumArea(grid, 0, i, j + 1, n - 1) +
          minimumArea(grid, i + 1, m - 1, j + 1, n - 1)
      );
    }
  }

  for (let j = 0; j < n; j++) {
    const right = minimumArea(grid, 0, m - 1, j, n - 1);
    for (let i = 0; i < m; i++) {
      ans = Math.min(
        ans,
        right +
          minimumArea(grid, 0, i, 0, j - 1) +
          minimumArea(grid, i + 1, m - 1, 0, j - 1)
      );
    }
  }

  for (let i1 = 0; i1 < m; i1++) {
    for (let i2 = i1 + 1; i2 < m; i2++) {
      ans = Math.min(
        ans,
        minimumArea(grid, 0, i1, 0, n - 1) +
          minimumArea(grid, i1 + 1, i2, 0, n - 1) +
          minimumArea(grid, i2 + 1, m - 1, 0, n - 1)
      );
    }
  }

  for (let j1 = 0; j1 < n; j1++) {
    for (let j2 = j1 + 1; j2 < n; j2++) {
      ans = Math.min(
        ans,
        minimumArea(grid, 0, m - 1, 0, j1) +
          minimumArea(grid, 0, m - 1, j1 + 1, j2) +
          minimumArea(grid, 0, m - 1, j2 + 1, n - 1)
      );
    }
  }

  return ans;

  function minimumArea(g, si, ei, sj, ej) {
    let x1 = Infinity;
    let y1 = Infinity;
    let x2 = 0;
    let y2 = 0;
    for (let i = si; i <= ei; i++) {
      for (let j = sj; j <= ej; j++) {
        if (g[i][j] === 1) {
          x1 = Math.min(x1, i);
          y1 = Math.min(y1, j);
          x2 = Math.max(x2, i);
          y2 = Math.max(y2, j);
        }
      }
    }
    return x1 === Infinity ? 0 : (x2 - x1 + 1) * (y2 - y1 + 1);
  }
};
