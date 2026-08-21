/**
 * Find Weighted Median Node in Tree
 * Intuition: On the unique path u→v the median is the first node x whose distance from u is at least half the path weight. Binary lifting walks that path in log time.
 * Approach: 1. Root at 0, DFS depth, dist, parents. 2. Build jump table. 3. For query (u,v), get LCA and total = dist(u,v). Need the first x with dist(u,x) ≥ (total+1)/2 using integer ceil of half. 4. Lift from u toward v until the remaining gap is covered.
 * Dry Run: n = 2, edges = [[0,1,7]], queries = [[1,0],[0,1]]. Half of 7 is 3.5, first node reaching ≥ 3.5 is the other endpoint: [0, 1].
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N log N)
 */
var findMedian = function (n, edges, queries) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }

  const logN = Math.max(1, Math.ceil(Math.log2(n)) + 1);
  const parent = Array.from({ length: n }, () => new Array(logN).fill(0));
  const depth = new Array(n).fill(0);
  const dist = new Array(n).fill(0);
  const upWeight = new Array(n).fill(0);

  const dfs = (u, p) => {
    parent[u][0] = p;
    for (const [v, w] of graph[u]) {
      if (v === p) {
        continue;
      }
      depth[v] = depth[u] + 1;
      dist[v] = dist[u] + w;
      upWeight[v] = w;
      dfs(v, u);
    }
  };

  dfs(0, 0);

  for (let j = 1; j < logN; j++) {
    for (let i = 0; i < n; i++) {
      parent[i][j] = parent[parent[i][j - 1]][j - 1];
    }
  }

  const lca = (u, v) => {
    if (depth[u] < depth[v]) {
      [u, v] = [v, u];
    }
    let diff = depth[u] - depth[v];
    for (let j = 0; j < logN; j++) {
      if ((diff >> j) & 1) {
        u = parent[u][j];
      }
    }
    if (u === v) {
      return u;
    }
    for (let j = logN - 1; j >= 0; j--) {
      if (parent[u][j] !== parent[v][j]) {
        u = parent[u][j];
        v = parent[v][j];
      }
    }
    return parent[u][0];
  };

  const kthParent = (u, k) => {
    for (let j = 0; j < logN; k >>= 1, j++) {
      if (k & 1) {
        u = parent[u][j];
      }
    }
    return u;
  };

  const pathNode = (u, v, stepsFromU) => {
    const w = lca(u, v);
    const up = depth[u] - depth[w];
    if (stepsFromU <= up) {
      return kthParent(u, stepsFromU);
    }
    const down = stepsFromU - up;
    const vToLca = depth[v] - depth[w];
    return kthParent(v, vToLca - down);
  };

  const answer = [];
  for (const [u, v] of queries) {
    if (u === v) {
      answer.push(u);
      continue;
    }
    const w = lca(u, v);
    const total = dist[u] + dist[v] - 2 * dist[w];
    const need = total / 2;

    let lo = 1;
    let hi = depth[u] + depth[v] - 2 * depth[w];
    let best = v;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const x = pathNode(u, v, mid);
      const dux = dist[u] + dist[x] - 2 * dist[lca(u, x)];
      if (dux >= need) {
        best = x;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    answer.push(best);
  }

  return answer;
};
