/**
 * Check if the Rectangle Corner Is Reachable
 * Intuition: You cannot reach (X, Y) from (0, 0) iff circles form a barrier from the left/top edges to the right/bottom edges. Union overlapping circles with those borders.
 * Approach: 1. Union-find over n circles plus two virtual nodes (start-border and end-border). 2. Touching left or top unions with start. Touching right or bottom unions with end. Overlapping circles union together. 3. Reachable iff the two virtual nodes are in different components.
 * Dry Run: X = 3, Y = 4, circles = [[2, 1, 1]]. Circle touches bottom (y-r <= 0) so joins end-border, not start. Components differ, reachable.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var canReachCorner = function (X, Y, circles) {
  const n = circles.length;
  const parent = Array.from({ length: n + 2 }, (_, index) => index);
  const rank = Array(n + 2).fill(0);

  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  const unionByRank = (u, v) => {
    const i = find(u);
    const j = find(v);
    if (i === j) {
      return;
    }
    if (rank[i] < rank[j]) {
      parent[i] = j;
    } else if (rank[i] > rank[j]) {
      parent[j] = i;
    } else {
      parent[i] = j;
      rank[j]++;
    }
  };

  for (let i = 0; i < n; i++) {
    const [x, y, r] = circles[i];
    if (x - r <= 0 || y + r >= Y) {
      unionByRank(i, n);
    }
    if (x + r >= X || y - r <= 0) {
      unionByRank(i, n + 1);
    }
    for (let j = 0; j < i; j++) {
      const [x2, y2, r2] = circles[j];
      const dx = BigInt(x - x2);
      const dy = BigInt(y - y2);
      const rr = BigInt(r + r2);
      if (dx * dx + dy * dy <= rr * rr) {
        unionByRank(i, j);
      }
    }
  }

  return find(n) !== find(n + 1);
};
