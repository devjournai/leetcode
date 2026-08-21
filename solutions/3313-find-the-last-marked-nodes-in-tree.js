/**
 * Find the Last Marked Nodes in Tree
 * Intuition: Marking spreads to neighbors each second, so the last marked node from u is an endpoint of a longest path through u. Compute the two farthest marked leaves in each subtree, then reroot.
 * Approach: 1. Build the tree. 2. DFS: for subtree u store last1/last2 (farthest marked node and time). 3. Reroot: compare the parent-side last mark with subtree last1. 4. When moving to child v, if v sits on last1’s path use last2 instead.
 * Dry Run: edges = [[0,1],[1,2]]
 *   - From 0 last is 2, from 2 last is 0, from 1 last is 0 or 2
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var lastMarkedNodes = function (edges) {
  const n = edges.length + 1;
  const ans = Array(n).fill(0);
  const tree = Array.from({ length: n }, () => []);
  const dp = Array.from({ length: n }, () => ({
    last1: { node: 0, time: 0 },
    last2: { node: 0, time: 0 },
  }));

  for (const [u, v] of edges) {
    tree[u].push(v);
    tree[v].push(u);
  }

  const dfs = (u, prev) => {
    let last1 = { node: u, time: 0 };
    let last2 = { node: 0, time: 0 };
    for (const v of tree[u]) {
      if (v === prev) {
        continue;
      }
      const child = dfs(v, u);
      const time = child.time + 1;
      if (time > last1.time) {
        last2 = last1;
        last1 = { node: child.node, time };
      } else if (time > last2.time) {
        last2 = { node: child.node, time };
      }
    }
    dp[u] = { last1, last2 };
    return last1;
  };

  const reroot = (u, prev, last) => {
    ans[u] = last.time > dp[u].last1.time ? last.node : dp[u].last1.node;
    for (const v of tree[u]) {
      if (v === prev) {
        continue;
      }
      let newLast = { node: last.node, time: last.time + 1 };
      if (dp[u].last1.node === dp[v].last1.node) {
        const alternativeTime = 1 + dp[u].last2.time;
        if (alternativeTime > newLast.time) {
          newLast = { node: dp[u].last2.node, time: alternativeTime };
        }
      } else {
        const alternativeTime = 1 + dp[u].last1.time;
        if (alternativeTime > newLast.time) {
          newLast = { node: dp[u].last1.node, time: alternativeTime };
        }
      }
      reroot(v, u, newLast);
    }
  };

  dfs(0, -1);
  reroot(0, -1, { node: 0, time: 0 });
  return ans;
};
