/**
 * Number Of Restricted Paths From First To Last Node
 * Intuition: A restricted path always steps to a neighbor closer (by shortest distance) to node n. Dijkstra from n gives those distances; then DP from node 1 counts decreasing-distance walks modulo 1e9+7.
 * Approach: 1. Build undirected `adjacenciesMap`. 2. Dijkstra with `MinPriorityQueue` from n into `nodeDistances`. 3. `computeRestrictedPaths(u)` sums memoized paths over neighbors v with dist[u] > dist[v]. 4. Return paths from 1; base case node n is 1.
 * Dry Run: n=5, a short path 1-2-5 with dist 5>3>0.
 *   - Only decreasing hops are counted; isolated uphill edges add 0. Example answer 3 for the standard graph.
 * Time Complexity: O(E log V)
 * Space Complexity: O(V + E)
 */
var countRestrictedPaths = function (n, edges) {
  const resultModulo = 1e9 + 7;

  class MinPriorityQueue {
    constructor() {
      this.heapArray = [];
    }

    push(itemEntry) {
      this.heapArray.push(itemEntry);
      this.bubbleUpward();
    }

    pop() {
      if (this.isEmpty()) return null;
      if (this.heapArray.length === 1) return this.heapArray.pop();

      const rootItem = this.heapArray[0];
      this.heapArray[0] = this.heapArray.pop();
      this.bubbleDownward();
      return rootItem;
    }

    isEmpty() {
      return this.heapArray.length === 0;
    }

    bubbleUpward() {
      let currentIndex = this.heapArray.length - 1;
      while (currentIndex > 0) {
        let parentIndex = Math.floor((currentIndex - 1) / 2);
        if (this.heapArray[parentIndex][0] <= this.heapArray[currentIndex][0])
          break;
        [this.heapArray[parentIndex], this.heapArray[currentIndex]] = [
          this.heapArray[currentIndex],
          this.heapArray[parentIndex],
        ];
        currentIndex = parentIndex;
      }
    }

    bubbleDownward() {
      let currentIndex = 0;
      let lastHeapIndex = this.heapArray.length - 1;
      while (true) {
        let leftChildIndex = 2 * currentIndex + 1;
        let rightChildIndex = 2 * currentIndex + 2;
        let smallestChildIndex = currentIndex;

        if (
          leftChildIndex <= lastHeapIndex &&
          this.heapArray[leftChildIndex][0] <
            this.heapArray[smallestChildIndex][0]
        ) {
          smallestChildIndex = leftChildIndex;
        }

        if (
          rightChildIndex <= lastHeapIndex &&
          this.heapArray[rightChildIndex][0] <
            this.heapArray[smallestChildIndex][0]
        ) {
          smallestChildIndex = rightChildIndex;
        }

        if (smallestChildIndex === currentIndex) break;

        [this.heapArray[currentIndex], this.heapArray[smallestChildIndex]] = [
          this.heapArray[smallestChildIndex],
          this.heapArray[currentIndex],
        ];
        currentIndex = smallestChildIndex;
      }
    }
  }

  const adjacenciesMap = new Array(n + 1).fill(null).map(() => []);
  for (const [
    firstNodeIdentifier,
    secondNodeIdentifier,
    edgeWeightValue,
  ] of edges) {
    adjacenciesMap[firstNodeIdentifier].push({
      targetNode: secondNodeIdentifier,
      costValue: edgeWeightValue,
    });
    adjacenciesMap[secondNodeIdentifier].push({
      targetNode: firstNodeIdentifier,
      costValue: edgeWeightValue,
    });
  }

  const nodeDistances = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  const distanceMinHeap = new MinPriorityQueue();

  const startingNodeForDijkstra = n;
  nodeDistances[startingNodeForDijkstra] = 0;
  distanceMinHeap.push([0, startingNodeForDijkstra]);

  while (!distanceMinHeap.isEmpty()) {
    const [currentMinimumCost, currentGraphNode] = distanceMinHeap.pop();

    if (currentMinimumCost > nodeDistances[currentGraphNode]) {
      continue;
    }

    for (const {
      targetNode: adjacentNodeIdentifier,
      costValue: edgeConnectionWeight,
    } of adjacenciesMap[currentGraphNode]) {
      const potentialNewDistance = currentMinimumCost + edgeConnectionWeight;
      if (potentialNewDistance < nodeDistances[adjacentNodeIdentifier]) {
        nodeDistances[adjacentNodeIdentifier] = potentialNewDistance;
        distanceMinHeap.push([potentialNewDistance, adjacentNodeIdentifier]);
      }
    }
  }

  const pathResultsCache = new Map();
  pathResultsCache.set(n, 1);

  const computeRestrictedPaths = (currentCheckNode) => {
    if (pathResultsCache.has(currentCheckNode)) {
      return pathResultsCache.get(currentCheckNode);
    }

    let accumulatedPaths = 0;
    for (const { targetNode: nextStepNodeIdentifier } of adjacenciesMap[
      currentCheckNode
    ]) {
      if (
        nodeDistances[currentCheckNode] > nodeDistances[nextStepNodeIdentifier]
      ) {
        accumulatedPaths =
          (accumulatedPaths + computeRestrictedPaths(nextStepNodeIdentifier)) %
          resultModulo;
      }
    }

    pathResultsCache.set(currentCheckNode, accumulatedPaths);
    return accumulatedPaths;
  };

  return computeRestrictedPaths(1);
};
