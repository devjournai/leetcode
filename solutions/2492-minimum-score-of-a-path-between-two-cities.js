/**
 * Minimum Score Of A Path Between Two Cities
 * Intuition: All roads forming any path between city 1 and city 'n' (within their connected component) can determine the path's score. To find the minimum possible score, we need to identify the minimum distance among all roads in the connected component that includes city 1 (and, by problem statement, city 'n'). A Breadth-First Search (BFS) starting from city 1 effectively explores this entire connected component.
 * Approach: 1. Build an adjacency list graph `cityAdjacencies` from the input `roadConnections`, storing `[neighborCity, distance]` for each road. 2. Initialize a `bfsTraversalQueue` with city 1, an `encounteredNodes` set, and `overallMinimumScore` to infinity. 3. Perform a BFS: Dequeue a `processingCity`. If unvisited, mark it visited. For each `neighborInfo` (neighbor city and edge length) connected to `processingCity`, update `overallMinimumScore` with `Math.min(overallMinimumScore, edgeLength)`. If the neighbor city is unvisited, enqueue it. 4. Return the final `overallMinimumScore`.
 * Dry Run: n = 4, roads = [[1,2,9],[2,3,6],[3,4,5],[1,4,7]]
 *   1. Graph `cityAdjacencies`: 1:[[2,9],[4,7]], 2:[[1,9],[3,6]], 3:[[2,6],[4,5]], 4:[[3,5],[1,7]]
 *   2. Init: `bfsTraversalQueue = [1]`, `encounteredNodes = {}`, `overallMinimumScore = Infinity`
 *   3. BFS:
 *      - Dequeue `processingCity = 1`. `encounteredNodes.add(1)`. Neighbors:
 *          - [2,9]: `overallMinimumScore = 9`. `bfsTraversalQueue.push(2)`.
 *          - [4,7]: `overallMinimumScore = 7`. `bfsTraversalQueue.push(4)`.
 *          `bfsTraversalQueue = [2,4]`, `encounteredNodes = {1}`
 *      - Dequeue `processingCity = 2`. `encounteredNodes.add(2)`. Neighbors:
 *          - [1,9]: `overallMinimumScore = 7`. 1 is visited.
 *          - [3,6]: `overallMinimumScore = 6`. `bfsTraversalQueue.push(3)`.
 *          `bfsTraversalQueue = [4,3]`, `encounteredNodes = {1,2}`
 *      - Dequeue `processingCity = 4`. `encounteredNodes.add(4)`. Neighbors:
 *          - [3,5]: `overallMinimumScore = 5`. `bfsTraversalQueue.push(3)`. (3 already in queue but Set handles unique processing)
 *          - [1,7]: `overallMinimumScore = 5`. 1 is visited.
 *          `bfsTraversalQueue = [3,3]`, `encounteredNodes = {1,2,4}`
 *      - Dequeue `processingCity = 3`. `encounteredNodes.add(3)`. Neighbors:
 *          - [2,6]: `overallMinimumScore = 5`. 2 is visited.
 *          - [4,5]: `overallMinimumScore = 5`. 4 is visited.
 *          `bfsTraversalQueue = [3]`, `encounteredNodes = {1,2,4,3}`
 *      - Dequeue `processingCity = 3`. Already visited. Continue.
 *      `bfsTraversalQueue` is empty.
 *   4. Return `overallMinimumScore = 5`.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var minScore = function (n, roads) {
  const cityAdjacencies = Array.from({ length: n + 1 }, () => []);
  for (const currentRoadEntry of roads) {
    const startCity = currentRoadEntry[0];
    const endCity = currentRoadEntry[1];
    const wayDistance = currentRoadEntry[2];
    cityAdjacencies[startCity].push([endCity, wayDistance]);
    cityAdjacencies[endCity].push([startCity, wayDistance]);
  }

  const encounteredNodes = new Set();
  const bfsTraversalQueue = [1];
  let overallMinimumScore = Infinity;

  while (bfsTraversalQueue.length > 0) {
    const processingCity = bfsTraversalQueue.shift();

    if (encounteredNodes.has(processingCity)) {
      continue;
    }
    encounteredNodes.add(processingCity);

    for (const neighborInfo of cityAdjacencies[processingCity]) {
      const neighborNode = neighborInfo[0];
      const edgeLength = neighborInfo[1];

      overallMinimumScore = Math.min(overallMinimumScore, edgeLength);

      if (!encounteredNodes.has(neighborNode)) {
        bfsTraversalQueue.push(neighborNode);
      }
    }
  }

  return overallMinimumScore;
};
