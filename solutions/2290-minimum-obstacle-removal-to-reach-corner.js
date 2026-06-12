/**
 * Minimum Obstacle Removal To Reach Corner
 * Intuition: This problem asks for the minimum cost path on a grid where edges have weights 0 (empty cell) or 1 (obstacle cell). This is a classic shortest path problem on a graph with non-negative edge weights, specifically suitable for a 0-1 Breadth-First Search (BFS) algorithm.
 * Approach: 1. Initialize a 2D array, `minimumObstaclesToCell`, to store the minimum obstacles removed to reach each cell, filled with `Number.MAX_SAFE_INTEGER`. 2. Use a `deque` (simulated by a JavaScript array with `unshift` and `push`) to perform a 0-1 BFS. 3. Add the starting cell (0, 0) to the deque, setting `minimumObstaclesToCell[0][0]` to `grid[0][0]` (the cost of the start cell itself). 4. While the deque is not empty, pop the front element (`currentRow`, `currentCol`). 5. For each of its four neighbors: `nextRow`, `nextCol`. 6. Calculate `newObstacleCost = minimumObstaclesToCell[currentRow][currentCol] + grid[nextRow][nextCol]`. 7. If `newObstacleCost` is less than `minimumObstaclesToCell[nextRow][nextCol]`, update `minimumObstaclesToCell[nextRow][nextCol]` with `newObstacleCost`. If `grid[nextRow][nextCol]` is 0, push the neighbor to the front of the deque (`unshift`), otherwise push to the back (`push`). 8. The first time the destination cell `(gridHeight - 1, gridWidth - 1)` is popped from the deque, its `minimumObstaclesToCell` value is the answer.
 * Dry Run: grid = [[0,1,1],[1,1,0],[1,1,0]]
 *   - gridHeight = 3, gridWidth = 3
 *   - minimumObstaclesToCell = [[inf, inf, inf], [inf, inf, inf], [inf, inf, inf]]
 *   - cellProcessDeque = []
 *   - minimumObstaclesToCell[0][0] = grid[0][0] = 0.
 *   - cellProcessDeque.unshift([0, 0]) -> cellProcessDeque = [[0, 0]]
 *
 *   - Deque: [[0, 0]]
 *     - Pop [0, 0]. currentRow = 0, currentCol = 0. currentCellCost = 0.
 *     - Neighbors:
 *       - [0, 1]: grid[0][1]=1. newCost = 0 + 1 = 1. `1 < minimumObstaclesToCell[0][1]` (inf). Update `minimumObstaclesToCell[0][1] = 1`. grid[0][1] is 1, so `cellProcessDeque.push([0, 1])`. Deque: [[0,1]]
 *       - [1, 0]: grid[1][0]=1. newCost = 0 + 1 = 1. `1 < minimumObstaclesToCell[1][0]` (inf). Update `minimumObstaclesToCell[1][0] = 1`. grid[1][0] is 1, so `cellProcessDeque.push([1, 0])`. Deque: [[0,1], [1,0]]
 *
 *   - Deque: [[0,1], [1,0]]
 *     - Pop [0, 1]. currentRow = 0, currentCol = 1. currentCellCost = 1.
 *     - Neighbors:
 *       - [0, 0]: grid[0][0]=0. newCost = 1 + 0 = 1. `1` is not `< minimumObstaclesToCell[0][0]` (0). Skip.
 *       - [0, 2]: grid[0][2]=1. newCost = 1 + 1 = 2. `2 < minimumObstaclesToCell[0][2]` (inf). Update `minimumObstaclesToCell[0][2] = 2`. grid[0][2] is 1, so `cellProcessDeque.push([0, 2])`. Deque: [[1,0], [0,2]]
 *       - [1, 1]: grid[1][1]=1. newCost = 1 + 1 = 2. `2 < minimumObstaclesToCell[1][1]` (inf). Update `minimumObstaclesToCell[1][1] = 2`. grid[1][1] is 1, so `cellProcessDeque.push([1, 1])`. Deque: [[1,0], [0,2], [1,1]]
 *
 *   - Deque: [[1,0], [0,2], [1,1]]
 *     - Pop [1, 0]. currentRow = 1, currentCol = 0. currentCellCost = 1.
 *     - Neighbors:
 *       - [0, 0]: grid[0][0]=0. newCost = 1 + 0 = 1. Not `< minimumObstaclesToCell[0][0]` (0). Skip.
 *       - [1, 1]: grid[1][1]=1. newCost = 1 + 1 = 2. Not `< minimumObstaclesToCell[1][1]` (2). Skip.
 *       - [2, 0]: grid[2][0]=1. newCost = 1 + 1 = 2. `2 < minimumObstaclesToCell[2][0]` (inf). Update `minimumObstaclesToCell[2][0] = 2`. grid[2][0] is 1, so `cellProcessDeque.push([2, 0])`. Deque: [[0,2], [1,1], [2,0]]
 *
 *   - Deque: [[0,2], [1,1], [2,0]]
 *     - Pop [0, 2]. currentRow = 0, currentCol = 2. currentCellCost = 2.
 *     - Neighbors:
 *       - [0, 1]: grid[0][1]=1. newCost = 2 + 1 = 3. Not `< minimumObstaclesToCell[0][1]` (1). Skip.
 *       - [1, 2]: grid[1][2]=0. newCost = 2 + 0 = 2. `2 < minimumObstaclesToCell[1][2]` (inf). Update `minimumObstaclesToCell[1][2] = 2`. grid[1][2] is 0, so `cellProcessDeque.unshift([1, 2])`. Deque: [[1,2], [1,1], [2,0]]
 *
 *   - Deque: [[1,2], [1,1], [2,0]]
 *     - Pop [1, 2]. currentRow = 1, currentCol = 2. currentCellCost = 2.
 *     - Target: Not (2,2).
 *     - Neighbors:
 *       - [0, 2]: grid[0][2]=1. newCost = 2 + 1 = 3. Not `< minimumObstaclesToCell[0][2]` (2). Skip.
 *       - [1, 1]: grid[1][1]=1. newCost = 2 + 1 = 3. Not `< minimumObstaclesToCell[1][1]` (2). Skip.
 *       - [2, 2]: grid[2][2]=0. newCost = 2 + 0 = 2. `2 < minimumObstaclesToCell[2][2]` (inf). Update `minimumObstaclesToCell[2][2] = 2`. grid[2][2] is 0, so `cellProcessDeque.unshift([2, 2])`. Deque: [[2,2], [1,1], [2,0]]
 *
 *   - Deque: [[2,2], [1,1], [2,0]]
 *     - Pop [2, 2]. currentRow = 2, currentCol = 2. currentCellCost = 2.
 *     - Target: Yes, (2,2). Return `currentCellCost` which is 2.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var minimumObstacles = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dist = new Int32Array(m * n).fill(2147483647);

  const deque = new Int32Array(m * n * 2);
  let head = m * n;
  let tail = m * n;

  dist[0] = grid[0][0];
  deque[tail++] = 0;

  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];

  while (head < tail) {
    const curr = deque[head++];
    const r = (curr / n) | 0;
    const c = curr % n;

    if (r === m - 1 && c === n - 1) return dist[curr];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const weight = grid[nr][nc];
        const nextIdx = nr * n + nc;

        if (dist[curr] + weight < dist[nextIdx]) {
          dist[nextIdx] = dist[curr] + weight;

          if (weight === 0) {
            deque[--head] = nextIdx;
          } else {
            deque[tail++] = nextIdx;
          }
        }
      }
    }
  }

  return dist[m * n - 1];
};
