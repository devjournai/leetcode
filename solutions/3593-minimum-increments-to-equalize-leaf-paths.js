/**
 * Minimum Increments to Equalize Leaf Paths
 * Intuition: Root-to-leaf sums must match. At each node, children with a smaller down-path can be raised by incrementing that child once; nested fixes are counted in the recursion.
 * Approach: 1. DFS: for each child compute max path-sum from that child through a leaf. 2. Let M be the max among children. 3. Add 1 for every child whose path-sum < M. 4. Return total increments; a single path needs 0.
 * Dry Run: n = 3, edges = [[0,1],[0,2]], cost = [2,1,3]. Child paths 1 and 3. Increment node 1 once. Answer 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minIncrease = function (n, edges, cost) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  let answer = 0;

  const dfs = (u, parent) => {
    const childPaths = [];
    for (const v of graph[u]) {
      if (v === parent) {
        continue;
      }
      childPaths.push(dfs(v, u));
    }
    if (childPaths.length === 0) {
      return cost[u];
    }
    const mx = Math.max(...childPaths);
    for (const p of childPaths) {
      if (p < mx) {
        answer++;
      }
    }
    return cost[u] + mx;
  };

  dfs(0, -1);
  return answer;
};
