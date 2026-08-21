/**
 * Shortest Path Visiting All Nodes
 * Intuition: State is (node, bitmask of visited). BFS from every start; first time the mask is all-ones is the shortest covering walk (nodes may be revisited).
 * Approach: 1. N=1 → 0. 2. `targetMask = (1<<N)-1`. Enqueue every (i, 1<<i, 0). 3. Expand neighbors with `newMask |= 1<<nb`; skip seen `(nb, mask)`. 4. Return pathLength when mask==target, else -1.
 * Dry Run: graph=[[1,2,3],[0],[0],[0]]. Start 0 mask 0001. Visit 1 → 0011, 2 → 0111, 3 → 1111 in 4 steps? From 0 to 1, back 0, to 2, back 0, to 3 = 4. BFS finds 4.
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
