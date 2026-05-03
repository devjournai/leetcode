/**
 * Largest Color Value In A Directed Graph
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var largestPathValue = function (colors, edges) {
  const totalNodes = colors.length;
  const adjList = Array.from({ length: totalNodes }, () => []);
  const nodeInDegree = new Array(totalNodes).fill(0);
  const dpColorCounts = Array.from({ length: totalNodes }, () =>
    new Array(26).fill(0),
  );
  const processingQueue = [];
  let maximumColorValue = 0;
  let nodesProcessedCount = 0;

  for (const [sourceNodeId, targetNodeId] of edges) {
    adjList[sourceNodeId].push(targetNodeId);
    nodeInDegree[targetNodeId]++;
  }

  for (let nodeIdx = 0; nodeIdx < totalNodes; nodeIdx++) {
    if (nodeInDegree[nodeIdx] === 0) {
      processingQueue.push(nodeIdx);
    }
  }

  while (processingQueue.length > 0) {
    const currentNode = processingQueue.shift();
    nodesProcessedCount++;

    const charCodeOffset = 97;
    const nodeColorIndex = colors.charCodeAt(currentNode) - charCodeOffset;
    dpColorCounts[currentNode][nodeColorIndex]++;

    for (const neighborNode of adjList[currentNode]) {
      for (let colorType = 0; colorType < 26; colorType++) {
        dpColorCounts[neighborNode][colorType] = Math.max(
          dpColorCounts[neighborNode][colorType],
          dpColorCounts[currentNode][colorType],
        );
      }
      nodeInDegree[neighborNode]--;
      if (nodeInDegree[neighborNode] === 0) {
        processingQueue.push(neighborNode);
      }
    }

    maximumColorValue = Math.max(
      maximumColorValue,
      ...dpColorCounts[currentNode],
    );
  }

  return nodesProcessedCount === totalNodes ? maximumColorValue : -1;
};
