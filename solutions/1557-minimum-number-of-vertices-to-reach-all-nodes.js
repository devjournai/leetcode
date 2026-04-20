/**
 * Minimum Number Of Vertices To Reach All Nodes
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
