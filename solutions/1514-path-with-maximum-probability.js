/**
 * Path With Maximum Probability
 * Intuition: Maximize the product of success probabilities. Relax like a queue-based Bellman-Ford: push a neighbor when a better product is found.
 * Approach: 1. Build undirected adj with edge probs. 2. best[start]=1. 3. If best[u]*w > best[v], update and enqueue. 4. Return best[end].
 * Dry Run: n=3, edges=[[0,1],[1,2],[0,2]], succProb=[0.5,0.5,0.2], start=0, end=2.
 *   - 0→1:0.5 then 1→2:0.25 vs 0→2:0.2 → 0.25.
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
