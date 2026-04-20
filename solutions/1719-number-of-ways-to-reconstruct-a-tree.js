/**
 * Number Of Ways To Reconstruct A Tree
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var checkWays = function (pairs) {
  const adjacencyMap = new Map();
  for (const [firstNode, secondNode] of pairs) {
    if (!adjacencyMap.has(firstNode)) adjacencyMap.set(firstNode, new Set());
    if (!adjacencyMap.has(secondNode)) adjacencyMap.set(secondNode, new Set());
    adjacencyMap.get(firstNode).add(secondNode);
    adjacencyMap.get(secondNode).add(firstNode);
  }

  const allNodes = [...adjacencyMap.keys()];
  const totalNodesCount = allNodes.length;

  allNodes.sort(
    (nodeA, nodeB) =>
      adjacencyMap.get(nodeB).size - adjacencyMap.get(nodeA).size,
  );

  const assumedRoot = allNodes[0];

  if (adjacencyMap.get(assumedRoot).size !== totalNodesCount - 1) {
    return 0;
  }

  let waysAmbiguityCounter = 0;

  for (let nodeIndex = 1; nodeIndex < totalNodesCount; nodeIndex++) {
    const currentNode = allNodes[nodeIndex];
    let parentCandidateFound = false;

    for (let parentIndex = nodeIndex - 1; parentIndex >= 0; parentIndex--) {
      const potentialParent = allNodes[parentIndex];

      if (adjacencyMap.get(currentNode).has(potentialParent)) {
        const currentNodeNeighbors = adjacencyMap.get(currentNode);

        for (const currentNeighborOfNode of currentNodeNeighbors) {
          if (
            currentNeighborOfNode !== potentialParent &&
            !adjacencyMap.get(potentialParent).has(currentNeighborOfNode)
          ) {
            return 0;
          }
        }

        if (
          currentNodeNeighbors.size === adjacencyMap.get(potentialParent).size
        ) {
          waysAmbiguityCounter++;
        }

        parentCandidateFound = true;
        break;
      }
    }

    if (!parentCandidateFound) {
      return 0;
    }
  }

  return waysAmbiguityCounter > 0 ? 2 : 1;
};
