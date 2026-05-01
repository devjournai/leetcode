/**
 * Minimum Interval To Include Each Query
 * Time Complexity: O(N log N + M log M)
 * Space Complexity: O(N + M)
 */
var minInterval = function (intervals, queries) {
  class PriorityQueue {
    constructor(comparator = (a, b) => a - b) {
      this.heapElements = [];
      this.comparisonFunction = comparator;
    }

    getParentIndex(currentIdx) {
      return Math.floor((currentIdx - 1) / 2);
    }

    getLeftChildIndex(currentIdx) {
      return 2 * currentIdx + 1;
    }

    getRightChildIndex(currentIdx) {
      return 2 * currentIdx + 2;
    }

    hasParent(currentIdx) {
      return this.getParentIndex(currentIdx) >= 0;
    }

    hasLeftChild(currentIdx) {
      return this.getLeftChildIndex(currentIdx) < this.heapElements.length;
    }

    hasRightChild(currentIdx) {
      return this.getRightChildIndex(currentIdx) < this.heapElements.length;
    }

    swapHeapElements(idxA, idxB) {
      [this.heapElements[idxA], this.heapElements[idxB]] = [
        this.heapElements[idxB],
        this.heapElements[idxA],
      ];
    }

    enqueueValue(item) {
      this.heapElements.push(item);
      this.heapifyUp();
    }

    dequeueValue() {
      if (this.isEmpty()) {
        return undefined;
      }
      if (this.heapElements.length === 1) {
        return this.heapElements.pop();
      }
      const topMostElement = this.heapElements[0];
      this.heapElements[0] = this.heapElements.pop();
      this.heapifyDown();
      return topMostElement;
    }

    peekFront() {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.heapElements[0];
    }

    isEmpty() {
      return this.heapElements.length === 0;
    }

    heapifyUp() {
      let currentHeapIdx = this.heapElements.length - 1;
      while (
        this.hasParent(currentHeapIdx) &&
        this.comparisonFunction(
          this.heapElements[currentHeapIdx],
          this.heapElements[this.getParentIndex(currentHeapIdx)],
        ) < 0
      ) {
        this.swapHeapElements(
          currentHeapIdx,
          this.getParentIndex(currentHeapIdx),
        );
        currentHeapIdx = this.getParentIndex(currentHeapIdx);
      }
    }

    heapifyDown() {
      let currentHeapIdx = 0;
      while (this.hasLeftChild(currentHeapIdx)) {
        let smallerChildIdx = this.getLeftChildIndex(currentHeapIdx);
        if (
          this.hasRightChild(currentHeapIdx) &&
          this.comparisonFunction(
            this.heapElements[this.getRightChildIndex(currentHeapIdx)],
            this.heapElements[smallerChildIdx],
          ) < 0
        ) {
          smallerChildIdx = this.getRightChildIndex(currentHeapIdx);
        }

        if (
          this.comparisonFunction(
            this.heapElements[currentHeapIdx],
            this.heapElements[smallerChildIdx],
          ) < 0
        ) {
          break;
        } else {
          this.swapHeapElements(currentHeapIdx, smallerChildIdx);
        }
        currentHeapIdx = smallerChildIdx;
      }
    }
  }

  intervals.sort((itemA, itemB) => itemA[0] - itemB[0]);

  const indexedQueryData = queries.map(
    (singleQueryValue, originalPosition) => ({
      queryVal: singleQueryValue,
      initialIdx: originalPosition,
    }),
  );
  indexedQueryData.sort(
    (queryOne, queryTwo) => queryOne.queryVal - queryTwo.queryVal,
  );

  const activeIntervalMinHeap = new PriorityQueue(
    (tupleA, tupleB) => tupleA[0] - tupleB[0],
  );
  const outputAnswers = new Array(queries.length).fill(-1);

  let intervalTraversalPointer = 0;

  for (const currentQueryItem of indexedQueryData) {
    const currentQueryPoint = currentQueryItem.queryVal;
    const currentOriginalIndex = currentQueryItem.initialIdx;

    while (
      intervalTraversalPointer < intervals.length &&
      intervals[intervalTraversalPointer][0] <= currentQueryPoint
    ) {
      const currentIntervalStart = intervals[intervalTraversalPointer][0];
      const currentIntervalEnd = intervals[intervalTraversalPointer][1];
      const calculatedSize = currentIntervalEnd - currentIntervalStart + 1;
      activeIntervalMinHeap.enqueueValue([calculatedSize, currentIntervalEnd]);
      intervalTraversalPointer++;
    }

    while (
      !activeIntervalMinHeap.isEmpty() &&
      activeIntervalMinHeap.peekFront()[1] < currentQueryPoint
    ) {
      activeIntervalMinHeap.dequeueValue();
    }

    if (!activeIntervalMinHeap.isEmpty()) {
      outputAnswers[currentOriginalIndex] =
        activeIntervalMinHeap.peekFront()[0];
    }
  }

  return outputAnswers;
};
