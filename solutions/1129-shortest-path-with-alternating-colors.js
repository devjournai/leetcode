/**
 * Shortest Path With Alternating Colors
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var shortestAlternatingPaths = function (
  totalNodes,
  redEdgeList,
  blueEdgeList,
) {
  const redAdjacency = Array(totalNodes)
    .fill()
    .map(() => new Set());
  const blueAdjacency = Array(totalNodes)
    .fill()
    .map(() => new Set());

  for (const [startNodeRed, endNodeRed] of redEdgeList) {
    redAdjacency[startNodeRed].add(endNodeRed);
  }

  for (const [startNodeBlue, endNodeBlue] of blueEdgeList) {
    blueAdjacency[startNodeBlue].add(endNodeBlue);
  }

  const shortestPaths = Array(totalNodes)
    .fill()
    .map(() => [Infinity, Infinity]);
  const bfsQueue = [];

  shortestPaths[0][0] = 0;
  shortestPaths[0][1] = 0;

  bfsQueue.push([0, 0]);
  bfsQueue.push([0, 1]);

  while (bfsQueue.length > 0) {
    const [currentNodeId, previousEdgeColor] = bfsQueue.shift();

    let currentGraphReference;
    let nextEdgeColor;

    if (previousEdgeColor === 0) {
      currentGraphReference = blueAdjacency;
      nextEdgeColor = 1;
    } else {
      currentGraphReference = redAdjacency;
      nextEdgeColor = 0;
    }

    for (const neighborNodeId of currentGraphReference[currentNodeId]) {
      if (shortestPaths[neighborNodeId][nextEdgeColor] === Infinity) {
        const currentPathDistance =
          shortestPaths[currentNodeId][previousEdgeColor];
        shortestPaths[neighborNodeId][nextEdgeColor] = currentPathDistance + 1;
        bfsQueue.push([neighborNodeId, nextEdgeColor]);
      }
    }
  }

  const finalResult = Array(totalNodes);
  for (let indexValue = 0; indexValue < totalNodes; ++indexValue) {
    const pathRedEnding = shortestPaths[indexValue][0];
    const pathBlueEnding = shortestPaths[indexValue][1];
    const overallMinimum = Math.min(pathRedEnding, pathBlueEnding);
    finalResult[indexValue] = overallMinimum === Infinity ? -1 : overallMinimum;
  }

  return finalResult;
};
