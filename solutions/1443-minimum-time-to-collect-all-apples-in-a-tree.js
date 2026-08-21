/**
 * Minimum Time To Collect All Apples In A Tree
 * Intuition: DFS from 0. A child subtree costs its internal travel plus 2 (down and back) iff that child has an apple or collected apples deeper.
 * Approach: 1. Build an undirected adjacency list. 2. Recurse (node, parent) summing child times. 3. If a child's returned time > 0 or hasApple[child], add time+2. 4. Return the root's accumulated time.
 * Dry Run: n=7, apples at nodes 2,4,7 (0-indexed 1,2,4 example style)
 *   - leaf apple: parent adds 2
 *   - path through empty nodes still pays 2 per edge on the way to apples
 *   - typical sample returns 8
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
          currentNodeId
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
