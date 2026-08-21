/**
 * Shortest Path With Alternating Colors
 * Intuition: A shortest path to a node may depend on the color of the last edge, so BFS on states (node, lastColor). From a red arrival take a blue edge, and vice versa.
 * Approach: 1. Build red and blue adjacency sets. 2. Distances[node][0/1] start at Infinity except node 0 both colors 0. 3. Queue (0,red) and (0,blue). 4. From (u, prevColor) walk the opposite-color neighbors; first visit to (v, nextColor) is shortest. 5. Answer per node is min of the two colors, or -1.
 * Dry Run: n = 3, red = [[0,1],[1,2]], blue = [].
 *   - From 0 with last red, take blue: none. From 0 with last blue, take red to 1 (dist 1).
 *   - From 1 last-red, take blue: none. Node 2 stays unreachable.
 *   - Answer [0,1,-1].
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var shortestAlternatingPaths = function (
  totalNodes,
  redEdgeList,
  blueEdgeList
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
