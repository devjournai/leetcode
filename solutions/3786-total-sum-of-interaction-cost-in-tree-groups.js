/**
 * Total Sum of Interaction Cost in Tree Groups
 * Intuition: Path length between same-group nodes equals the number of edges whose removal separates those two nodes. For each edge, add (subtree count of group k) * (outside count of group k).
 * Approach: Root the tree, DFS/BFS from 0, and for each child subtree accumulate group counts (labels are 1..20). Crossing an edge contributes cnt[k] * (total[k] - cnt[k]) for every group k.
 * Dry Run: n = 3, all group 1. Edge 0-1 contributes 1*2=2, edge 1-2 contributes 1*2=2, total 4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var interactionCosts = function (n, edges, group) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  const mx = Math.max(...group);
  const total = Array(mx).fill(0);
  for (const x of group) {
    total[x - 1]++;
  }
  const order = [0];
  const parent = Array(n).fill(-1);
  for (let i = 0; i < order.length; i++) {
    const u = order[i];
    for (const v of adj[u]) {
      if (v === parent[u]) {
        continue;
      }
      parent[v] = u;
      order.push(v);
    }
  }
  const cnt = Array.from({ length: n }, () => Array(mx).fill(0));
  let result = 0;
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    cnt[u][group[u] - 1]++;
    for (const v of adj[u]) {
      if (u !== parent[v]) {
        continue;
      }
      for (let k = 0; k < mx; k++) {
        result += cnt[v][k] * (total[k] - cnt[v][k]);
        cnt[u][k] += cnt[v][k];
      }
    }
  }
  return result;
};
