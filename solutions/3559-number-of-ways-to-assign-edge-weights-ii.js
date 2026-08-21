/**
 * Number of Ways to Assign Edge Weights II
 * Intuition: The cost of a path is odd if and only if an odd number of edges in the path are assigned weight 1 (and the rest weight 2). For a path with `k` edges, the number of ways to choose an odd number of edges to be 1 is given by C(k,1) + C(k,3) + ... which simplifies to 2^(k-1) for k >= 1. If k=0 (path from a node to itself), the cost is 0 (even), so 0 ways.
 * Approach:
 * 1. Preprocessing (LCA Setup):
 *    a. Build an adjacency list for the tree.
 *    b. Perform a Depth First Search (DFS) from the root (node 1) to calculate `depth[node]` (distance from root) and `parent[node][0]` (immediate parent) for all nodes.
 *    c. Use binary lifting to precompute `parent[node][j]`, which stores the `2^j`-th ancestor of `node`. This takes O(N log N) time.
 * 2. Query Processing: For each query `[ui, vi]`:
 *    a. Handle the special case where `ui === vi`. The path has 0 edges, cost is 0 (even), so the answer is 0.
 *    b. Otherwise, find the Lowest Common Ancestor (LCA) of `ui` and `vi` using the precomputed `parent` array. This takes O(log N) time.
 *    c. Calculate `k`, the number of edges in the path between `ui` and `vi`. This is `depth[ui] + depth[vi] - 2 * depth[LCA(ui, vi)]`.
 *    d. Compute `2^(k-1)` modulo `10^9 + 7` using modular exponentiation (binary exponentiation). This takes O(log k) which is O(log N) time.
 *    e. Store this result in the answer array.
 * 3. Return the array of answers.
 * Dry Run: (See example 2 walkthrough in thought process for detailed trace)
 *   Input: edges = [[1,2],[1,3],[3,4],[3,5]], queries = [[1,4],[3,4],[2,5]]
 *   N = 5.
 *   Depths: depth[1]=0, depth[2]=1, depth[3]=1, depth[4]=2, depth[5]=2.
 *
 *   Query [1,4]:
 *     LCA(1,4) = 1.
 *     k = depth[1] + depth[4] - 2*depth[1] = 0 + 2 - 2*0 = 2.
 *     Ways = 2^(2-1) = 2^1 = 2.
 *
 *   Query [3,4]:
 *     LCA(3,4) = 3.
 *     k = depth[3] + depth[4] - 2*depth[3] = 1 + 2 - 2*1 = 1.
 *     Ways = 2^(1-1) = 2^0 = 1.
 *
 *   Query [2,5]:
 *     LCA(2,5) = 1.
 *     k = depth[2] + depth[5] - 2*depth[1] = 1 + 2 - 2*0 = 3.
 *     Ways = 2^(3-1) = 2^2 = 4.
 *
 *   Output: [2,1,4] (Matches example)
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N log N)
 */
var assignEdgeWeights = function (edges, queries) {
  const N = edges.length + 1;
  const MOD = 1000000007;

  const MAX_LOG_N = 18;

  const adj = Array.from({ length: N + 1 }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const depth = new Int32Array(N + 1).fill(0);
  const parent = Array.from({ length: N + 1 }, () =>
    new Int32Array(MAX_LOG_N).fill(0)
  );

  const queue = [1];
  const visited = new Uint8Array(N + 1);
  visited[1] = 1;

  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = 1;
        parent[v][0] = u;
        depth[v] = depth[u] + 1;
        queue.push(v);
      }
    }
  }

  for (let j = 1; j < MAX_LOG_N; j++) {
    for (let i = 1; i <= N; i++) {
      if (parent[i][j - 1] !== 0) {
        parent[i][j] = parent[parent[i][j - 1]][j - 1];
      }
    }
  }

  function getLCA(u, v) {
    if (depth[u] < depth[v]) {
      [u, v] = [v, u];
    }

    let diff = depth[u] - depth[v];
    for (let j = MAX_LOG_N - 1; j >= 0; j--) {
      if ((diff >> j) & 1) {
        u = parent[u][j];
      }
    }

    if (u === v) return u;

    for (let j = MAX_LOG_N - 1; j >= 0; j--) {
      if (parent[u][j] !== parent[v][j]) {
        u = parent[u][j];
        v = parent[v][j];
      }
    }
    return parent[u][0];
  }

  function power(base, exp) {
    let res = 1n;
    let b = BigInt(base);
    let e = BigInt(exp);
    const m = BigInt(MOD);

    while (e > 0n) {
      if (e % 2n === 1n) res = (res * b) % m;
      b = (b * b) % m;
      e = e / 2n;
    }
    return Number(res);
  }

  const results = [];
  for (const [u, v] of queries) {
    if (u === v) {
      results.push(0);
      continue;
    }

    const lca = getLCA(u, v);
    const k = depth[u] + depth[v] - 2 * depth[lca];

    results.push(power(2, k - 1));
  }

  return results;
};
