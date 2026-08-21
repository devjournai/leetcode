/**
 * Sequential Grid Path Cover
 * Intuition: We must visit every cell exactly once, moving 4-directionally, and visit values 1, 2, 3, ... in order (0-cells are free). Backtracking from any cell that can start the sequence (0 or 1) finds a Hamiltonian path.
 * Approach: 1. Try each start cell whose value is 0 or 1. 2. DFS: mark visited, increment the next required value when the current cell equals it. 3. Recurse to neighbors that are unvisited and either 0 or the next required number. 4. Return the first full-length path.
 * Dry Run: grid = [[1, 0], [2, 0]], k unused besides signature. Start at (0,0) value 1, then visit remaining 0s and 2 in order. One valid path is (0,0)→(0,1)→(1,1)→(1,0).
 * Time Complexity: O((MN)! / branching) bounded by small grids
 * Space Complexity: O(M * N)
 */
var findPath = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [-1, 0, 1, 0, -1];
  const path = [];
  let visitedMask = 0;

  const cellId = (i, j) => i * n + j;

  const dfs = (i, j, nextValue) => {
    path.push([i, j]);
    if (path.length === m * n) {
      return true;
    }

    visitedMask |= 1 << cellId(i, j);
    if (grid[i][j] === nextValue) {
      nextValue += 1;
    }

    for (let d = 0; d < 4; d++) {
      const x = i + dirs[d];
      const y = j + dirs[d + 1];
      const id = cellId(x, y);
      if (
        x >= 0 &&
        x < m &&
        y >= 0 &&
        y < n &&
        (visitedMask & (1 << id)) === 0 &&
        (grid[x][y] === 0 || grid[x][y] === nextValue)
      ) {
        if (dfs(x, y, nextValue)) {
          return true;
        }
      }
    }

    path.pop();
    visitedMask ^= 1 << cellId(i, j);
    return false;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0 || grid[i][j] === 1) {
        visitedMask = 0;
        path.length = 0;
        if (dfs(i, j, 1)) {
          return path;
        }
      }
    }
  }

  return [];
};
