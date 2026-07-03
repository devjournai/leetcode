/**
 * Disconnect Path in a Binary Matrix by at Most One Flip
 *
 * Intuition:
 * We can only move right or down.
 *
 * If there is already no path from the start to the destination,
 * the grid is already disconnected.
 *
 * Otherwise:
 * - Find one valid path.
 * - Remove (flip) every internal cell on that path.
 * - Check whether another path still exists.
 *
 * If another path exists, then there are at least two disjoint paths,
 * so removing one cell cannot disconnect the grid.
 *
 * Otherwise, removing one internal cell disconnects the only path.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Perform a DFS from (0,0) to (m-1,n-1).
 *
 *      During DFS,
 *      mark every visited cell that belongs to one valid path.
 *
 * 2. If no path exists,
 *      return true.
 *
 * 3. Remove every internal cell on that path
 *      (leave start and destination unchanged).
 *
 * 4. Perform another DFS.
 *
 * 5. If destination is unreachable,
 *      return true.
 *
 *    Otherwise,
 *      return false.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * grid =
 *
 * 1 1 1
 * 1 0 0
 * 1 1 1
 *
 * First DFS finds:
 *
 * (0,0)
 * ↓
 * (1,0)
 * ↓
 * (2,0)
 * →
 * (2,1)
 * →
 * (2,2)
 *
 * Remove internal cells:
 *
 * (1,0)
 * (2,0)
 * (2,1)
 *
 * Grid becomes:
 *
 * 1 1 1
 * 0 0 0
 * 0 0 1
 *
 * Second DFS:
 *
 * Destination unreachable.
 *
 * Return true.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(M × N)
 * Space Complexity: O(M × N)
 */

var isPossibleToCutPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] === 0) {
      return false;
    }

    if (r === m - 1 && c === n - 1) {
      return true;
    }

    grid[r][c] = 0;

    if (dfs(r + 1, c) || dfs(r, c + 1)) {
      return true;
    }

    return false;
  };

  if (!dfs(0, 0)) {
    return true;
  }
  grid[0][0] = 1;
  return !dfs(0, 0);
};
