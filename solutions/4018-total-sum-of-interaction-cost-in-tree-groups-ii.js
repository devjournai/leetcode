/**
 * Total Sum of Interaction Cost in Tree Groups II
 * Intuition: Sum of distances among same-group pairs. For each group, compute sum of pairwise distances on the tree.
 * Approach: For each group, virtual tree or: contribution of each edge = (nodes of group on one side)*(on other side)*1. DFS subtree group counts.
 * Dry Run: Input: n=3, all group 1. Output: 4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var interactionCost = function (n, edges, group) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    g[v].push(u);
  }
  const by = new Map();
  for (let i = 0; i < n; i++) {
    if (!by.has(group[i])) by.set(group[i], []);
    by.get(group[i]).push(i);
  }
  let ans = 0;
  const countIn = Array(n).fill(0);
  const dfs = (u, p, mark) => {
    countIn[u] = mark[u] ? 1 : 0;
    for (const v of g[u])
      if (v !== p) {
        dfs(v, u, mark);
        countIn[u] += countIn[v];
      }
  };
  for (const nodes of by.values()) {
    if (nodes.length < 2) continue;
    const mark = Array(n).fill(false);
    for (const x of nodes) mark[x] = true;
    dfs(0, -1, mark);
    const total = nodes.length;
    const walk = (u, p) => {
      for (const v of g[u])
        if (v !== p) {
          ans += countIn[v] * (total - countIn[v]);
          walk(v, u);
        }
    };
    walk(0, -1);
  }
  return ans;
};
