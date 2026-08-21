/**
 * Shortest Distance After Road Addition Queries II
 * Intuition: Queries never nest, so each new road u -> v (v > next[u]) shortcuts a contiguous chain. The shortest path length is the number of remaining jumps in a compressed next-map.
 * Approach: 1. Map each i to i+1. 2. For query (u, v), if u still exists and next[u] < v, erase every node strictly between u and v. 3. Set next[u] = v and append map size (edges left).
 * Dry Run: n = 5, queries = [[2, 4], [0, 2], [0, 4]]. After [2,4] erase 3, size 3. After [0,2] erase 1, size 2. After [0,4] erase 2, size 1.
 * Time Complexity: O(n + q)
 * Space Complexity: O(n)
 */
var shortestDistanceAfterQueries = function (n, queries) {
  const answer = [];
  const nodeToFarthestNode = new Map();

  for (let i = 0; i < n - 1; i++) {
    nodeToFarthestNode.set(i, i + 1);
  }

  for (const [u, v] of queries) {
    if (nodeToFarthestNode.has(u) && nodeToFarthestNode.get(u) < v) {
      let node = nodeToFarthestNode.get(u);
      while (node < v) {
        const nextNode = nodeToFarthestNode.get(node);
        nodeToFarthestNode.delete(node);
        node = nextNode;
      }
      nodeToFarthestNode.set(u, v);
    }
    answer.push(nodeToFarthestNode.size);
  }

  return answer;
};
