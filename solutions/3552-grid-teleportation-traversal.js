/**
 * Grid Teleportation Traversal
 * Intuition: Moving to a neighbor costs 1, while using a letter portal to any other cell with the same letter costs 0. 0-1 BFS finds the shortest path; each letter is teleported at most once.
 * Approach: 1. Group portal cells by letter. 2. 0-1 deque: push-front teleports (cost 0), push-back adjacent steps (cost 1). 3. Skip walls '#'. 4. Return dist at bottom-right or -1.
 * Dry Run: matrix = ["A..","#A.","..."]. From (0,0) teleport to the other A at cost 0, then walk to the end. Fewer steps than walking around the wall.
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var minMoves = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const portals = new Map();

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const cell = matrix[i][j];
      if (cell >= "A" && cell <= "Z") {
        if (!portals.has(cell)) {
          portals.set(cell, []);
        }
        portals.get(cell).push([i, j]);
      }
    }
  }

  const dirs = [-1, 0, 1, 0, -1];
  const INF = Number.MAX_SAFE_INTEGER;
  const dist = Array.from({ length: m }, () => Array(n).fill(INF));
  dist[0][0] = 0;

  const cap = m * n * 2 + 5;
  const deque = new Array(cap);
  let left = cap >> 1;
  let right = cap >> 1;
  deque[right++] = [0, 0];

  while (left < right) {
    const [i, j] = deque[left++];
    const d = dist[i][j];
    if (i === m - 1 && j === n - 1) {
      return d;
    }

    const cell = matrix[i][j];
    if (portals.has(cell)) {
      for (const [x, y] of portals.get(cell)) {
        if (d < dist[x][y]) {
          dist[x][y] = d;
          deque[--left] = [x, y];
        }
      }
      portals.delete(cell);
    }

    for (let k = 0; k < 4; k++) {
      const x = i + dirs[k];
      const y = j + dirs[k + 1];
      if (x < 0 || x >= m || y < 0 || y >= n || matrix[x][y] === "#") {
        continue;
      }
      if (d + 1 < dist[x][y]) {
        dist[x][y] = d + 1;
        deque[right++] = [x, y];
      }
    }
  }

  return -1;
};
