/**
 * Tree Diameter
 * Intuition: In a tree the longest path ends at a farthest leaf from an arbitrary start, then at the farthest node from that leaf. Two BFS passes find those endpoints.
 * Approach: 1. If there are no edges, return 0. 2. Build an undirected adjacencyGraph from edges. 3. BFS from node 0 to find firstFarthestNode. 4. BFS from that node; the distance returned is actualDiameter. 5. Return actualDiameter.
 * Dry Run: edges = [[0,1],[1,2],[2,3],[1,4]]
 *   BFS from 0: furthest is 3 (or 4) at distance 3 from 0 along 0-1-2-3.
 *   BFS from 3: path 3-2-1-4 has length 3. Return 3.
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
    adjacencyGraph
  );
  const [secondFarthestNode, actualDiameter] = performBfsTraversal(
    firstFarthestNode,
    adjacencyGraph
  );

  return actualDiameter;
};
