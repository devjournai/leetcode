/**
 * Number Of Nodes In The Sub Tree With The Same Label
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countSubTrees = function (totalNodes, graphEdges, nodeLabels) {
  const nodeConnections = new Array(totalNodes);
  let adjacencyCreationIndex = 0;
  while (adjacencyCreationIndex < totalNodes) {
    nodeConnections[adjacencyCreationIndex] = [];
    adjacencyCreationIndex++;
  }

  const finalCounts = new Array(totalNodes).fill(0);

  let edgeIterationIndex = 0;
  while (edgeIterationIndex < graphEdges.length) {
    const currentEdge = graphEdges[edgeIterationIndex];
    const firstNode = currentEdge[0];
    const secondNode = currentEdge[1];
    nodeConnections[firstNode].push(secondNode);
    nodeConnections[secondNode].push(firstNode);
    edgeIterationIndex++;
  }

  function traverseSubtree(currentVertex, parentVertex, labelOccurrenceMap) {
    const currentVertexLabel = nodeLabels.charCodeAt(currentVertex) - 97;

    const countBeforeTraversal = labelOccurrenceMap[currentVertexLabel];

    labelOccurrenceMap[currentVertexLabel]++;

    let neighborIterationIndex = 0;
    const currentNeighbors = nodeConnections[currentVertex];
    while (neighborIterationIndex < currentNeighbors.length) {
      const neighborVertex = currentNeighbors[neighborIterationIndex];
      if (neighborVertex !== parentVertex) {
        traverseSubtree(neighborVertex, currentVertex, labelOccurrenceMap);
      }
      neighborIterationIndex++;
    }

    finalCounts[currentVertex] =
      labelOccurrenceMap[currentVertexLabel] - countBeforeTraversal;
  }

  traverseSubtree(0, -1, new Array(26).fill(0));

  return finalCounts;
};
