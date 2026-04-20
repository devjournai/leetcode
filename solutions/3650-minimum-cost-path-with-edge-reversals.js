/**
 * Minimum Cost Path With Edge Reversals
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
