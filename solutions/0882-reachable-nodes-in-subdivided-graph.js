/**
 * Reachable Nodes In Subdivided Graph
 * Intuition: Original nodes plus `cnt` nodes on each edge. Dijkstra from 0 with a sort-based min-queue finds how far we can travel (`maxMoves`). Along each undirected edge, count intermediate nodes reached from either endpoint without double-counting overlap.
 * Approach: 1. Build undirected adj lists of `[neighbor, newNodesCount]`. 2. `shortestDistances[0]=0`, others Infinity; queue `[dist, node]`. 3. Pop smallest dist; skip stale. For each neighbor, record `min(maxMoves-dist, cnt)` on that directed side of the edge key `"min-max"`. If `dist+cnt+1 ≤ maxMoves` and improves, push. 4. Count original nodes with dist ≤ maxMoves. 5. For each edge add `min(cnt, reachedA+reachedB)`.
 * Dry Run: edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3.
 *   - Distances: 0→0, 0→2 cost 2, 2→1 cost 5. All 3 original nodes. Edge 0-1: 6+1=7 intermediates; 0-2: 1; 1-2: min(2,1+2)=2. Total 13.
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
        edgeIntermediateNodes
      );
      edgeVisitedCounts[compositeEdgeIdentifier][travelDirectionIndex] =
        Math.max(
          edgeVisitedCounts[compositeEdgeIdentifier][travelDirectionIndex],
          nodesReachableOnSegment
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
        combinedReachedOnEdge
      );
    }
    originalEdgeIndex++;
  }

  return totalReachableNodesCount;
};
