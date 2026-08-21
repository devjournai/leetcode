/**
 * Minimum Number Of Vertices To Reach All Nodes
 * Intuition: In a DAG, nodes with indegree 0 are exactly the smallest set that can reach everyone.
 * Approach: 1. Mark nodes that appear as edge targets. 2. Collect unmarked indices.
 * Dry Run: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]].
 *   - Indegree-0 nodes: 0 and 3.
 * Time Complexity: O(n + E)
 * Space Complexity: O(n)
 */
var findSmallestSetOfVertices = function (n, edges) {
  const nodeReceivesIncoming = new Array(n).fill(false);

  edges.forEach((currentEdge) => {
    const targetNode = currentEdge[1];
    nodeReceivesIncoming[targetNode] = true;
  });

  const startingVertices = [];
  for (let currentNodeIndex = 0; currentNodeIndex < n; currentNodeIndex++) {
    if (!nodeReceivesIncoming[currentNodeIndex]) {
      startingVertices.push(currentNodeIndex);
    }
  }

  return startingVertices;
};
