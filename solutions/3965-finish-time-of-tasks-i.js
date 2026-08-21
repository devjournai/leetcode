/**
 * Finish Time of Tasks I
 * Intuition: First, build the tree from the edge list edges and store each node's children in an adjacency list g.
 * Approach: First, build the tree from the edge list edges and store each node's children in an adjacency list g. Then perform DFS starting from the root node 0. Define a function dfs(i) that returns the finish time of task i: - If i is a leaf node, return baseTime[i] directly; - Otherwise, recursively compute the finish  *  of all children, and let earliest and latest be the minimum and maximum among them; - The own duration of the current task is ownDuration = (latest - earliest) + baseTime[i]; - The finish time of task i is latest + ownDuration.
 * Dry Run: Input: n = 3, edges = [[0,1],[1,2]], baseTime = [9,5,3]. Output: 17.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var finishTime = function (n, edges, baseTime) {
  const g = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    g[u].push(v);
  }

  const dfs = (i) => {
    if (g[i].length === 0) {
      return baseTime[i];
    }

    let earliest = Number.MAX_SAFE_INTEGER;
    let latest = -Number.MAX_SAFE_INTEGER;

    for (const j of g[i]) {
      const a = dfs(j);
      earliest = Math.min(earliest, a);
      latest = Math.max(latest, a);
    }

    const ownDuration = latest - earliest + baseTime[i];
    return latest + ownDuration;
  };

  return dfs(0);
};
