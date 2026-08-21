/**
 * Minimum Cost Path With Edge Reversals
 * Intuition: Using an edge forward costs w; reversing it costs 2w. Model reverse as a backward edge of weight 2w and run Dijkstra from 0 to n-1.
 * Approach: 1. For each (u, v, w) add u→v with w and v→u with 2w. 2. Dijkstra with a min-heap on dist[0]=0. 3. Return dist[n-1] or -1 if unreachable.
 * Dry Run: n = 3, edges (0,1,1), (1,2,1). Path 0→1→2 cost 2. If only (2,0,1) existed, reverse 0→2 costs 2.
 * Time Complexity: O((N + E) log N)
 * Space Complexity: O(N + E)
 */

var minCost = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, 2 * w]);
  }

  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;

  const pq = new MinPriorityQueue((x) => x[0]);
  pq.enqueue([0, 0]);

  while (!pq.isEmpty()) {
    const [cost, u] = pq.dequeue();

    if (cost > dist[u]) continue;

    for (const [v, w] of graph[u]) {
      const newCost = cost + w;
      if (newCost < dist[v]) {
        dist[v] = newCost;
        pq.enqueue([newCost, v]);
      }
    }
  }

  return dist[n - 1] === Infinity ? -1 : dist[n - 1];
};
