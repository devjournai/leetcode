/**
 * Minimum Weighted Subgraph with the Required Paths II
 * Intuition: The minimum tree connecting src1, src2, and dest is the union of the three pairwise paths. Its weight is (dist(a,b)+dist(a,c)+dist(b,c))/2.
 * Approach: 1. Root the tree at 0, DFS depths and distances. 2. Build binary lifting for LCA. 3. dist(u,v)=dist[u]+dist[v]-2*dist[lca]. 4. Answer each query with the formula above.
 * Dry Run: edges = [[0,1,2],[1,2,3],[1,3,5],[1,4,4],[2,5,6]], query [2,3,4]. dist(2,3)+dist(2,4)+dist(3,4) = 8+7+9 = 24, /2 = 12.
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N log N)
 */
var minimumWeight = function (edges, queries) {
  const n = edges.length + 1;
  const logN = Math.max(1, Math.ceil(Math.log2(n)));
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }

  const jump = Array.from({ length: n }, () => new Array(logN).fill(0));
  const depth = new Array(n).fill(0);
  const dist = new Array(n).fill(0);

  const dfs = (u, prev) => {
    for (const [v, w] of graph[u]) {
      if (v === prev) {
        continue;
      }
      jump[v][0] = u;
      depth[v] = depth[u] + 1;
      dist[v] = dist[u] + w;
      dfs(v, u);
    }
  };

  dfs(0, -1);

  for (let j = 1; j < logN; j++) {
    for (let i = 0; i < n; i++) {
      jump[i][j] = jump[jump[i][j - 1]][j - 1];
    }
  }

  const getLCA = (u, v) => {
    if (depth[u] > depth[v]) {
      [u, v] = [v, u];
    }
    let diff = depth[v] - depth[u];
    for (let j = 0; j < logN; j++) {
      if ((diff >> j) & 1) {
        v = jump[v][j];
      }
    }
    if (u === v) {
      return u;
    }
    for (let j = logN - 1; j >= 0; j--) {
      if (jump[u][j] !== jump[v][j]) {
        u = jump[u][j];
        v = jump[v][j];
      }
    }
    return jump[u][0];
  };

  const distance = (u, v) => {
    const lca = getLCA(u, v);
    return dist[u] + dist[v] - 2 * dist[lca];
  };

  return queries.map(([src1, src2, dest]) => {
    return Math.floor(
      (distance(src1, src2) + distance(src1, dest) + distance(src2, dest)) / 2
    );
  });
};
