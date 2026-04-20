/**
 * Path With Maximum Probability
 * Time Complexity: O(N * E)
 * Space Complexity: O(N + E)
 */
var maxProbability = function (n, edges, succProb, startNode, endNode) {
  const maximumProbabilities = new Array(n).fill(0);
  maximumProbabilities[startNode] = 1;

  const nodeAdjacencyList = Array.from({ length: n }, () => []);
  for (
    let edgeIndexCounter = 0;
    edgeIndexCounter < edges.length;
    edgeIndexCounter++
  ) {
    const currentEdgeSegment = edges[edgeIndexCounter];
    const vertexAIdentifier = currentEdgeSegment[0];
    const vertexBIdentifier = currentEdgeSegment[1];
    const edgeProbabilityValue = succProb[edgeIndexCounter];

    nodeAdjacencyList[vertexAIdentifier].push([
      vertexBIdentifier,
      edgeProbabilityValue,
    ]);
    nodeAdjacencyList[vertexBIdentifier].push([
      vertexAIdentifier,
      edgeProbabilityValue,
    ]);
  }

  const traversalQueue = [startNode];
  let processPointer = 0;

  while (processPointer < traversalQueue.length) {
    const currentNodeId = traversalQueue[processPointer++];

    for (
      let neighborConnectionIndex = 0;
      neighborConnectionIndex < nodeAdjacencyList[currentNodeId].length;
      neighborConnectionIndex++
    ) {
      const neighborDetails =
        nodeAdjacencyList[currentNodeId][neighborConnectionIndex];
      const adjacentNodeId = neighborDetails[0];
      const connectionFactor = neighborDetails[1];

      const potentialMaxProb =
        maximumProbabilities[currentNodeId] * connectionFactor;

      if (potentialMaxProb > maximumProbabilities[adjacentNodeId]) {
        maximumProbabilities[adjacentNodeId] = potentialMaxProb;
        traversalQueue.push(adjacentNodeId);
      }
    }
  }

  return maximumProbabilities[endNode];
};
