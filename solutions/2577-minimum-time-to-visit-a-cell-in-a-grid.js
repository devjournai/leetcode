/**
 * Minimum Time to Visit a Cell In a Grid
 *
 * Intuition:
 * Each move takes exactly one second, so the problem becomes finding the
 * shortest arrival time at every cell.
 *
 * Since every cell has a minimum allowed visiting time, we may have to wait.
 * However, waiting is only possible by moving back and forth between adjacent
 * cells, which changes the parity (odd/even) of the arrival time.
 *
 * Therefore, use Dijkstra's Algorithm where:
 *
 *      State = (time, row, col)
 *
 * and carefully adjust the arrival time whenever we reach a cell too early.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. If both immediate neighbors of the start require time greater than 1,
 *    it is impossible to leave the starting cell.
 *
 * 2. Maintain:
 *
 *      dist[row][col]
 *
 *      = earliest arrival time.
 *
 * 3. Use a Min Heap ordered by arrival time.
 *
 * 4. For every neighboring cell:
 *
 *      nextTime = currentTime + 1
 *
 *      If:
 *
 *          nextTime >= grid[nr][nc]
 *
 *      move immediately.
 *
 *      Otherwise,
 *
 *      wait until the cell becomes available.
 *
 *      Because waiting is achieved by moving back and forth,
 *      parity must match.
 *
 *      If:
 *
 *          (grid - nextTime) is even
 *
 *      wait one extra second.
 *
 * 5. Relax the distance and continue Dijkstra.
 *
 * 6. Return the earliest time for the bottom-right cell.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * grid =
 * [
 *  [0,1,3,2],
 *  [5,1,2,5],
 *  [4,3,8,6]
 * ]
 *
 * Start:
 *
 * time = 0
 *
 * Move:
 *
 * (0,1)
 *
 * time = 1
 *
 * Move:
 *
 * (1,1)
 *
 * time = 2
 *
 * Move:
 *
 * (1,2)
 *
 * time = 3
 *
 * Need to reach (1,3)
 *
 * earliest allowed = 5
 *
 * We arrive at 4,
 * so wait one second by moving back and forth.
 *
 * Reach:
 *
 * (1,3)
 *
 * time = 6
 *
 * Move:
 *
 * (2,3)
 *
 * time = 7
 *
 * Return 7.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(M × N log(M × N))
 * Space Complexity: O(M × N)
 */

var minimumTime = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  if (grid[0][1] > 1 && grid[1][0] > 1) {
    return -1;
  }

  class MinHeap {
    constructor() {
      this.heap = [];
    }

    push(item) {
      this.heap.push(item);
      let i = this.heap.length - 1;

      while (i > 0) {
        const p = (i - 1) >> 1;

        if (this.heap[p][0] <= this.heap[i][0]) {
          break;
        }

        [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];

        i = p;
      }
    }

    pop() {
      if (this.heap.length === 1) {
        return this.heap.pop();
      }

      const top = this.heap[0];
      this.heap[0] = this.heap.pop();

      let i = 0;

      while (true) {
        let smallest = i;

        const left = i * 2 + 1;
        const right = i * 2 + 2;

        if (
          left < this.heap.length &&
          this.heap[left][0] < this.heap[smallest][0]
        ) {
          smallest = left;
        }

        if (
          right < this.heap.length &&
          this.heap[right][0] < this.heap[smallest][0]
        ) {
          smallest = right;
        }

        if (smallest === i) {
          break;
        }

        [this.heap[i], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[i],
        ];

        i = smallest;
      }

      return top;
    }

    size() {
      return this.heap.length;
    }
  }

  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));

  const heap = new MinHeap();

  heap.push([0, 0, 0]);
  dist[0][0] = 0;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (heap.size()) {
    const [time, row, col] = heap.pop();

    if (time !== dist[row][col]) {
      continue;
    }

    if (row === m - 1 && col === n - 1) {
      return time;
    }

    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;

      if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
        continue;
      }

      let nextTime = time + 1;

      if (nextTime < grid[nr][nc]) {
        const wait = grid[nr][nc] - nextTime;

        if (wait % 2 === 0) {
          nextTime = grid[nr][nc] + 1;
        } else {
          nextTime = grid[nr][nc];
        }
      }

      if (nextTime < dist[nr][nc]) {
        dist[nr][nc] = nextTime;

        heap.push([nextTime, nr, nc]);
      }
    }
  }

  return -1;
};
