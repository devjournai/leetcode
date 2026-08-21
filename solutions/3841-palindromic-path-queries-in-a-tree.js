/**
 * Palindromic Path Queries in a Tree
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: n = 3, edges = [[0,1],[1,2]], s = &quot;aac&quot;, queries = [&quot;query 0 2&quot;,&quot;update 1 b&quot;,&quot;query 0 2&quot;] => Output: [true,false]
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N log N)
 */
var pathQueries = function (n, edges, s, queries) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    g[v].push(u);
  }
  const LOG = 17;
  const parent = Array.from({ length: LOG }, () => new Array(n).fill(-1));
  const depth = new Array(n).fill(0);
  const tin = new Array(n).fill(0);
  const tout = new Array(n).fill(0);
  let timer = 0;
  const dfs = (u, p) => {
    tin[u] = ++timer;
    parent[0][u] = p;
    for (const v of g[u]) {
      if (v === p) continue;
      depth[v] = depth[u] + 1;
      dfs(v, u);
    }
    tout[u] = timer;
  };
  dfs(0, -1);
  for (let k = 1; k < LOG; k++) {
    for (let i = 0; i < n; i++) {
      const p = parent[k - 1][i];
      parent[k][i] = p === -1 ? -1 : parent[k - 1][p];
    }
  }
  const lca = (u, v) => {
    if (depth[u] < depth[v]) [u, v] = [v, u];
    let diff = depth[u] - depth[v];
    for (let k = 0; k < LOG; k++) if (diff & (1 << k)) u = parent[k][u];
    if (u === v) return u;
    for (let k = LOG - 1; k >= 0; k--) {
      if (parent[k][u] !== parent[k][v]) {
        u = parent[k][u];
        v = parent[k][v];
      }
    }
    return parent[0][u];
  };
  const bit = new Array(n + 3).fill(0);
  const add = (i, val) => {
    for (; i < bit.length; i += i & -i) bit[i] ^= val;
  };
  const prefix = (i) => {
    let r = 0;
    for (; i > 0; i -= i & -i) r ^= bit[i];
    return r;
  };
  const chars = s.split("").map((c) => c.charCodeAt(0) - 97);
  const apply = (u, mask) => {
    add(tin[u], mask);
    add(tout[u] + 1, mask);
  };
  for (let i = 0; i < n; i++) apply(i, 1 << chars[i]);
  const pathMask = (u, v) => {
    const a = lca(u, v);
    return prefix(tin[u]) ^ prefix(tin[v]) ^ (1 << chars[a]);
  };
  const ans = [];
  for (const q of queries) {
    const parts = q.split(" ");
    if (parts[0] === "update") {
      const u = Number(parts[1]);
      const c = parts[2].charCodeAt(0) - 97;
      apply(u, (1 << chars[u]) ^ (1 << c));
      chars[u] = c;
    } else {
      const u = Number(parts[1]);
      const v = Number(parts[2]);
      const mask = pathMask(u, v);
      ans.push((mask & (mask - 1)) === 0);
    }
  }
  return ans;
};
