/**
 * Minimum Weighted Subgraph With The Required Paths
 * Intuition: The problem asks for the minimum sum of edge weights to form a subgraph where two source nodes, src1 and src2, can both reach a destination node, dest. This implies there must be an intermediate node 'm' such that src1 can reach 'm', src2 can reach 'm', and 'm' can reach dest. The total weight would be dist(src1, m) + dist(src2, m) + dist(m, dest). We can find dist(src1, m) and dist(src2, m) by running Dijkstra from src1 and src2 on the forward graph. To find dist(m, dest), we can run Dijkstra from dest on a reversed graph, which effectively calculates shortest paths from all nodes 'm' to 'dest'. The final answer is the minimum of these sums over all possible intermediate nodes 'm'.
 * Approach:
 * 1. Initialize two adjacency lists: `adjacencyForward` for the given directed graph and `adjacencyBackward` for the graph with all edges reversed.
 * 2. Populate `adjacencyForward` and `adjacencyBackward` by iterating through the `graphEdges`, adding each edge to `adjacencyForward` and its reverse to `adjacencyBackward`.
 * 3. Execute Dijkstra's algorithm from `sourceNodeOne` on `adjacencyForward` to compute `distancesFromSourceOne`, which stores the shortest path from `sourceNodeOne` to every other node in the graph.
 * 4. Execute a second, distinct instance of Dijkstra's algorithm from `sourceNodeTwo` on `adjacencyForward` to compute `distancesFromSourceTwo`, storing the shortest path from `sourceNodeTwo` to every other node.
 * 5. Execute a third distinct instance of Dijkstra's algorithm from `destinationNode` on `adjacencyBackward` to compute `distancesToDestination`, which effectively stores the shortest path from any node to `destinationNode`.
 * 6. Initialize `finalMinimumWeight` to `Infinity`.
 * 7. Iterate through all possible intermediate nodes `m` (from `0` to `nodeCount - 1`). For each node `m`:
 *    a. Check if `distancesFromSourceOne[m]`, `distancesFromSourceTwo[m]`, and `distancesToDestination[m]` are all finite (i.e., not `Infinity`), meaning paths exist.
 *    b. If valid paths exist, calculate the sum of these three distances: `distancesFromSourceOne[m] + distancesFromSourceTwo[m] + distancesToDestination[m]`.
 *    c. Update `finalMinimumWeight` with the minimum of its current value and this calculated sum.
 * 8. Return `finalMinimumWeight` if it is less than `Infinity`, otherwise return `-1` (indicating no such subgraph exists).
 * Dry Run:
 * Let n = 6, edges = [[0,2,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1]], src1 = 0, src2 = 1, dest = 5.
 *
 * 1. Graph Construction:
 *    - adjacencyForward:
 *      0: [[2,1]]
 *      1: [[2,1]]
 *      2: [[3,1]]
 *      3: [[4,1]]
 *      4: [[5,1]]
 *      5: []
 *    - adjacencyBackward:
 *      0: []
 *      1: []
 *      2: [[0,1], [1,1]]
 *      3: [[2,1]]
 *      4: [[3,1]]
 *      5: [[4,1]]
 *
 * 2. Dijkstra from src1 = 0 (on adjacencyForward):
 *    - distancesFromSourceOne: [0, Infinity, 1, 2, 3, 4]
 *      (0->0=0, 0->2=1, 0->3=2, 0->4=3, 0->5=4)
 *
 * 3. Dijkstra from src2 = 1 (on adjacencyForward):
 *    - distancesFromSourceTwo: [Infinity, 0, 1, 2, 3, 4]
 *      (1->1=0, 1->2=1, 1->3=2, 1->4=3, 1->5=4)
 *
 * 4. Dijkstra from dest = 5 (on adjacencyBackward):
 *    - This calculates shortest paths *to* node 5.
 *    - distancesToDestination: [5, 5, 4, 3, 2, 0]
 *      (0->5=5, 1->5=5, 2->5=4, 3->5=3, 4->5=2, 5->5=0)
 *
 * 5. Calculate Minimum Weight: Iterate nodeIndex from 0 to 5.
 *    - nodeIndex = 0: dist(0,0)=0, dist(1,0)=inf. Skip.
 *    - nodeIndex = 1: dist(0,1)=inf, dist(1,1)=0. Skip.
 *    - nodeIndex = 2: (m=2)
 *      - dist(0,2) = 1 (from distancesFromSourceOne[2])
 *      - dist(1,2) = 1 (from distancesFromSourceTwo[2])
 *      - dist(2,5) = 4 (from distancesToDestination[2])
 *      - currentPathTotal = 1 + 1 + 4 = 6. finalMinimumWeight = 6.
 *    - nodeIndex = 3: (m=3)
 *      - dist(0,3) = 2, dist(1,3) = 2, dist(3,5) = 3
 *      - currentPathTotal = 2 + 2 + 3 = 7. finalMinimumWeight = min(6, 7) = 6.
 *    - nodeIndex = 4: (m=4)
 *      - dist(0,4) = 3, dist(1,4) = 3, dist(4,5) = 2
 *      - currentPathTotal = 3 + 3 + 2 = 8. finalMinimumWeight = min(6, 8) = 6.
 *    - nodeIndex = 5: (m=5)
 *      - dist(0,5) = 4, dist(1,5) = 4, dist(5,5) = 0
 *      - currentPathTotal = 4 + 4 + 0 = 8. finalMinimumWeight = min(6, 8) = 6.
 *
 * 6. Return 6.
 * Time Complexity: O(E log V)
 * Space Complexity: O(V + E)
 */
class CustomPriorityQueue {
  constructor(
    comparatorFunction = (firstElement, secondElement) =>
      firstElement - secondElement,
  ) {
    this._heapElements = [];
    this._comparisonFunction = comparatorFunction;
  }

  enqueueItem(elementEntry) {
    this._heapElements.push(elementEntry);
    this._bubbleUp();
  }

  dequeueItem() {
    if (this.isQueueEmpty()) return undefined;
    const topElement = this._heapElements[0];
    const lastHeapElement = this._heapElements.pop();
    if (!this.isQueueEmpty()) {
      this._heapElements[0] = lastHeapElement;
      this._bubbleDown();
    }
    return topElement;
  }

  peekTop() {
    if (this.isQueueEmpty()) return undefined;
    return this._heapElements[0];
  }

  isQueueEmpty() {
    return this._heapElements.length === 0;
  }

  queueSize() {
    return this._heapElements.length;
  }

  _getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  _getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  _getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  _exchangeElements(indexA, indexB) {
    [this._heapElements[indexA], this._heapElements[indexB]] = [
      this._heapElements[indexB],
      this._heapElements[indexA],
    ];
  }

  _bubbleUp() {
    let currentElementIndex = this._heapElements.length - 1;
    while (
      currentElementIndex > 0 &&
      this._comparisonFunction(
        this._heapElements[currentElementIndex],
        this._heapElements[this._getParentIndex(currentElementIndex)],
      ) < 0
    ) {
      this._exchangeElements(
        currentElementIndex,
        this._getParentIndex(currentElementIndex),
      );
      currentElementIndex = this._getParentIndex(currentElementIndex);
    }
  }

  _bubbleDown() {
    let elementPosition = 0;
    const lastPosition = this._heapElements.length - 1;
    while (true) {
      let leftPosition = this._getLeftChildIndex(elementPosition);
      let rightPosition = this._getRightChildIndex(elementPosition);
      let smallestPosition = elementPosition;

      if (
        leftPosition <= lastPosition &&
        this._comparisonFunction(
          this._heapElements[leftPosition],
          this._heapElements[smallestPosition],
        ) < 0
      ) {
        smallestPosition = leftPosition;
      }
      if (
        rightPosition <= lastPosition &&
        this._comparisonFunction(
          this._heapElements[rightPosition],
          this._heapElements[smallestPosition],
        ) < 0
      ) {
        smallestPosition = rightPosition;
      }

      if (smallestPosition !== elementPosition) {
        this._exchangeElements(elementPosition, smallestPosition);
        elementPosition = smallestPosition;
      } else {
        break;
      }
    }
  }
}

var minimumWeight = function (
  nodeCount,
  graphEdges,
  sourceNodeOne,
  sourceNodeTwo,
  destinationNode,
) {
  const adjacencyForward = Array.from({ length: nodeCount }, () => []);
  const adjacencyBackward = Array.from({ length: nodeCount }, () => []);

  for (const edgeEntry of graphEdges) {
    const [originVertex, terminalVertex, weightValue] = edgeEntry;
    adjacencyForward[originVertex].push([terminalVertex, weightValue]);
    adjacencyBackward[terminalVertex].push([originVertex, weightValue]);
  }

  const distancesFromSourceOne = new Array(nodeCount).fill(Infinity);
  distancesFromSourceOne[sourceNodeOne] = 0;
  const pqFromSourceOne = new CustomPriorityQueue((a, b) => a[0] - b[0]);
  pqFromSourceOne.enqueueItem([0, sourceNodeOne]);

  while (!pqFromSourceOne.isQueueEmpty()) {
    const [currentDistOne, currentNodeIdOne] = pqFromSourceOne.dequeueItem();
    if (currentDistOne > distancesFromSourceOne[currentNodeIdOne]) continue;

    for (const [neighborIdOne, edgeCostOne] of adjacencyForward[
      currentNodeIdOne
    ]) {
      if (
        distancesFromSourceOne[neighborIdOne] >
        currentDistOne + edgeCostOne
      ) {
        distancesFromSourceOne[neighborIdOne] = currentDistOne + edgeCostOne;
        pqFromSourceOne.enqueueItem([
          distancesFromSourceOne[neighborIdOne],
          neighborIdOne,
        ]);
      }
    }
  }

  const distancesFromSourceTwo = new Array(nodeCount).fill(Infinity);
  distancesFromSourceTwo[sourceNodeTwo] = 0;
  const pqFromSourceTwo = new CustomPriorityQueue((a, b) => a[0] - b[0]);
  pqFromSourceTwo.enqueueItem([0, sourceNodeTwo]);

  let processLoopTwo = true;
  while (processLoopTwo) {
    if (pqFromSourceTwo.queueSize() === 0) {
      processLoopTwo = false;
      continue;
    }

    const [currentDistTwo, currentNodeIdTwo] = pqFromSourceTwo.dequeueItem();
    if (currentDistTwo > distancesFromSourceTwo[currentNodeIdTwo]) continue;

    for (let j = 0; j < adjacencyForward[currentNodeIdTwo].length; j++) {
      const nextNodeInfoTwo = adjacencyForward[currentNodeIdTwo][j];
      const nextNodeIdTwo = nextNodeInfoTwo[0];
      const edgeWeightTwo = nextNodeInfoTwo[1];

      if (
        distancesFromSourceTwo[nextNodeIdTwo] >
        currentDistTwo + edgeWeightTwo
      ) {
        distancesFromSourceTwo[nextNodeIdTwo] = currentDistTwo + edgeWeightTwo;
        pqFromSourceTwo.enqueueItem([
          distancesFromSourceTwo[nextNodeIdTwo],
          nextNodeIdTwo,
        ]);
      }
    }
  }

  const distancesToDestination = new Array(nodeCount).fill(Infinity);
  distancesToDestination[destinationNode] = 0;
  // Renamed to CustomPriorityQueue
  const pqToDestination = new CustomPriorityQueue((a, b) => a[0] - b[0]);
  pqToDestination.enqueueItem([0, destinationNode]);

  let iterationFlag = true;
  while (iterationFlag) {
    if (pqToDestination.isQueueEmpty()) {
      iterationFlag = false;
      continue;
    }

    const [currentDistThree, currentNodeIdThree] =
      pqToDestination.dequeueItem();
    if (currentDistThree > distancesToDestination[currentNodeIdThree]) {
      continue;
    }

    for (let k = 0; k < adjacencyBackward[currentNodeIdThree].length; k++) {
      const neighborEdgeThree = adjacencyBackward[currentNodeIdThree][k];
      const adjacentNodeIdThree = neighborEdgeThree[0];
      const connectionWeightThree = neighborEdgeThree[1];

      if (
        distancesToDestination[adjacentNodeIdThree] >
        currentDistThree + connectionWeightThree
      ) {
        distancesToDestination[adjacentNodeIdThree] =
          currentDistThree + connectionWeightThree;
        pqToDestination.enqueueItem([
          distancesToDestination[adjacentNodeIdThree],
          adjacentNodeIdThree,
        ]);
      }
    }
  }

  let finalMinimumWeight = Infinity;
  let nodeIndex = 0;
  do {
    if (
      distancesFromSourceOne[nodeIndex] !== Infinity &&
      distancesFromSourceTwo[nodeIndex] !== Infinity &&
      distancesToDestination[nodeIndex] !== Infinity
    ) {
      const pathSumComponentOne = distancesFromSourceOne[nodeIndex];
      const pathSumComponentTwo = distancesFromSourceTwo[nodeIndex];
      const pathSumComponentThree = distancesToDestination[nodeIndex];
      const currentPathTotal =
        pathSumComponentOne + pathSumComponentTwo + pathSumComponentThree;
      finalMinimumWeight = Math.min(finalMinimumWeight, currentPathTotal);
    }
    nodeIndex++;
  } while (nodeIndex < nodeCount);

  return finalMinimumWeight === Infinity ? -1 : finalMinimumWeight;
};
