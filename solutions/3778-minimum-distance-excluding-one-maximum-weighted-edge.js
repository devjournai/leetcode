/**
 * Minimum Distance Excluding One Maximum Weighted Edge
 * Intuition: The problem is essentially equivalent to finding a path from node 0 to node n-1, where we have one opportunity to treat the weight of a traversed edge as 0, in order to minimize the sum of path weights.
 * Approach: We first convert \textit{edges} into an adjacency list \textit{g}, where \textit{g}[u] stores all edges (v, w) connected to node u, indicating that there is an edge with weight w between node u and node v. Next, we use Dijkstra's algorithm to find the shortest path. We define a 2D array \textit{dist}, where \textit{dist}[u][0] represents the minimum sum of path weights from node 0 to node u without using the opportunity to treat an edge weight as 0; \textit{dist}[u][1] represents the minimum sum of path weights from node 0 to node u having already used the opportunity to treat an edge weight as 0. We use a priority queue \textit{pq} to store pending nodes. Initially, we enqueue (0, 0, 0), indicating that we start from node 0, with a current path weight sum of 0, and haven't used the opportunity. In each iteration, we dequeue the node (\textit{cur}, u, \textit{used}) with the minimum path weight sum from the priority queue. If the current path weight sum \textit{cur} is greater than \textit{dist}[u][\textit{used}], we skip this node. If the current node u is node n-1 and we have already used the opportunity \textit{used} = 1, we return the current path weight sum \textit{cur}. For each edge (v, w) of node u, we calculate the path weight sum to reach node v without using the opportunity: \textit{nxt} = \textit{cur} + w. If \textit{nxt} < \textit{dist}[v][\textit{used}], we update \textit{dist}[v][\textit{used}] and enqueue (\textit{nxt}, v, \textit{used}). If we haven't used the opportunity yet \textit{used} = 0, we calculate the path weight sum to reach node v when using the opportunity: \textit{nxt} = \textit{cur}. If \textit{nxt} < \textit{dist}[v][1], we update \textit{dist}[v][1] and enqueue (\textit{nxt}, v, 1). After the traversal ends, we return \textit{dist}[n-1][1] as the answer. The time complexity is O(m \times \log n), and the space complexity is O(n + m), where n and m are the number of nodes and edges, respectively.
 * Dry Run: Input n = 5, edges = [[0,1,2],[1,2,7],[2,3,7],[3,4,4]]. Output 13.
 * Time Complexity: O(m \times \log n)
 * Space Complexity: O(n + m)
 */
var minCostExcludingMax = function (n, edges) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    g[u].push([v, w]);
    g[v].push([u, w]);
  }

  const INF = Infinity;
  const dist = Array.from({ length: n }, () => [INF, INF]);
  dist[0][0] = 0;

  const pq = new PriorityQueue((a, b) =>
    a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
  );

  pq.enqueue([0, 0, 0]);

  while (pq.size() > 0) {
    const [cur, u, used] = pq.dequeue();
    if (cur > dist[u][used]) {
      continue;
    }
    if (u === n - 1 && used === 1) {
      return cur;
    }

    for (const [v, w] of g[u]) {
      const nxt1 = cur + w;
      if (nxt1 < dist[v][used]) {
        dist[v][used] = nxt1;
        pq.enqueue([nxt1, v, used]);
      }
      if (used === 0) {
        const nxt2 = cur;
        if (nxt2 < dist[v][1]) {
          dist[v][1] = nxt2;
          pq.enqueue([nxt2, v, 1]);
        }
      }
    }
  }

  return dist[n - 1][1];
};
