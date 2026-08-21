/**
 * Maximum Weighted K-Edge Path
 * Intuition: DAG-style DP of reachable path sums: from every node and edge-count, extend outgoing edges if the new sum stays strictly below t.
 * Approach: 1. Build adjacency. 2. dp[u][i] = set of sums of i-edge paths ending at u; start with 0 edges sum 0. 3. After k layers, take the maximum sum seen, or -1.
 * Dry Run: n=3, edges [[0,1,5],[1,2,3]], k=2, t=10. Path 0-1-2 sum 8 < 10 → 8.
 * Time Complexity: O(N^3 * K)
 * Space Complexity: O(N^2 * K)
 */
var maxWeight = function (n, edges, k, t) {
  const graph = Array.from({ length: n }, () => []);
  const dp = Array.from({ length: n }, () => new Map());

  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
  }

  for (let u = 0; u < n; u++) {
    dp[u].set(0, new Set([0]));
  }

  for (let i = 0; i < k; i++) {
    for (let u = 0; u < n; u++) {
      if (!dp[u].has(i)) continue;
      for (const currSum of dp[u].get(i)) {
        for (const [v, w] of graph[u]) {
          const newSum = currSum + w;
          if (newSum < t) {
            if (!dp[v].has(i + 1)) dp[v].set(i + 1, new Set());
            dp[v].get(i + 1).add(newSum);
          }
        }
      }
    }
  }

  let answer = -1;
  for (let u = 0; u < n; u++) {
    if (dp[u].has(k)) {
      for (const sum of dp[u].get(k)) {
        answer = Math.max(answer, sum);
      }
    }
  }
  return answer;
};
