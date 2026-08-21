/**
 * Find Shortest Path With K Hops
 * Intuition: This problem extends the classic shortest path problem (Dijkstra's) by introducing an additional constraint: the ability to reduce the cost of at most `k` edges to zero. This can be modeled by expanding the state space of our search. Instead of just tracking the minimum distance to a `node`, we track the minimum distance to a `node` given `hops_remaining` (the number of edges whose weights we can still nullify).
 * Approach: 1. **Graph Representation**: Build an adjacency list `adjGraph` for the given `n` nodes and `edges`. Each entry will store `[neighbor, weight]`. Since the graph is undirected, add edges in both directions.
 * 2. **State Initialization**: Create a 2D array `minDistances[node][hops]` initialized to `Infinity` to store the minimum cost to reach `node` with `hops` remaining. Also, create a `visitedStates[node][hops]` 2D array, initialized to `false`, to keep track of states that have been processed to ensure each state is fully considered only once.
 * 3. **Priority Queue**: Use a min-priority queue `priorityQueueInstance` to manage states `[currentCost, remainingHops, currentNode]` based on `currentCost`.
 * 4. **Start Search**: Add the initial state `[0, k, s]` (0 cost, `k` hops remaining, at `s`) to the `priorityQueueInstance`.
 * 5. **Dijkstra's Adaptation**: While the `priorityQueueInstance` is not empty, extract the state `[currentCost, remainingHops, currentNode]` with the minimum `currentCost`.
 *    a. If this state has already been visited (`visitedStates[currentNode][remainingHops]` is `true`), continue to the next iteration.
 *    b. Mark the current state as visited: `visitedStates[currentNode][remainingHops] = true`.
 *    c. If `currentNode` is the `destinationNode` (`d`), then `currentCost` is the shortest path, so return it immediately.
 *    d. For each `neighborIdentifier` of `currentNode` with an edge weight `neighborEdgeWeight`:
 *       i. **Option 1: Travel without using a hop**: Calculate `pathCostWithoutHop = currentCost + neighborEdgeWeight`. If this cost is less than `minDistances[neighborIdentifier][remainingHops]`, update `minDistances` and add `[pathCostWithoutHop, remainingHops, neighborIdentifier]` to the `priorityQueueInstance`.
 *       ii. **Option 2: Travel by using a hop**: If `remainingHops > 0`, calculate `pathCostWithHop = currentCost` (since the edge weight is reduced to 0). If this cost is less than `minDistances[neighborIdentifier][remainingHops - 1]`, update `minDistances` and add `[pathCostWithHop, remainingHops - 1, neighborIdentifier]` to the `priorityQueueInstance`.
 * 6. **No Path Found**: If the loop completes without reaching the destination `d`, return -1.
 * Dry Run: n = 3, edges = [[0,1,10], [1,2,10], [0,2,100]], s = 0, d = 2, k = 1
 * 1. Initialize `adjGraph`, `minDistances` (3x2, Inf), `visitedStates` (3x2, false), `priorityQueueInstance`.
 * 2. `priorityQueueInstance.add([0, 1, 0])`. `minDistances[0][1] = 0`.
 * 3. **Dequeue `[0, 1, 0]`**: Mark `visitedStates[0][1] = true`. `currentNodeIdentifier = 0`. Not `d`.
 *    a. Neighbors of 0: `[1,10]`, `[2,100]`
 *       i. For `[1,10]`:
 *          - No hop: `pathCostWithoutHop = 0+10 = 10`. `10 < minDistances[1][1]` (Inf). `minDistances[1][1]=10`. `priorityQueueInstance.add([10, 1, 1])`.
 *          - With hop (k=1): `pathCostWithHop = 0`. `0 < minDistances[1][0]` (Inf). `minDistances[1][0]=0`. `priorityQueueInstance.add([0, 0, 1])`.
 *       ii. For `[2,100]`:
 *          - No hop: `pathCostWithoutHop = 0+100 = 100`. `100 < minDistances[2][1]` (Inf). `minDistances[2][1]=100`. `priorityQueueInstance.add([100, 1, 2])`.
 *          - With hop (k=1): `pathCostWithHop = 0`. `0 < minDistances[2][0]` (Inf). `minDistances[2][0]=0`. `priorityQueueInstance.add([0, 0, 2])`.
 * 4. **Dequeue `[0, 0, 1]`**: Mark `visitedStates[1][0] = true`. `currentNodeIdentifier = 1`. Not `d`.
 *    a. Neighbors of 1: `[0,10]`, `[2,10]`
 *       i. For `[0,10]`:
 *          - No hop: `pathCostWithoutHop = 0+10 = 10`. `10 < minDistances[0][0]` (Inf). `minDistances[0][0]=10`. `priorityQueueInstance.add([10, 0, 0])`.
 *          - With hop (k=0): Cannot hop.
 *       ii. For `[2,10]`:
 *          - No hop: `pathCostWithoutHop = 0+10 = 10`. `10 < minDistances[2][0]` (0) is false.
 *          - With hop (k=0): Cannot hop.
 * 5. **Dequeue `[0, 0, 2]`**: Mark `visitedStates[2][0] = true`. `currentNodeIdentifier = 2`. This IS `d`.
 *    a. Return `currentCost = 0`.
 * Time Complexity: O((N + E) * K * log(N * K))
 * Space Complexity: O(N * K + E)
 */

class PriorityQueue {
  constructor(
    comparisonFunction = (firstElement, secondElement) =>
      firstElement - secondElement
  ) {
    this.heapArray = [];
    this.comparisonFunction = comparisonFunction;
  }

  add(value) {
    this.heapArray.push(value);
    this.percolateUp();
  }

  extractMin() {
    if (this.isEmpty()) return undefined;
    if (this.heapArray.length === 1) return this.heapArray.pop();

    const minimumValue = this.heapArray[0];
    this.heapArray[0] = this.heapArray.pop();
    this.percolateDown();
    return minimumValue;
  }

  peekMin() {
    return this.heapArray[0];
  }

  isEmpty() {
    return this.heapArray.length === 0;
  }

  percolateUp() {
    let currentIndex = this.heapArray.length - 1;
    while (currentIndex > 0) {
      let parentIndex = Math.floor((currentIndex - 1) / 2);
      if (
        this.comparisonFunction(
          this.heapArray[currentIndex],
          this.heapArray[parentIndex]
        ) < 0
      ) {
        [this.heapArray[currentIndex], this.heapArray[parentIndex]] = [
          this.heapArray[parentIndex],
          this.heapArray[currentIndex],
        ];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  percolateDown() {
    let currentIndex = 0;
    const lastHeapIndex = this.heapArray.length - 1;
    while (true) {
      let leftChildIndex = 2 * currentIndex + 1;
      let rightChildIndex = 2 * currentIndex + 2;
      let smallestCandidateIndex = currentIndex;

      if (
        leftChildIndex <= lastHeapIndex &&
        this.comparisonFunction(
          this.heapArray[leftChildIndex],
          this.heapArray[smallestCandidateIndex]
        ) < 0
      ) {
        smallestCandidateIndex = leftChildIndex;
      }

      if (
        rightChildIndex <= lastHeapIndex &&
        this.comparisonFunction(
          this.heapArray[rightChildIndex],
          this.heapArray[smallestCandidateIndex]
        ) < 0
      ) {
        smallestCandidateIndex = rightChildIndex;
      }

      if (smallestCandidateIndex !== currentIndex) {
        [this.heapArray[currentIndex], this.heapArray[smallestCandidateIndex]] =
          [
            this.heapArray[smallestCandidateIndex],
            this.heapArray[currentIndex],
          ];
        currentIndex = smallestCandidateIndex;
      } else {
        break;
      }
    }
  }
}

var shortestPathWithHops = function (
  numNodes,
  graphEdges,
  startNode,
  destinationNode,
  maxHops
) {
  const adjGraph = new Array(numNodes).fill().map(() => []);

  for (const [sourceEdgeNode, targetEdgeNode, edgeWeightValue] of graphEdges) {
    adjGraph[sourceEdgeNode].push([targetEdgeNode, edgeWeightValue]);
    adjGraph[targetEdgeNode].push([sourceEdgeNode, edgeWeightValue]);
  }

  const minDistances = new Array(numNodes)
    .fill()
    .map(() => new Array(maxHops + 1).fill(Infinity));
  const visitedStates = new Array(numNodes)
    .fill()
    .map(() => new Array(maxHops + 1).fill(false));
  const priorityQueueInstance = new PriorityQueue(
    (elementA, elementB) => elementA[0] - elementB[0]
  );

  const initialDistance = 0;
  const initialHops = maxHops;
  const initialNode = startNode;

  priorityQueueInstance.add([initialDistance, initialHops, initialNode]);

  while (!priorityQueueInstance.isEmpty()) {
    const [currentPathCost, remainingAllowedHops, currentNodeIdentifier] =
      priorityQueueInstance.extractMin();

    if (visitedStates[currentNodeIdentifier][remainingAllowedHops]) {
      continue;
    }
    visitedStates[currentNodeIdentifier][remainingAllowedHops] = true;

    if (currentNodeIdentifier === destinationNode) {
      return currentPathCost;
    }

    for (const [neighborIdentifier, neighborEdgeWeight] of adjGraph[
      currentNodeIdentifier
    ]) {
      const pathCostWithoutHop = currentPathCost + neighborEdgeWeight;
      if (
        pathCostWithoutHop <
        minDistances[neighborIdentifier][remainingAllowedHops]
      ) {
        minDistances[neighborIdentifier][remainingAllowedHops] =
          pathCostWithoutHop;
        priorityQueueInstance.add([
          pathCostWithoutHop,
          remainingAllowedHops,
          neighborIdentifier,
        ]);
      }

      if (remainingAllowedHops > 0) {
        const pathCostWithHop = currentPathCost;
        if (
          pathCostWithHop <
          minDistances[neighborIdentifier][remainingAllowedHops - 1]
        ) {
          minDistances[neighborIdentifier][remainingAllowedHops - 1] =
            pathCostWithHop;
          priorityQueueInstance.add([
            pathCostWithHop,
            remainingAllowedHops - 1,
            neighborIdentifier,
          ]);
        }
      }
    }
  }

  return -1;
};
