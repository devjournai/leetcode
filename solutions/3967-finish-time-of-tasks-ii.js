/**
 * Finish Time of Tasks II
 * Intuition: Reroot the tree: leaf finish = baseTime; internal uses min/max child finishes. Compute for every root. n typically modest; if large use rerooting.
 * Approach: 1. Try each root. 2. DFS compute finish. 3. Take min.
 * Dry Run: Input: n = 3, edges = [[0,1],[1,2]], baseTime = [9,1,5]. Output: 14.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minFinishTime = function (n, edges, baseTime) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    g[v].push(u);
  }
  const finish = (u, p) => {
    const child = [];
    for (const v of g[u]) if (v !== p) child.push(finish(v, u));
    if (!child.length) return baseTime[u];
    const earliest = Math.min(...child),
      latest = Math.max(...child);
    return latest + (latest - earliest) + baseTime[u];
  };
  let ans = Infinity;
  for (let r = 0; r < n; r++) ans = Math.min(ans, finish(r, -1));
  return ans;
};
