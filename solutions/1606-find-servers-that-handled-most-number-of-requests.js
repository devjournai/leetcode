/**
 * Find Servers That Handled Most Number Of Requests
 * Intuition: Request i prefers server i % k, then the next free server wrapping around. Track free servers with a segment tree and busy ones with a min-heap of finish times.
 * Approach: 1. Segment tree stores 1 if a server is free. 2. Min-heap holds [finishTime, serverId]. 3. At each arrival, free every server whose finish time ≤ now. 4. Query the first free id in [i%k, k-1], else [0, i%k-1]. 5. Assign, mark busy, count hits. 6. Return all servers matching the max count.
 * Dry Run: k=3, arrival=[1,2,3,4], load=[1,2,1,2].
 *   - t=1 → server 0; t=2 → 1; t=3 → 2; t=4 → 0 free again. Counts [2,1,1] → [0].
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 */
class MinPriorityQueue {
  constructor(
    comparator = (firstElement, secondElement) =>
      firstElement[0] - secondElement[0]
  ) {
    this.heapInternalData = [];
    this.comparisonFunction = comparator;
  }

  get lengthCount() {
    return this.heapInternalData.length;
  }

  isQueueEmpty() {
    return this.heapInternalData.length === 0;
  }

  peekFront() {
    if (this.isQueueEmpty()) return undefined;
    return this.heapInternalData[0];
  }

  insertElement(newValue) {
    this.heapInternalData.push(newValue);
    this.heapifyUp(this.heapInternalData.length - 1);
  }

  extractMin() {
    if (this.isQueueEmpty()) return undefined;
    if (this.lengthCount === 1) return this.heapInternalData.pop();

    const minimumElement = this.heapInternalData[0];
    this.heapInternalData[0] = this.heapInternalData.pop();
    this.heapifyDown(0);
    return minimumElement;
  }

  heapifyUp(childIndex) {
    while (childIndex > 0) {
      let parentIndex = Math.floor((childIndex - 1) / 2);
      if (
        this.comparisonFunction(
          this.heapInternalData[childIndex],
          this.heapInternalData[parentIndex]
        ) < 0
      ) {
        [
          this.heapInternalData[childIndex],
          this.heapInternalData[parentIndex],
        ] = [
          this.heapInternalData[parentIndex],
          this.heapInternalData[childIndex],
        ];
        childIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(rootIndex) {
    const lastIndex = this.heapInternalData.length - 1;
    while (true) {
      let leftChildIndex = 2 * rootIndex + 1;
      let rightChildIndex = 2 * rootIndex + 2;
      let currentSmallestIndex = rootIndex;

      if (
        leftChildIndex <= lastIndex &&
        this.comparisonFunction(
          this.heapInternalData[leftChildIndex],
          this.heapInternalData[currentSmallestIndex]
        ) < 0
      ) {
        currentSmallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex <= lastIndex &&
        this.comparisonFunction(
          this.heapInternalData[rightChildIndex],
          this.heapInternalData[currentSmallestIndex]
        ) < 0
      ) {
        currentSmallestIndex = rightChildIndex;
      }

      if (currentSmallestIndex !== rootIndex) {
        [
          this.heapInternalData[rootIndex],
          this.heapInternalData[currentSmallestIndex],
        ] = [
          this.heapInternalData[currentSmallestIndex],
          this.heapInternalData[rootIndex],
        ];
        rootIndex = currentSmallestIndex;
      } else {
        break;
      }
    }
  }
}

class SegmentTree {
  constructor(segmentCapacity) {
    this.maxServers = segmentCapacity;
    this.treeStore = new Array(2 * segmentCapacity).fill(0);
    this.constructInitialTree();
  }

  constructInitialTree() {
    for (
      let serverUnitIndex = 0;
      serverUnitIndex < this.maxServers;
      serverUnitIndex++
    ) {
      this.treeStore[this.maxServers + serverUnitIndex] = 1;
    }
    for (
      let nodePosition = this.maxServers - 1;
      nodePosition > 0;
      nodePosition--
    ) {
      this.treeStore[nodePosition] =
        this.treeStore[2 * nodePosition] + this.treeStore[2 * nodePosition + 1];
    }
  }

  updateServerAvailability(targetServerId, newStatus) {
    let nodeLocation = targetServerId + this.maxServers;
    this.treeStore[nodeLocation] = newStatus;
    while (nodeLocation > 1) {
      nodeLocation = Math.floor(nodeLocation / 2);
      this.treeStore[nodeLocation] =
        this.treeStore[2 * nodeLocation] + this.treeStore[2 * nodeLocation + 1];
    }
  }

  retrieveFirstAvailable(searchMin, searchMax) {
    if (this.treeStore[1] === 0) return -1;

    return this._recursiveFindFirst(
      1,
      0,
      this.maxServers - 1,
      searchMin,
      searchMax
    );
  }

  _recursiveFindFirst(
    currentNodeIndex,
    nodeRangeBegin,
    nodeRangeEnd,
    queryRangeBegin,
    queryRangeEnd
  ) {
    if (
      nodeRangeBegin > queryRangeEnd ||
      nodeRangeEnd < queryRangeBegin ||
      this.treeStore[currentNodeIndex] === 0
    ) {
      return -1;
    }

    if (nodeRangeBegin === nodeRangeEnd) {
      return this.treeStore[currentNodeIndex] === 1 ? nodeRangeBegin : -1;
    }

    let midRangePoint = Math.floor((nodeRangeBegin + nodeRangeEnd) / 2);

    let leftSearchOutcome = this._recursiveFindFirst(
      2 * currentNodeIndex,
      nodeRangeBegin,
      midRangePoint,
      queryRangeBegin,
      queryRangeEnd
    );
    if (leftSearchOutcome !== -1) {
      return leftSearchOutcome;
    }

    let rightSearchOutcome = this._recursiveFindFirst(
      2 * currentNodeIndex + 1,
      midRangePoint + 1,
      nodeRangeEnd,
      queryRangeBegin,
      queryRangeEnd
    );
    return rightSearchOutcome;
  }
}

var busiestServers = function (serverCount, arrivalSchedule, loadDurations) {
  const serverRequestTallies = new Array(serverCount).fill(0);
  const serverCompletionTimes = new MinPriorityQueue(
    (tupleA, tupleB) => tupleA[0] - tupleB[0]
  );
  const activeServerTree = new SegmentTree(serverCount);

  for (
    let requestIndex = 0;
    requestIndex < arrivalSchedule.length;
    requestIndex++
  ) {
    const currentRequestTime = arrivalSchedule[requestIndex];
    const currentRequestDuration = loadDurations[requestIndex];
    const idealServerCandidate = requestIndex % serverCount;

    while (
      !serverCompletionTimes.isQueueEmpty() &&
      serverCompletionTimes.peekFront()[0] <= currentRequestTime
    ) {
      const finishedServerId = serverCompletionTimes.extractMin()[1];
      activeServerTree.updateServerAvailability(finishedServerId, 1);
    }

    let chosenServerId = -1;

    chosenServerId = activeServerTree.retrieveFirstAvailable(
      idealServerCandidate,
      serverCount - 1
    );

    if (chosenServerId === -1) {
      chosenServerId = activeServerTree.retrieveFirstAvailable(
        0,
        idealServerCandidate - 1
      );
    }

    if (chosenServerId !== -1) {
      serverRequestTallies[chosenServerId]++;
      serverCompletionTimes.insertElement([
        currentRequestTime + currentRequestDuration,
        chosenServerId,
      ]);
      activeServerTree.updateServerAvailability(chosenServerId, 0);
    }
  }

  let peakRequestCount = 0;
  for (let currentTally of serverRequestTallies) {
    if (currentTally > peakRequestCount) {
      peakRequestCount = currentTally;
    }
  }

  const busiestServerIdentifiers = [];
  for (
    let currentServerIdx = 0;
    currentServerIdx < serverCount;
    currentServerIdx++
  ) {
    if (serverRequestTallies[currentServerIdx] === peakRequestCount) {
      busiestServerIdentifiers.push(currentServerIdx);
    }
  }

  return busiestServerIdentifiers;
};
