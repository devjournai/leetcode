/**
 * Network Delay Time
 * Intuition: Shortest paths from node `k` on a directed weighted graph. Dijkstra with an array-as-heap finds the time for the last node to receive the signal; unreachable nodes mean -1.
 * Approach: 1. `distanceToNode[k]=0`, others Infinity; build `graphAdjacency`. 2. While `minPriorityQueue` is nonempty, extract the min `[dist, node]` by a linear scan. 3. Skip stale distances; relax neighbors and push improvements. 4. Max finite distance among 1..n, or -1 if any Infinity.
 * Dry Run: n=4, k=2, edges 2→1 (1), 2→3 (1), 3→4 (1). Distances 1,0,1,2. Answer 2.
 * Time Complexity: O(V^2 + E)
 * Space Complexity: O(V + E)
 */
var networkDelayTime = function (times, n, k) {
  const distanceToNode = new Array(n + 1).fill(Infinity);
  distanceToNode[k] = 0;

  const graphAdjacency = new Map();
  for (const [sourceNodeValue, targetNodeValue, weightValue] of times) {
    if (!graphAdjacency.has(sourceNodeValue)) {
      graphAdjacency.set(sourceNodeValue, []);
    }
    graphAdjacency.get(sourceNodeValue).push([targetNodeValue, weightValue]);
  }

  const minPriorityQueue = [[0, k]];

  while (minPriorityQueue.length > 0) {
    let currentMinimumDistance = Infinity;
    let currentNodeId = -1;
    let minEntryIndex = -1;

    for (
      let loopIteratorOne = 0;
      loopIteratorOne < minPriorityQueue.length;
      loopIteratorOne++
    ) {
      const [distVal, nodeIdVal] = minPriorityQueue[loopIteratorOne];
      if (distVal < currentMinimumDistance) {
        currentMinimumDistance = distVal;
        currentNodeId = nodeIdVal;
        minEntryIndex = loopIteratorOne;
      }
    }

    minPriorityQueue.splice(minEntryIndex, 1);

    if (currentMinimumDistance > distanceToNode[currentNodeId]) {
      continue;
    }

    if (graphAdjacency.has(currentNodeId)) {
      for (const [neighborId, edgeWeightToNeighbor] of graphAdjacency.get(
        currentNodeId
      )) {
        const newCalculatedDistance =
          currentMinimumDistance + edgeWeightToNeighbor;
        if (newCalculatedDistance < distanceToNode[neighborId]) {
          distanceToNode[neighborId] = newCalculatedDistance;
          minPriorityQueue.push([newCalculatedDistance, neighborId]);
        }
      }
    }
  }

  let resultTime = 0;
  for (let nodeIterator = 1; nodeIterator <= n; nodeIterator++) {
    if (distanceToNode[nodeIterator] === Infinity) {
      return -1;
    }
    resultTime = Math.max(resultTime, distanceToNode[nodeIterator]);
  }

  return resultTime;
};
