/**
 * Find a Safe Walk Through a Grid
 * Intuition: This problem asks for the existence of a path with a specific resource constraint (health). Since we want to find a path that *maximizes* the health at each step (to ensure it stays positive), and all "costs" (health reductions) are non-negative, Dijkstra's algorithm is a suitable choice. We adapt Dijkstra's to find the path that yields the maximum health upon arrival at each cell.
 * Approach:
 * 1. Initialize a 2D array `maxHealth` of size `m x n` to store the maximum health achievable when reaching cell `(r, c)`. Initialize all entries to -1 (or a value indicating "unvisited" or "unreachable with positive health").
 * 2. Create a Max-Priority Queue to store states `[currentHealth, row, col]`. The priority queue will always extract the state with the highest `currentHealth`.
 * 3. Calculate the initial health after potentially entering the starting cell `(0, 0)`. If `grid[0][0]` is 1, health reduces by 1.
 * 4. If this initial health is less than or equal to 0, it's impossible to start, so return `false`.
 * 5. Push `[initialHealth, 0, 0]` into the priority queue and update `maxHealth[0][0]` with this value.
 * 6. While the priority queue is not empty:
 *    a. Extract `[currentHealth, r, c]` with the highest `currentHealth`.
 *    b. If `currentHealth` is less than `maxHealth[r][c]`, this means we've already found a better path to `(r, c)`, so skip this state.
 *    c. For each of the four adjacent neighbors `(nr, nc)`:
 *       i. Check if `(nr, nc)` is within grid boundaries.
 *       ii. Calculate `newHealth = currentHealth - (grid[nr][nc] === 1 ? 1 : 0)`.
 *       iii. If `newHealth` is greater than 0 (health must remain positive) AND `newHealth` is greater than `maxHealth[nr][nc]` (we found a better path to `(nr, nc)`):
 *           - Update `maxHealth[nr][nc] = newHealth`.
 *           - Push `[newHealth, nr, nc]` into the priority queue.
 * 7. After the priority queue is empty, check `maxHealth[m-1][n-1]`. If it is greater than 0, it means the destination was reachable with at least 1 health, so return `true`. Otherwise, return `false`.
 * Dry Run: (Example 1) grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]], health = 1
 *   - m=3, n=5. maxHealth initialized to -1.
 *   - initialHealthAtStart = 1 - grid[0][0] = 1 - 0 = 1.
 *   - maxHealth[0][0] = 1. PQ.push([1, 0, 0]).
 *   - Pop [1, 0, 0]. Neighbors:
 *     - (0,1): grid[0][1]=1. newHealth = 1-1=0. (Invalid, health <= 0)
 *     - (1,0): grid[1][0]=0. newHealth = 1-0=1. maxHealth[1][0]=1 (better than -1). PQ.push([1, 1, 0]).
 *   - Pop [1, 1, 0]. Neighbors:
 *     - (2,0): grid[2][0]=0. newHealth = 1-0=1. maxHealth[2][0]=1. PQ.push([1, 2, 0]).
 *     - (1,1): grid[1][1]=1. newHealth = 1-1=0. (Invalid)
 *   - Pop [1, 2, 0]. Neighbors:
 *     - (2,1): grid[2][1]=0. newHealth = 1-0=1. maxHealth[2][1]=1. PQ.push([1, 2, 1]).
 *   ... (path continues as described in thought process: (0,0)->(1,0)->(2,0)->(2,1)->(2,2)->(1,2)->(0,2)->(0,3)->(0,4)->(1,4)->(2,4))
 *   - Eventually, [1, 2, 4] is popped. (2,4) is the destination.
 *   - maxHealth[2][4] will be updated to 1.
 *   - Loop finishes. Check maxHealth[2][4] which is 1. Since 1 > 0, return `true`.
 * Time Complexity: O(M * N * H_max * log(M * N * H_max))
 * Space Complexity: O(M * N * H_max)
 */
var findSafeWalk = function (grid, health) {
  const m = grid.length;
  const n = grid[0].length;

  const heap = [];

  const push = (item) => {
    heap.push(item);

    let index = heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (heap[parent][0] >= heap[index][0]) break;

      [heap[parent], heap[index]] = [heap[index], heap[parent]];

      index = parent;
    }
  };

  const pop = () => {
    if (heap.length === 1) return heap.pop();

    const top = heap[0];
    heap[0] = heap.pop();

    let index = 0;

    while (true) {
      let largest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < heap.length && heap[left][0] > heap[largest][0]) {
        largest = left;
      }

      if (right < heap.length && heap[right][0] > heap[largest][0]) {
        largest = right;
      }

      if (largest === index) break;

      [heap[index], heap[largest]] = [heap[largest], heap[index]];

      index = largest;
    }

    return top;
  };

  const maxHealth = Array.from({ length: m }, () => Array(n).fill(-1));

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const startHealth = health - (grid[0][0] === 1 ? 1 : 0);

  if (startHealth <= 0) {
    return false;
  }

  push([startHealth, 0, 0]);
  maxHealth[0][0] = startHealth;

  while (heap.length) {
    const [currentHealth, row, col] = pop();

    if (currentHealth < maxHealth[row][col]) {
      continue;
    }

    if (row === m - 1 && col === n - 1) {
      return true;
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) {
        continue;
      }

      const newHealth = currentHealth - (grid[newRow][newCol] === 1 ? 1 : 0);

      if (newHealth > 0 && newHealth > maxHealth[newRow][newCol]) {
        maxHealth[newRow][newCol] = newHealth;
        push([newHealth, newRow, newCol]);
      }
    }
  }

  return false;
};
