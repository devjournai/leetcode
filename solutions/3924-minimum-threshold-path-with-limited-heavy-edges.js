/**
 * Minimum Threshold Path With Limited Heavy Edges
 * Intuition: Binary search the threshold. Edges heavier than mid cost 1 heavy use; others are free. Shortest path with at most k heavy edges.
 * Approach: 1. Binary search threshold. 2. 0-1 BFS / Dijkstra on (node, heavies used).
 * Dry Run: Input: n = 6, edges sample, k = 1. Output: 4.
 * Time Complexity: O(M log W * (N+M) log N)
 * Space Complexity: O(N + M)
 */
var minThreshold = function (n, edges, source, target, k) {
  if (source === target) return 0;
  let lo = 0,
    hi = 0,
    ans = -1;
  for (const e of edges) hi = Math.max(hi, e[2]);
  const ok = (th) => {
    const g = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
      g[u].push([v, w]);
      g[v].push([u, w]);
    }
    const dist = Array.from({ length: n }, () => Array(k + 1).fill(Infinity));
    dist[source][0] = 0;
    const dq = [[source, 0]];
    while (dq.length) {
      const [u, h] = dq.shift();
      for (const [v, w] of g[u]) {
        const nh = h + (w > th ? 1 : 0);
        if (nh <= k && dist[v][nh] > dist[u][h] + 1) {
          dist[v][nh] = dist[u][h] + 1;
          dq.push([v, nh]);
        }
      }
    }
    return dist[target].some((d) => d < Infinity);
  };
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (ok(mid)) {
      ans = mid;
      hi = mid - 1;
    } else lo = mid + 1;
  }
  return ans;
};
