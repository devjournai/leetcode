/**
 * Smallest Number In Infinite Set
 * Intuition: To efficiently manage an infinite set of positive integers where numbers can be popped and added back, we need to track the smallest number that has never been removed and separately handle numbers that were removed and subsequently re-added.
 * Approach: 1. Initialize `smallestSequentialNumber` to 1, representing the next number in natural sequence not yet encountered. 2. Use a `MinHeap` (`heapOfRecycledNumbers`) to store numbers that were popped but then added back. This allows O(log K) retrieval of the smallest re-added number. 3. Use a `Set` (`presenceTracker`) to keep track of numbers currently in the `MinHeap` for O(1) average time duplicate checks. 4. For `popSmallest()`, compare the `smallestSequentialNumber` with the `MinHeap`'s top element; the smaller of the two is the true smallest. If from heap, remove it. If `smallestSequentialNumber`, increment it. 5. For `addBack(num)`, if `num` is smaller than `smallestSequentialNumber` and not already in `presenceTracker`, add it to both the heap and the set.
 * Dry Run:
 * SmallestInfiniteSet():
 *   smallestSequentialNumber = 1
 *   heapOfRecycledNumbers = MinHeap{heapElements: []}
 *   presenceTracker = Set{}
 *
 * popSmallest():
 *   heapOfRecycledNumbers.getSize() is 0.
 *   Returns smallestSequentialNumber (1).
 *   smallestSequentialNumber becomes 2.
 *   Result: 1
 *
 * addBack(1):
 *   incomingNumber = 1. smallestSequentialNumber = 2.
 *   Condition `1 < 2` is true. `presenceTracker.has(1)` is false.
 *   heapOfRecycledNumbers.insertElement(1). heapOfRecycledNumbers.heapElements = [1]
 *   presenceTracker.add(1). presenceTracker = {1}
 *
 * popSmallest():
 *   heapOfRecycledNumbers.getSize() is 1. heapOfRecycledNumbers.peekMinimum() is 1.
 *   Condition `1 < smallestSequentialNumber (2)` is true.
 *   extractedNumber = heapOfRecycledNumbers.extractMinimum() (1). heapOfRecycledNumbers.heapElements = []
 *   presenceTracker.delete(1). presenceTracker = {}
 *   Returns extractedNumber (1).
 *   Result: 1
 *
 * popSmallest():
 *   heapOfRecycledNumbers.getSize() is 0.
 *   Returns smallestSequentialNumber (2).
 *   smallestSequentialNumber becomes 3.
 *   Result: 2
 * Time Complexity: O(log K)
 * Space Complexity: O(K)
 */
class MinHeap {
  constructor() {
    this.heapElements = [];
  }

  getParentIndex(childIdx) {
    return Math.floor((childIdx - 1) / 2);
  }
  getLeftChildIndex(parentIdx) {
    return 2 * parentIdx + 1;
  }
  getRightChildIndex(parentIdx) {
    return 2 * parentIdx + 2;
  }

  hasParentNode(idx) {
    return this.getParentIndex(idx) >= 0;
  }
  hasLeftChildNode(idx) {
    return this.getLeftChildIndex(idx) < this.heapElements.length;
  }
  hasRightChildNode(idx) {
    return this.getRightChildIndex(idx) < this.heapElements.length;
  }

  getParentNode(idx) {
    return this.heapElements[this.getParentIndex(idx)];
  }
  getLeftChildNode(idx) {
    return this.heapElements[this.getLeftChildIndex(idx)];
  }
  getRightChildNode(idx) {
    return this.heapElements[this.getRightChildIndex(idx)];
  }

  swapValues(idxOne, idxTwo) {
    [this.heapElements[idxOne], this.heapElements[idxTwo]] = [
      this.heapElements[idxTwo],
      this.heapElements[idxOne],
    ];
  }

  peekMinimum() {
    if (this.heapElements.length === 0) return null;
    return this.heapElements[0];
  }

  extractMinimum() {
    if (this.heapElements.length === 0) return null;
    if (this.heapElements.length === 1) return this.heapElements.pop();

    const retrievedValue = this.heapElements[0];
    this.heapElements[0] = this.heapElements.pop();
    this.heapifyDownFromTop();
    return retrievedValue;
  }

  insertElement(itemToAdd) {
    this.heapElements.push(itemToAdd);
    this.heapifyUpFromBottom();
  }

  heapifyUpFromBottom() {
    let currentIdx = this.heapElements.length - 1;
    while (
      this.hasParentNode(currentIdx) &&
      this.getParentNode(currentIdx) > this.heapElements[currentIdx]
    ) {
      this.swapValues(this.getParentIndex(currentIdx), currentIdx);
      currentIdx = this.getParentIndex(currentIdx);
    }
  }

  heapifyDownFromTop() {
    let currentIdx = 0;
    while (this.hasLeftChildNode(currentIdx)) {
      let smallerChildIdx = this.getLeftChildIndex(currentIdx);
      if (
        this.hasRightChildNode(currentIdx) &&
        this.getRightChildNode(currentIdx) < this.getLeftChildNode(currentIdx)
      ) {
        smallerChildIdx = this.getRightChildIndex(currentIdx);
      }

      if (this.heapElements[currentIdx] < this.heapElements[smallerChildIdx]) {
        break;
      } else {
        this.swapValues(currentIdx, smallerChildIdx);
      }
      currentIdx = smallerChildIdx;
    }
  }

  getSize() {
    return this.heapElements.length;
  }
}

var SmallestInfiniteSet = function () {
  this.smallestSequentialNumber = 1;
  this.heapOfRecycledNumbers = new MinHeap();
  this.presenceTracker = new Set();
};

SmallestInfiniteSet.prototype.popSmallest = function () {
  if (
    this.heapOfRecycledNumbers.getSize() > 0 &&
    this.heapOfRecycledNumbers.peekMinimum() < this.smallestSequentialNumber
  ) {
    const extractedNumber = this.heapOfRecycledNumbers.extractMinimum();
    this.presenceTracker.delete(extractedNumber);
    return extractedNumber;
  } else {
    const nextSequenceNumber = this.smallestSequentialNumber;
    this.smallestSequentialNumber++;
    return nextSequenceNumber;
  }
};

SmallestInfiniteSet.prototype.addBack = function (num) {
  if (num < this.smallestSequentialNumber && !this.presenceTracker.has(num)) {
    this.heapOfRecycledNumbers.insertElement(num);
    this.presenceTracker.add(num);
  }
};
