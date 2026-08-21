/**
 * Minimum Cost to Repair Edges to Traverse a Graph
 * Intuition: We observe that the higher the repair cost, the more edges become available, making it easier to satisfy the requirement of reaching node $n - 1$ from node $0$ using at most $k$ edges. Moreover, the minimum repair cost must be among the costs in $\textit{edges}$. Therefore, we first sort $\textit{edges}$ by repair cost, then use binary search to find the minimum repair cost that satisfies the requirement. We perform binary search on the index of the repair cost, defining the left boundary as $l = 0$ and the right boundary as $r = |\textit{edges}| - 1$. For the middle position $mid = \lfloor (l + r) / 2 \rfloor$, we add all edges with repair cost less than or equal to $\textit{edges}[mid][2]$ to the graph, then use BFS to determine whether we can reach node $n - 1$ from node $0$ using at most $k$ edges. If possible, we update the right boundary to $r = mid$; otherwise, we update the left ...
 * Approach: We observe that the higher the repair cost, the more edges become available, making it easier to satisfy the requirement of reaching node $n - 1$ from node $0$ using at most $k$ edges. Moreover, the minimum repair cost must be among the costs in $\textit{edges}$. Therefore, we first sort $\textit{edges}$ by repair cost, then use binary search to find the minimum repair cost that satisfies the requirement. We perform binary search on the index of the repair cost, defining the left boundary as $l = 0$ and the right boundary as $r = |\textit{edges}| - 1$. For the middle position $mid = \lfloor (l + r) / 2 \rfloor$, we add all edges with repair cost less than or equal to $\textit{edges}[mid][2]$ to the graph, then use BFS to determine whether we can reach node $n - 1$ from node $0$ using at most $k$ edges. If possible, we update the right boundary to $r = mid$; otherwise, we update the left ...
 * Dry Run: Input: n = 3, edges = [[0,1,10],[1,2,10],[0,2,100]], k = 1 => Output: 100
 * Time Complexity: O(O((m + n) * log m))
 * Space Complexity: O(O(n))
 */
var minCost = function (n, edges, k) {
  edges.sort((a, b) => a[2] - b[2]);

  const check = (idx) => {
    const g = Array.from({ length }, () => []);
    for (let i = 0; i <= idx; i++) {
      const [u, v] = edges[i];
      g[u].push(v);
      g[v].push(u);
    }

    let q = [0];
    const vis = Array(n).fill(false);
    vis[0] = true;

    let dist = 0;
    while (q.length > 0) {
      const nq = [];
      for (const u of q) {
        if (u === n - 1) {
          return dist <= k;
        }
        for (const v of g[u]) {
          if (!vis[v]) {
            vis[v] = true;
            nq.push(v);
          }
        }
      }
      q = nq;
      dist++;
    }
    return false;
  };

  let [l, r] = [0, edges.length - 1];
  while (l < r) {
    const mid = (l + r) >> 1;
    if (check(mid)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return check(l) ? edges[l][2] : -1;
};
