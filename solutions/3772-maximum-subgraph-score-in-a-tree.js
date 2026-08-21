/**
 * Maximum Subgraph Score in a Tree
 * Intuition: Score is (#good - #bad) of a connected subtree. For rerooting, keep a child's subtree only when its score is positive.
 * Approach: 1. Root the tree at 0 and compute down-scores: dp[u] = value(u) + sum max(dp[child], 0). 2. Reroot: add the parent's leftover score (parent total minus this child's contribution) when it is positive.
 * Dry Run: n = 5, good = [0,1,0,1,1]. After rerooting the answers are [2,3,2,3,3].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxSubgraphScore = function (n, edges, good) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  const parent = Array(n).fill(-1);
  const q = [0];
  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    for (const v of adj[u]) {
      if (v === parent[u]) {
        continue;
      }
      parent[v] = u;
      q.push(v);
    }
  }
  const dp = good.map((x) => (x ? 1 : -1));
  for (let i = q.length - 1; i >= 0; i--) {
    const u = q[i];
    if (parent[u] === -1) {
      continue;
    }
    dp[parent[u]] += Math.max(dp[u], 0);
  }
  for (const u of q) {
    if (parent[u] === -1) {
      continue;
    }
    dp[u] += Math.max(dp[parent[u]] - Math.max(dp[u], 0), 0);
  }
  return dp;
};
