/**
 * Minimum Time to Reach Target With Limited Power
 * Intuition: This is a shortest path problem, but the state must track the remaining power in addition to the current node.
 * Approach: This is a shortest path problem, but the state must track the remaining power in addition to the current node. We define dist[u][p] as the minimum time required to reach node u with p units of remaining power. Initially, dist[source][power] = 0, and all other states are set to infinity. We use Dijkstra's algorithm with a priority queue storing triples (d, p, u), representing the current minimum time, the remaining power, and the current node. To maximize the remaining power when the time is the same, we store the remaining power as a negative value when pushing into the queue, so the priority queue prefers states with more remaining power during comparison.
 * Dry Run: Input: n = 5, edges = [[0,1,1],[1,4,1],[0,2,1],[2,3,1],[3,4,1]], power = 4, cost = [2,3,1,1,1], source = 0, target = 4. Output: [3,0].
 * Time Complexity: O((n+m) * power * log(n * power))
 * Space Complexity: O(n * power)
 */
var minTimeMaxPower = function (n, edges, power, cost, source, target) {
  const inf = 1e18;

  const g = Array.from({ length: n }, () => []);

  for (const [u, v, t] of edges) {
    g[u].push([v, t]);
  }

  const dist = Array.from({ length: n }, () => Array(power + 1).fill(inf));

  const pq = new PriorityQueue((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  dist[source][power] = 0;
  pq.enqueue([0, -power, source]);

  while (!pq.isEmpty()) {
    const [d, negp, u] = pq.dequeue();
    let p = -negp;

    if (u === target) return [d, p];
    if (d > dist[u][p] || p < cost[u]) continue;

    p -= cost[u];

    for (const [v, t] of g[u]) {
      const nd = d + t;

      if (nd < dist[v][p]) {
        dist[v][p] = nd;
        pq.enqueue([nd, -p, v]);
      }
    }
  }

  return [-1, -1];
};
