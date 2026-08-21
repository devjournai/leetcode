/**
 * Maximum Partition Factor
 * Intuition: Binary-search the factor D. Edges of length < D must go between groups, so the graph must be bipartite. n = 2 has no intra-group pair, so the factor is 0.
 * Approach: 1. If n == 2 return 0. 2. Binary search D. 3. BFS 2-color every pair whose Manhattan distance is < D.
 * Dry Run: Square corners [[0,0],[0,2],[2,0],[2,2]] can split on the diagonals with min intra-distance 4.
 * Time Complexity: O(N^2 log W)
 * Space Complexity: O(N)
 */
var maxPartitionFactor = function (points) {
  const n = points.length;
  if (n === 2) {
    return 0;
  }

  const manhattan = (i, j) =>
    Math.abs(points[i][0] - points[j][0]) +
    Math.abs(points[i][1] - points[j][1]);

  const isBipartite = (limit) => {
    const color = Array(n).fill(-1);
    for (let start = 0; start < n; start++) {
      if (color[start] !== -1) {
        continue;
      }
      color[start] = 0;
      const queue = [start];
      for (let qi = 0; qi < queue.length; qi++) {
        const u = queue[qi];
        for (let v = 0; v < n; v++) {
          if (v === u || manhattan(u, v) >= limit) {
            continue;
          }
          if (color[v] === -1) {
            color[v] = color[u] ^ 1;
            queue.push(v);
          } else if (color[v] === color[u]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  let low = 0;
  let high = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      high = Math.max(high, manhattan(i, j));
    }
  }
  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    if (isBipartite(mid)) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return low;
};
