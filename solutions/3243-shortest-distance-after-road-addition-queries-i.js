/**
 * Shortest Distance After Road Addition Queries I
 * Intuition: Start with the path 0-1-...-(n-1). Each new road can only help, so keep current distances and BFS only when a new edge improves a node.
 * Approach: 1. dist[i] = i and edges i -> i+1. 2. For each query (u, v), add the edge. If dist[u]+1 < dist[v], set dist[v] and BFS from v relaxing neighbors. 3. Record dist[n-1].
 * Dry Run: n = 5, queries = [[2, 4], [0, 2], [0, 4]]. After [2,4] dist[4]=3. After [0,2] dist[4]=3. After [0,4] dist[4]=1. Answer [3, 3, 1].
 * Time Complexity: O(q (n + q))
 * Space Complexity: O(n + q)
 */
var shortestDistanceAfterQueries = function (n, queries) {
  const answer = [];
  const dist = Array.from({ length: n }, (_, index) => index);
  const graph = Array.from({ length: n }, () => []);

  for (let i = 0; i < n - 1; i++) {
    graph[i].push(i + 1);
  }

  const bfs = (start) => {
    const queue = [start];
    for (let head = 0; head < queue.length; head++) {
      const u = queue[head];
      for (const v of graph[u]) {
        if (dist[u] + 1 < dist[v]) {
          dist[v] = dist[u] + 1;
          queue.push(v);
        }
      }
    }
  };

  for (const [u, v] of queries) {
    graph[u].push(v);
    if (dist[u] + 1 < dist[v]) {
      dist[v] = dist[u] + 1;
      bfs(v);
    }
    answer.push(dist[n - 1]);
  }

  return answer;
};
