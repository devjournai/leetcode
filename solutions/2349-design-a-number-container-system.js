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
 * Space Complexity: O(M)
 */
class CustomMinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  extractMin() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown();
    return min;
  }

  peek() {
    return this.heap.length === 0 ? undefined : this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    const val = this.heap[idx];

    while (idx > 0) {
      const pIdx = (idx - 1) >> 1;
      const pVal = this.heap[pIdx];

      if (val >= pVal) break;
      this.heap[idx] = pVal;
      idx = pIdx;
    }
    this.heap[idx] = val;
  }

  sinkDown() {
    let idx = 0;
    const len = this.heap.length;
    const val = this.heap[0];

    while (true) {
      let left = (idx << 1) + 1;
      let right = left + 1;
      let smallest = idx;

      if (left < len) {
        smallest = left;
        if (right < len && this.heap[right] < this.heap[left]) {
          smallest = right;
        }
        if (this.heap[smallest] < val) {
          this.heap[idx] = this.heap[smallest];
          idx = smallest;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    this.heap[idx] = val;
  }
}

class NumberContainers {
  constructor() {
    this.indexToNumber = new Map();
    this.numberToIndices = new Map();
  }

  change(index, number) {
    this.indexToNumber.set(index, number);

    if (!this.numberToIndices.has(number)) {
      this.numberToIndices.set(number, new CustomMinHeap());
    }
    this.numberToIndices.get(number).insert(index);
  }

  find(number) {
    const heap = this.numberToIndices.get(number);
    if (!heap) return -1;

    while (!heap.isEmpty()) {
      const minIndex = heap.peek();
      if (this.indexToNumber.get(minIndex) === number) {
        return minIndex;
      }
      heap.extractMin();
    }

    return -1;
  }
}
