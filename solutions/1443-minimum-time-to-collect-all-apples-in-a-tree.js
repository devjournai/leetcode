/**
 * Minimum Time To Collect All Apples In A Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minTime = function (n, edges, hasApple) {
  const adjacencyStructure = new Map();

  for (let currentVertex = 0; currentVertex < n; currentVertex++) {
    adjacencyStructure.set(currentVertex, []);
  }

  for (const currentEdge of edges) {
    const vertexA = currentEdge[0];
    const vertexB = currentEdge[1];
    adjacencyStructure.get(vertexA).push(vertexB);
    adjacencyStructure.get(vertexB).push(vertexA);
  }

  function calculateSubtreeTime(currentNodeId, parentNodeId) {
    let accumulatedTravelTime = 0;

    const neighborNodes = adjacencyStructure.get(currentNodeId);

    for (const neighborId of neighborNodes) {
      if (neighborId !== parentNodeId) {
        const timeFromRecursiveCall = calculateSubtreeTime(
          neighborId,
          currentNodeId,
        );
        const hasAppleAtNeighbor = hasApple[neighborId];

        if (timeFromRecursiveCall > 0 || hasAppleAtNeighbor) {
          accumulatedTravelTime += timeFromRecursiveCall + 2;
        }
      }
    }
    return accumulatedTravelTime;
  }

  return calculateSubtreeTime(0, -1);
};
