/**
 * Count Connected Subgraphs with Even Node Sum
 * Intuition: Notice that the number of nodes in the problem does not exceed 13, so we can enumerate all non-empty subsets s of nodes. For each subset, we calculate the total sum of node values and check whether its induced subgraph is connected.
 * Approach: Notice that the number of nodes in the problem does not exceed 13, so we can enumerate all non-empty subsets s of nodes. For each subset, we calculate the total sum of node values and check whether its induced subgraph is connected. Specifically, we can use an integer sub to represent the subset s, where the i-th bit of sub is 1 if node i is in the subset, and 0 otherwise. For each subset, we first compute the sum of its node values. If the sum is odd, we skip this subset; otherwise, we use DFS to check whether the induced subgraph is connected. We can use an integer vis to represent the visited nodes: initially, the i-th bit of vis is 1 if node i is not in the subset, and 0 if node i is in the subset. We start DFS from any node in subset s, visit all its adjacent nodes, and mark visited nodes in vis as 1. Finally, if all bits in vis are 1, it means the induced subgraph of subset s is connected, so we increment the answer by 1.
 * Dry Run: Input: nums = [1,0,1], edges = [[0,1],[1,2]]. Output: 2.
 * Time Complexity: O(2^n * (n+m))
 * Space Complexity: O(n+m)
 */
var evenSumSubgraphs = function (nums, edges) {
  const n = nums.length;
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    g[v].push(u);
  }
  const m = (1 << n) - 1;
  let ans = 0;
  let vis = 0;

  const dfs = (u) => {
    vis |= 1 << u;
    for (const v of g[u]) {
      if (((vis >> v) & 1) === 0) {
        dfs(v);
      }
    }
  };

  for (let sub = 1; sub <= m; sub++) {
    let s = 0;
    for (let i = 0; i < n; i++) {
      if ((sub >> i) & 1) {
        s += nums[i];
      }
    }
    if (s % 2 !== 0) {
      continue;
    }
    vis = m ^ sub;
    dfs(sub.toString(2).length - 1);
    if (vis === m) {
      ans++;
    }
  }
  return ans;
};
