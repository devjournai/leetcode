/**
 * Design A Number Container System
 * Intuition: To efficiently find the smallest index for a given number, we need a way to store indices associated with numbers in a sorted manner. When an index's number changes, the old association becomes stale. A min-priority queue per number, combined with lazy deletion, can handle this efficiently.
 * Approach: 1. Initialize two maps: `indexToNumberRecord` to store the current number at each index, and `numberToSmallestIndices` to store a MinPriorityQueue of indices for each number. 2. For `change(index, number)`, update `indexToNumberRecord` with the new mapping. Then, add the `index` to the MinPriorityQueue corresponding to `number` in `numberToSmallestIndices`. Any previous association of `index` with an `oldNumber` will be lazily handled during future `find` calls. 3. For `find(number)`, retrieve the MinPriorityQueue for `number`. Repeatedly peek at the smallest `potentialSmallestIndex` in the queue. If `indexToNumberRecord` confirms that this `potentialSmallestIndex` still holds `number`, return it. Otherwise, this index is stale; extract it from the queue and continue. If the queue becomes empty, no valid index is found.
 * Dry Run:
 * 1. `NumberContainers()`:
 *    `this.indexToNumberRecord = new Map()`
 *    `this.numberToSmallestIndices = new Map()`
 *
 * 2. `change(1, 10)`:
 *    `this.indexToNumberRecord.set(1, 10)` -> `{1: 10}`
 *    `this.numberToSmallestIndices.get(10)` -> null. Create new `MinPriorityQueue`.
 *    `this.numberToSmallestIndices.set(10, MinPQ_10)`
 *    `MinPQ_10.insertElement(1)` -> `MinPQ_10` content: `[1]`
 *
 * 3. `change(2, 20)`:
 *    `this.indexToNumberRecord.set(2, 20)` -> `{1: 10, 2: 20}`
 *    `this.numberToSmallestIndices.get(20)` -> null. Create new `MinPriorityQueue`.
 *    `this.numberToSmallestIndices.set(20, MinPQ_20)`
 *    `MinPQ_20.insertElement(2)` -> `MinPQ_20` content: `[2]`
 *
 * 4. `change(1, 20)`:
 *    `this.indexToNumberRecord.set(1, 20)` -> `{1: 20, 2: 20}`
 *    `this.numberToSmallestIndices.get(20)` -> `MinPQ_20`.
 *    `MinPQ_20.insertElement(1)` -> `MinPQ_20` content: `[1, 2]` (rebalanced)
 *
 * 5. `find(10)`:
 *    `relevantIndexHeap = this.numberToSmallestIndices.get(10)` -> `MinPQ_10` (content: `[1]`)
 *    `!relevantIndexHeap` is false.
 *    Loop 1:
 *      `relevantIndexHeap.isHeapEmpty()` is false.
 *      `potentialSmallestIndex = relevantIndexHeap.peekMinimum()` -> `1`
 *      `actualNumberAtIndex = this.indexToNumberRecord.get(1)` -> `20`
 *      `actualNumberAtIndex !== 10` is true.
 *      `relevantIndexHeap.extractMinimum()` -> `1`. `MinPQ_10` content: `[]`
 *    Loop condition: `relevantIndexHeap.isHeapEmpty()` is true. Loop terminates.
 *    `relevantIndexHeap.isHeapEmpty() ? -1 : relevantIndexHeap.peekMinimum()` -> `-1`. Returns -1.
 *
 * 6. `find(20)`:
 *    `relevantIndexHeap = this.numberToSmallestIndices.get(20)` -> `MinPQ_20` (content: `[1, 2]`)
 *    `!relevantIndexHeap` is false.
 *    Loop 1:
 *      `relevantIndexHeap.isHeapEmpty()` is false.
 *      `potentialSmallestIndex = relevantIndexHeap.peekMinimum()` -> `1`
 *      `actualNumberAtIndex = this.indexToNumberRecord.get(1)` -> `20`
 *      `actualNumberAtIndex !== 20` is false. Loop condition fails.
 *    Loop terminates.
 *    `relevantIndexHeap.isHeapEmpty() ? -1 : relevantIndexHeap.peekMinimum()` -> `relevantIndexHeap.peekMinimum()` -> `1`. Returns 1.
 * Time Complexity: O(logN)
 * Space Complexity: O(N)
 */
class MinPriorityQueue {
  constructor() {
    this.heapElements = [];
  }

  insertElement(valueToInsert) {
    this.heapElements.push(valueToInsert);
    this.bubbleUpElement();
  }

  extractMinimum() {
    if (this.isHeapEmpty()) return undefined;
    if (this.heapElements.length === 1) return this.heapElements.pop();
    const minimumValue = this.heapElements[0];
    this.heapElements[0] = this.heapElements.pop();
    this.sinkDownElement();
    return minimumValue;
  }

  peekMinimum() {
    return this.isHeapEmpty() ? undefined : this.heapElements[0];
  }

  isHeapEmpty() {
    return this.heapElements.length === 0;
  }

  getHeapSize() {
    return this.heapElements.length;
  }

  bubbleUpElement() {
    let currentElementIndex = this.heapElements.length - 1;
    const currentElementValue = this.heapElements[currentElementIndex];
    while (currentElementIndex > 0) {
      let parentElementIndex = Math.floor((currentElementIndex - 1) / 2);
      let parentElementValue = this.heapElements[parentElementIndex];
      if (currentElementValue >= parentElementValue) break;
      this.heapElements[parentElementIndex] = currentElementValue;
      this.heapElements[currentElementIndex] = parentElementValue;
      currentElementIndex = parentElementIndex;
    }
  }

  sinkDownElement() {
    let currentElementPosition = 0;
    const elementToPercolate = this.heapElements[0];
    const lastValidIndex = this.heapElements.length - 1;

    while (true) {
      let leftChildPosition = 2 * currentElementPosition + 1;
      let rightChildPosition = 2 * currentElementPosition + 2;
      let indexToSwap = null;

      if (leftChildPosition <= lastValidIndex) {
        if (this.heapElements[leftChildPosition] < elementToPercolate) {
          indexToSwap = leftChildPosition;
        }
      }

      if (rightChildPosition <= lastValidIndex) {
        if (
          (indexToSwap === null &&
            this.heapElements[rightChildPosition] < elementToPercolate) ||
          (indexToSwap !== null &&
            this.heapElements[rightChildPosition] <
              this.heapElements[leftChildPosition])
        ) {
          indexToSwap = rightChildPosition;
        }
      }

      if (indexToSwap === null) break;

      this.heapElements[currentElementPosition] =
        this.heapElements[indexToSwap];
      this.heapElements[indexToSwap] = elementToPercolate;
      currentElementPosition = indexToSwap;
    }
  }
}

var NumberContainers = function () {
  this.indexToNumberRecord = new Map();
  this.numberToSmallestIndices = new Map();
};

NumberContainers.prototype.change = function (index, number) {
  this.indexToNumberRecord.set(index, number);

  let currentNumberHeap;
  if (this.numberToSmallestIndices.has(number)) {
    currentNumberHeap = this.numberToSmallestIndices.get(number);
  } else {
    currentNumberHeap = new MinPriorityQueue();
    this.numberToSmallestIndices.set(number, currentNumberHeap);
  }
  currentNumberHeap.insertElement(index);
};

NumberContainers.prototype.find = function (number) {
  const relevantIndexHeap = this.numberToSmallestIndices.get(number);

  if (!relevantIndexHeap) {
    return -1;
  }

  while (
    !relevantIndexHeap.isHeapEmpty() &&
    this.indexToNumberRecord.get(relevantIndexHeap.peekMinimum()) !== number
  ) {
    relevantIndexHeap.extractMinimum();
  }

  return relevantIndexHeap.isHeapEmpty() ? -1 : relevantIndexHeap.peekMinimum();
};
