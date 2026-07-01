/**
 * Find the Safest Path in a Grid
 * Intuition: The problem asks for the "maximum of minimums" (maximum safeness factor among all paths, where safeness factor is the minimum distance to a thief on that path). This pattern often indicates that binary search can be applied to the answer.
 *
 * Approach:
 * 1. Precompute `distToThief` for all cells:
 *    First, calculate the minimum Manhattan distance from every cell `(r, c)` to its nearest thief. This can be efficiently done using a multi-source Breadth-First Search (BFS). Initialize a 2D array `distToThief` where `distToThief[r][c]` will store this minimum distance. Start the BFS by adding all cells containing a thief (`grid[r][c] = 1`) to a queue and setting their `distToThief` value to 0. Then, expand outwards: for each cell popped from the queue, its unvisited neighbors get a distance of `current_distance + 1` and are added to the queue.
 *
 * 2. Binary Search on the Safeness Factor:
 *    The maximum possible safeness factor can range from 0 (if the path must go through a thief or immediately adjacent to one) up to `2 * (n - 1)` (the maximum Manhattan distance in an `n x n` grid). We can binary search over this range for the answer.
 *
 *    For a given `safenessThreshold` (the `mid` value in binary search), we need to check if a path exists from `(0, 0)` to `(n - 1, n - 1)` such that *every* cell `(r, c)` on this path satisfies `distToThief[r][c] >= safenessThreshold`. This check can be performed using another BFS.
 *
 *    The `canReach(safenessThreshold)` function:
 *    - Initialize a new queue for this BFS and a `visited` 2D array.
 *    - Before starting the BFS, check if `distToThief[0][0]` or `distToThief[n-1][n-1]` is less than `safenessThreshold`. If so, a path is impossible, return `false` immediately. This handles cases where the start or end cell itself is too close to a thief.
 *    - Add `(0, 0)` to the queue and mark it visited.
 *    - While the queue is not empty, dequeue a cell `(r, c)`.
 *    - If `(r, c)` is `(n - 1, n - 1)`, a valid path is found, return `true`.
 *    - For each unvisited, valid neighbor `(nr, nc)`: if `distToThief[nr][nc] >= safenessThreshold`, mark it visited and enqueue it.
 *    - If the BFS completes without reaching `(n - 1, n - 1)`, return `false`.
 *
 *    The binary search iteratively calls `canReach`. If `canReach(mid)` is true, it means `mid` is a possible safeness factor, so we store `mid` as a potential answer and try for a higher factor (`low = mid + 1`). If `canReach(mid)` is false, `mid` is too high, so we try a lower factor (`high = mid - 1`).
 *
 * Dry Run: Example 2: grid = [[0,0,1],[0,0,0],[0,0,0]], n=3
 *
 * 1. Precompute `distToThief`:
 *    - Queue: `[[0,2]]` (thief at (0,2)). `distToThief[0][2] = 0`.
 *    - BFS step by step:
 *      - Pop `[0,2]`. Neighbors: `[0,1]` (dist 1), `[1,2]` (dist 1). Add to queue.
 *      - `distToThief`: `[[INF,1,0],[INF,INF,1],[INF,INF,INF]]` (conceptually)
 *      - Queue: `[[0,1],[1,2]]`
 *      - Pop `[0,1]`. Neighbors: `[0,0]` (dist 2), `[1,1]` (dist 2), `[0,2]` (visited). Add to queue.
 *      - `distToThief`: `[[2,1,0],[INF,2,1],[INF,INF,INF]]`
 *      - Queue: `[[1,2],[0,0],[1,1]]`
 *      - ... and so on.
 *    - Final `distToThief`:
 *      `[[2,1,0],`
 *      ` [3,2,1],`
 *      ` [4,3,2]]`
 *
 * 2. Binary Search:
 *    - `low = 0`, `high = 2 * (3-1) = 4`. `ans = 0`.
 *    - Iteration 1: `mid = 2`.
 *      - `canReach(2)`:
 *        - `distToThief[0][0]=2`, `distToThief[2][2]=2`. Both `>= 2`. OK to start/end.
 *        - Path BFS from `(0,0)`:
 *          - Only move to `(r,c)` if `distToThief[r][c] >= 2`.
 *          - `(0,0)` (dist 2) -> `(1,0)` (dist 3) -> `(1,1)` (dist 2) -> `(2,1)` (dist 3) -> `(2,2)` (dist 2).
 *          - Reaches `(2,2)`. Returns `true`.
 *      - `ans = 2`. `low = 2 + 1 = 3`.
 *    - Iteration 2: `low = 3`, `high = 4`. `mid = Math.floor((3+4)/2) = 3`.
 *      - `canReach(3)`:
 *        - `distToThief[0][0]=2`. `2 < 3`. Returns `false` immediately.
 *      - `high = 3 - 1 = 2`.
 *    - Iteration 3: `low = 3`, `high = 2`. Loop condition `low <= high` is `false`.
 *
 * Return `ans = 2`. Matches example output.
 *
 * Time Complexity: O(N^2 * log(N))
 * Space Complexity: O(N^2)
 */
var maximumSafenessFactor = function (grid) {
  const n = grid.length;
  const distToThief = Array(n)
    .fill(0)
    .map(() => Array(n).fill(-1));
  const q = [];

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        q.push([r, c]);
        distToThief[r][c] = 0;
      }
    }
  }

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let head = 0;
  while (head < q.length) {
    const [r, c] = q[head++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (
        nr >= 0 &&
        nr < n &&
        nc >= 0 &&
        nc < n &&
        distToThief[nr][nc] === -1
      ) {
        distToThief[nr][nc] = distToThief[r][c] + 1;
        q.push([nr, nc]);
      }
    }
  }

  let low = 0;
  let high = 2 * (n - 1);
  let ans = 0;

  const canReach = (safenessThreshold) => {
    if (
      distToThief[0][0] < safenessThreshold ||
      distToThief[n - 1][n - 1] < safenessThreshold
    ) {
      return false;
    }

    const pathQ = [[0, 0]];
    const visited = Array(n)
      .fill(0)
      .map(() => Array(n).fill(false));
    visited[0][0] = true;
    let pathHead = 0;

    while (pathHead < pathQ.length) {
      const [r, c] = pathQ[pathHead++];

      if (r === n - 1 && c === n - 1) {
        return true;
      }

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (
          nr >= 0 &&
          nr < n &&
          nc >= 0 &&
          nc < n &&
          !visited[nr][nc] &&
          distToThief[nr][nc] >= safenessThreshold
        ) {
          visited[nr][nc] = true;
          pathQ.push([nr, nc]);
        }
      }
    }
    return false;
  };

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canReach(mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
};
