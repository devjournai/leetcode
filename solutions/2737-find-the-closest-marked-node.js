/**
 * Find The Closest Marked Node
 * Intuition: This problem is a classic shortest path problem from a single source to any of a set of target nodes in a directed, weighted graph with non-negative edge weights. Dijkstra's algorithm is the most efficient choice for this scenario. We can optimize Dijkstra's to terminate early as soon as the first marked node is extracted from the priority queue.
 * Approach: 1. Construct an adjacency list `graphAdjList` to represent the given graph from the `edges`. 2. Create a `Set` named `markedNodesSet` from the `marked` array for O(1) average-case lookup of target nodes. 3. Initialize an array `nodeDistances` of size `n` with `Infinity` for all nodes, except `nodeDistances[s]` which is set to 0. This array will store the minimum distance found so far from `s` to each node. 4. Use a min-priority queue `minPQueue` (e.g., a binary heap) to store `[distance, nodeIndex]` pairs, ordered by `distance`. Enqueue `[0, s]` to start the search. 5. Enter a loop that continues as long as `minPQueue` is not empty: a. Dequeue the `[currentDistanceValue, currentNodeIndex]` pair with the smallest `currentDistanceValue`. b. If `currentDistanceValue` is greater than `nodeDistances[currentNodeIndex]`, it means a shorter path to `currentNodeIndex` has already been processed, so skip this entry and continue to the next iteration. c. Check if `currentNodeIndex` is present in `markedNodesSet`. If it is, this means we have found the shortest path to a marked node, and `currentDistanceValue` is the minimum distance required. Return `currentDistanceValue`. d. For each `[neighborIdentifier, edgeWeightValue]` in `graphAdjList[currentNodeIndex]`: i. Calculate a `prospectivePathDistance` by adding `currentDistanceValue` and `edgeWeightValue`. ii. If `prospectivePathDistance` is less than `nodeDistances[neighborIdentifier]`, update `nodeDistances[neighborIdentifier]` to `prospectivePathDistance` and enqueue `[prospectivePathDistance, neighborIdentifier]` into `minPQueue`. 6. If the loop finishes (meaning `minPQueue` became empty) and no marked node was reached, return -1, indicating no path exists from `s` to any marked node.
 * Dry Run: n = 3, edges = [[0, 1, 10], [1, 2, 5], [0, 2, 100]], s = 0, marked = [2]
 * 1. Initialization:
 *    `graphAdjList` = `[[[1, 10], [2, 100]], [[2, 5]], []]`
 *    `markedNodesSet` = `{2}`
 *    `nodeDistances` = `[0, Infinity, Infinity]`
 *    `minPQueue` = `[[0, 0]]`
 * 2. First Iteration (Dequeue `[0, 0]`):
 *    `currentDistanceValue` = 0, `currentNodeIndex` = 0.
 *    `currentDistanceValue` (0) is not `> nodeDistances[0]` (0).
 *    `currentNodeIndex` (0) is not in `markedNodesSet`.
 *    Neighbors of 0:
 *    - `[1, 10]`: `prospectivePathDistance` = 0 + 10 = 10. `10 < nodeDistances[1]` (Infinity). `nodeDistances[1]` becomes 10. Enqueue `[10, 1]`.
 *    - `[2, 100]`: `prospectivePathDistance` = 0 + 100 = 100. `100 < nodeDistances[2]` (Infinity). `nodeDistances[2]` becomes 100. Enqueue `[100, 2]`.
 *    `minPQueue` = `[[10, 1], [100, 2]]`
 * 3. Second Iteration (Dequeue `[10, 1]`):
 *    `currentDistanceValue` = 10, `currentNodeIndex` = 1.
 *    `currentDistanceValue` (10) is not `> nodeDistances[1]` (10).
 *    `currentNodeIndex` (1) is not in `markedNodesSet`.
 *    Neighbors of 1:
 *    - `[2, 5]`: `prospectivePathDistance` = 10 + 5 = 15. `15 < nodeDistances[2]` (100). `nodeDistances[2]` becomes 15. Enqueue `[15, 2]`.
 *    `minPQueue` = `[[15, 2], [100, 2]]`
 * 4. Third Iteration (Dequeue `[15, 2]`):
 *    `currentDistanceValue` = 15, `currentNodeIndex` = 2.
 *    `currentDistanceValue` (15) is not `> nodeDistances[2]` (15).
 *    `currentNodeIndex` (2) IS in `markedNodesSet`. Return `currentDistanceValue` which is 15.
 * Time Complexity: O((N + E) log N)
 * Space Complexity: O(N + E)
 */
var minimumDistance = function (n, edges, s, marked) {
  const graphAdjList = new Array(n).fill().map(() => []);
  const markedNodesSet = new Set(marked);

  for (const [uVertex, vVertex, weightValue] of edges) {
    graphAdjList[uVertex].push([vVertex, weightValue]);
  }

  const nodeDistances = new Array(n).fill(Infinity);
  const minPQueue = new PriorityQueue(
    (elementA, elementB) => elementA[0] - elementB[0]
  );

  nodeDistances[s] = 0;
  minPQueue.enqueue([0, s]);

  while (!minPQueue.isEmpty()) {
    const [currentDistanceValue, currentNodeIndex] = minPQueue.dequeue();

    if (currentDistanceValue > nodeDistances[currentNodeIndex]) {
      continue;
    }

    if (markedNodesSet.has(currentNodeIndex)) {
      return currentDistanceValue;
    }

    for (const [neighborIdentifier, edgeWeightValue] of graphAdjList[
      currentNodeIndex
    ]) {
      const prospectivePathDistance = currentDistanceValue + edgeWeightValue;
      if (prospectivePathDistance < nodeDistances[neighborIdentifier]) {
        nodeDistances[neighborIdentifier] = prospectivePathDistance;
        minPQueue.enqueue([prospectivePathDistance, neighborIdentifier]);
      }
    }
  }

  return -1;
};
