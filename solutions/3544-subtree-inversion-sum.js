/**
 * Subtree Inversion Sum
 * Intuition: At each node you may invert the whole remaining subtree if k steps have passed since the last inversion; DP chooses invert vs keep to maximize the signed sum.
 * Approach: 1. Build the undirected tree. 2. dfs(u, stepsSinceInversion, inverted) adds ±nums[u] and children with incremented cooldown. 3. When cooldown is k, also try flipping inverted for children with cooldown reset to 1.
 * Dry Run: a two-node tree with values [1,-10], k=1. Invert the child subtree to turn -10 into +10.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N * K)
 */
var subtreeInversionSum = function (edges, nums, k) {
  const n = edges.length + 1;
  const parent = new Array(n).fill(-1);
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const memo = Array.from({ length: n }, () =>
    Array.from({ length: k + 1 }, () => [null, null])
  );

  const dfs = (u, stepsSinceInversion, inverted) => {
    const inv = inverted ? 1 : 0;
    if (memo[u][stepsSinceInversion][inv] !== null) {
      return memo[u][stepsSinceInversion][inv];
    }
    let num = inverted ? -nums[u] : nums[u];
    let negNum = -num;
    for (const v of graph[u]) {
      if (v === parent[u]) continue;
      parent[v] = u;
      num += dfs(v, Math.min(k, stepsSinceInversion + 1), inverted);
      if (stepsSinceInversion === k) {
        negNum += dfs(v, 1, !inverted);
      }
    }
    const result = stepsSinceInversion === k ? Math.max(num, negNum) : num;
    memo[u][stepsSinceInversion][inv] = result;
    return result;
  };

  return dfs(0, k, false);
};
