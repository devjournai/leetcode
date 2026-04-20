/**
 * Tree Diameter
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var treeDiameter = function (edges) {
  if (edges.length === 0) return 0;

  const adjacencyGraph = new Map();
  for (const singleEdge of edges) {
    const nodeAlpha = singleEdge[0];
    const nodeBeta = singleEdge[1];

    if (!adjacencyGraph.has(nodeAlpha)) adjacencyGraph.set(nodeAlpha, []);
    if (!adjacencyGraph.has(nodeBeta)) adjacencyGraph.set(nodeBeta, []);

    adjacencyGraph.get(nodeAlpha).push(nodeBeta);
    adjacencyGraph.get(nodeBeta).push(nodeAlpha);
  }

  const performBfsTraversal = (initialNode, graphStructure) => {
    const traversedNodes = new Set();
    const bfsQueue = [[initialNode, 0]];
    traversedNodes.add(initialNode);

    let furthestNodeReached = initialNode;
    let maximumPathLength = 0;

    while (bfsQueue.length > 0) {
      const [currentNodeId, currentPathDistance] = bfsQueue.shift();

      if (currentPathDistance > maximumPathLength) {
        maximumPathLength = currentPathDistance;
        furthestNodeReached = currentNodeId;
      }

      const connectedNeighbors = graphStructure.get(currentNodeId) || [];
      for (const neighborId of connectedNeighbors) {
        if (!traversedNodes.has(neighborId)) {
          traversedNodes.add(neighborId);
          bfsQueue.push([neighborId, currentPathDistance + 1]);
        }
      }
    }
    return [furthestNodeReached, maximumPathLength];
  };

  const [firstFarthestNode, placeholderDistance] = performBfsTraversal(
    0,
    adjacencyGraph,
  );
  const [secondFarthestNode, actualDiameter] = performBfsTraversal(
    firstFarthestNode,
    adjacencyGraph,
  );

  return actualDiameter;
};
