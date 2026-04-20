/**
 * Reachable Nodes In Subdivided Graph
 * Time Complexity: O(N * E * log E)
 * Space Complexity: O(N + E)
 */
var reachableNodes = function (edges, maxMoves, n) {
  const graphAdjacency = {};
  let firstNodeIndex = 0;
  while (firstNodeIndex < n) {
    graphAdjacency[firstNodeIndex] = [];
    firstNodeIndex++;
  }

  let edgeDefinitionIndex = 0;
  while (edgeDefinitionIndex < edges.length) {
    const currentEdgeDetails = edges[edgeDefinitionIndex];
    const primaryNode = currentEdgeDetails[0];
    const secondaryNode = currentEdgeDetails[1];
    const newNodesCount = currentEdgeDetails[2];
    graphAdjacency[primaryNode].push([secondaryNode, newNodesCount]);
    graphAdjacency[secondaryNode].push([primaryNode, newNodesCount]);
    edgeDefinitionIndex++;
  }

  const shortestDistances = {};
  let secondNodeIndex = 0;
  while (secondNodeIndex < n) {
    shortestDistances[secondNodeIndex] = Infinity;
    secondNodeIndex++;
  }
  shortestDistances[0] = 0;

  const minPriorityQueue = [[0, 0]];
  const edgeVisitedCounts = {};

  while (minPriorityQueue.length > 0) {
    minPriorityQueue.sort((itemA, itemB) => itemA[0] - itemB[0]);
    const [currentDistVal, currentNodeId] = minPriorityQueue.shift();

    if (currentDistVal > shortestDistances[currentNodeId]) {
      continue;
    }

    let neighborIterationIndex = 0;
    const currentNeighborsList = graphAdjacency[currentNodeId];
    while (neighborIterationIndex < currentNeighborsList.length) {
      const neighborDetails = currentNeighborsList[neighborIterationIndex];
      const neighborVertexId = neighborDetails[0];
      const edgeIntermediateNodes = neighborDetails[1];

      const edgeKeyPartOne = Math.min(currentNodeId, neighborVertexId);
      const edgeKeyPartTwo = Math.max(currentNodeId, neighborVertexId);
      const compositeEdgeIdentifier = `${edgeKeyPartOne}-${edgeKeyPartTwo}`;
      const travelDirectionIndex = currentNodeId < neighborVertexId ? 0 : 1;

      if (!edgeVisitedCounts[compositeEdgeIdentifier]) {
        edgeVisitedCounts[compositeEdgeIdentifier] = [0, 0];
      }
      const nodesReachableOnSegment = Math.min(
        maxMoves - currentDistVal,
        edgeIntermediateNodes,
      );
      edgeVisitedCounts[compositeEdgeIdentifier][travelDirectionIndex] =
        Math.max(
          edgeVisitedCounts[compositeEdgeIdentifier][travelDirectionIndex],
          nodesReachableOnSegment,
        );

      const costToNeighbor = currentDistVal + edgeIntermediateNodes + 1;
      if (
        costToNeighbor <= maxMoves &&
        costToNeighbor < shortestDistances[neighborVertexId]
      ) {
        shortestDistances[neighborVertexId] = costToNeighbor;
        minPriorityQueue.push([
          shortestDistances[neighborVertexId],
          neighborVertexId,
        ]);
      }
      neighborIterationIndex++;
    }
  }

  let totalReachableNodesCount = 0;
  let thirdNodeIndex = 0;
  while (thirdNodeIndex < n) {
    if (shortestDistances[thirdNodeIndex] <= maxMoves) {
      totalReachableNodesCount++;
    }
    thirdNodeIndex++;
  }

  let originalEdgeIndex = 0;
  while (originalEdgeIndex < edges.length) {
    const currentOriginalEdge = edges[originalEdgeIndex];
    const sourceOriginalNode = currentOriginalEdge[0];
    const targetOriginalNode = currentOriginalEdge[1];
    const totalNewNodes = currentOriginalEdge[2];

    const keyForEdgeFirst = Math.min(sourceOriginalNode, targetOriginalNode);
    const keyForEdgeSecond = Math.max(sourceOriginalNode, targetOriginalNode);
    const edgeCompositeKey = `${keyForEdgeFirst}-${keyForEdgeSecond}`;

    if (edgeVisitedCounts[edgeCompositeKey]) {
      const reachedFromSideA = edgeVisitedCounts[edgeCompositeKey][0];
      const reachedFromSideB = edgeVisitedCounts[edgeCompositeKey][1];
      const combinedReachedOnEdge = reachedFromSideA + reachedFromSideB;
      totalReachableNodesCount += Math.min(
        totalNewNodes,
        combinedReachedOnEdge,
      );
    }
    originalEdgeIndex++;
  }

  return totalReachableNodesCount;
};
