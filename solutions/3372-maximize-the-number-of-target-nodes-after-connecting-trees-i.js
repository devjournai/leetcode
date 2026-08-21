/**
 * Maximize the Number of Target Nodes After Connecting Trees I
 * Intuition: Connecting node `i` in tree1 to some node in tree2 adds every tree2 node within distance `k-1` of that node. That extra is independent of `i`, so we take the maximum over tree2 starts, then add nodes within distance `k` of `i` in tree1.
 * Approach: 1. Build adjacency lists for both trees. 2. If `k > 0`, DFS every tree2 root for nodes within `k-1`; keep the max. 3. For each tree1 node, DFS nodes within `k` and add that max. 4. Return the array.
 * Dry Run: tree1 path of 2 nodes, tree2 path of 2 nodes, k=1. Tree2 max within 0 is 1. Each tree1 node reaches 2 in its tree plus 1 from tree2 → [3, 3].
 * Time Complexity: O(K * (N + M))
 * Space Complexity: O(N + M)
 */
var maxTargetNodes = function (edges1, edges2, k) {
  const buildGraph = (edges) => {
    const graph = Array.from({ length: edges.length + 1 }, () => []);
    for (const [nodeU, nodeV] of edges) {
      graph[nodeU].push(nodeV);
      graph[nodeV].push(nodeU);
    }
    return graph;
  };

  const countWithinDistance = (graph, node, parent, remainingSteps) => {
    if (remainingSteps === 0) {
      return 1;
    }
    let reachedCount = 1;
    for (const neighbor of graph[node]) {
      if (neighbor !== parent) {
        reachedCount += countWithinDistance(
          graph,
          neighbor,
          node,
          remainingSteps - 1
        );
      }
    }
    return reachedCount;
  };

  const graph1 = buildGraph(edges1);
  const graph2 = buildGraph(edges2);
  let maxReachableInGraph2 = 0;

  if (k > 0) {
    for (let node = 0; node < edges2.length + 1; node++) {
      maxReachableInGraph2 = Math.max(
        maxReachableInGraph2,
        countWithinDistance(graph2, node, -1, k - 1)
      );
    }
  }

  const answer = [];
  for (let node = 0; node < edges1.length + 1; node++) {
    answer.push(
      maxReachableInGraph2 + countWithinDistance(graph1, node, -1, k)
    );
  }
  return answer;
};
