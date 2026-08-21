/**
 * Minimum Cost Path with Alternating Directions III
 * Intuition: The cost to enter cell (i, j) is (i+1)(j+1). Actions are numbered from 1: on odd actions you should move right or down, and on even actions left or up; you may also wait in place. Moving against the parity rule costs an extra penalty of the current cell, and waiting also costs penalty. After every action the required parity flips.
 * Approach: The cost to enter cell (i, j) is (i+1)(j+1). Actions are numbered from 1: on odd actions you should move right or down, and on even actions left or up; you may also wait in place. Moving against the parity rule costs an extra penalty of the current cell, and waiting also costs penalty. After every action the required parity flips. Use state (i, j, k) for the minimum cost of being at (i, j) when the next action has parity k (k = 1 for an odd action, k = 0 for an even action). The start is (0, 0, 1) with cost 1. From the current state you may:
 * Dry Run: Input: m = 2, n = 2, penalty = [[5,3],[1,4]]. Output: 8.
 * Time Complexity: O(mnlog(mn))
 * Space Complexity: O(mn)
 */
var minCost = function (m, n, penalty) {
  const dist = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => [Infinity, Infinity])
  );
  dist[0][0][1] = 1;

  const pq = new MinPriorityQueue((x) => x[0]);
  pq.enqueue([1, 0, 0, 1]);

  const dirs = [
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 0],
  ];

  while (!pq.isEmpty()) {
    const [d, i, j, k] = pq.dequeue();

    if (i === m - 1 && j === n - 1) {
      return d;
    }
    if (d > dist[i][j][k]) {
      continue;
    }

    const p = penalty[i][j];

    let nd = d + p;
    if (nd < dist[i][j][k ^ 1]) {
      dist[i][j][k ^ 1] = nd;
      pq.enqueue([nd, i, j, k ^ 1]);
    }

    for (let idx = 0; idx < 4; idx++) {
      const [dx, dy] = dirs[idx];
      const x = i + dx;
      const y = j + dy;
      if (0 <= x && x < m && 0 <= y && y < n) {
        nd = d + (x + 1) * (y + 1) + ((idx & 1) ^ k) * p;
        if (nd < dist[x][y][k ^ 1]) {
          dist[x][y][k ^ 1] = nd;
          pq.enqueue([nd, x, y, k ^ 1]);
        }
      }
    }
  }

  return -1;
};
