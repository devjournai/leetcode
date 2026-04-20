/**
 * Shortest Path Visiting All Nodes
 * Time Complexity: O(N^2 * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var shortestPathLength = function (graph) {
  const nodeCount = graph.length;

  if (nodeCount === 1) {
    return 0;
  }

  const targetMask = (1 << nodeCount) - 1;
  const bfsQueue = [];
  const pathTracker = new Set();

  for (
    let initialNodeIndex = 0;
    initialNodeIndex < nodeCount;
    initialNodeIndex++
  ) {
    const initialBitmask = 1 << initialNodeIndex;
    bfsQueue.push([initialNodeIndex, initialBitmask, 0]);
    pathTracker.add(`${initialNodeIndex},${initialBitmask}`);
  }

  while (bfsQueue.length > 0) {
    const currentPathSegment = bfsQueue.shift();
    const thisNode = currentPathSegment[0];
    const currentBitmask = currentPathSegment[1];
    const pathLength = currentPathSegment[2];

    if (currentBitmask === targetMask) {
      return pathLength;
    }

    const neighborList = graph[thisNode];
    for (const nextNeighbor of neighborList) {
      const newBitmask = currentBitmask | (1 << nextNeighbor);
      const visitedKey = `${nextNeighbor},${newBitmask}`;
      if (!pathTracker.has(visitedKey)) {
        pathTracker.add(visitedKey);
        const nextEntry = [nextNeighbor, newBitmask, pathLength + 1];
        bfsQueue.push(nextEntry);
      }
    }
  }

  return -1;
};
