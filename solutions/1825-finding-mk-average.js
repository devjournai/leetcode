class MinPQ {
  constructor() {
    this.heapContent = [];
  }

  getParentIndexOfElement(childIndexEntry) {
    return Math.floor((childIndexEntry - 1) / 2);
  }

  getLeftChildIndexOfElement(parentIndexEntry) {
    return 2 * parentIndexEntry + 1;
  }

  getRightChildIndexOfElement(parentIndexEntry) {
    return 2 * parentIndexEntry + 2;
  }

  hasParentOfElement(indexCheck) {
    return this.getParentIndexOfElement(indexCheck) >= 0;
  }

  hasLeftChildOfElement(indexCheck) {
    return (
      this.getLeftChildIndexOfElement(indexCheck) < this.heapContent.length
    );
  }

  hasRightChildOfElement(indexCheck) {
    return (
      this.getRightChildIndexOfElement(indexCheck) < this.heapContent.length
    );
  }

  getParentElement(indexCheck) {
    return this.heapContent[this.getParentIndexOfElement(indexCheck)];
  }

  getLeftChildElement(indexCheck) {
    return this.heapContent[this.getLeftChildIndexOfElement(indexCheck)];
  }

  getRightChildElement(indexCheck) {
    return this.heapContent[this.getRightChildIndexOfElement(indexCheck)];
  }

  swapElements(indexOneParam, indexTwoParam) {
    [this.heapContent[indexOneParam], this.heapContent[indexTwoParam]] = [
      this.heapContent[indexTwoParam],
      this.heapContent[indexOneParam],
    ];
  }

  peekTop() {
    if (this.heapContent.length === 0) return null;
    return this.heapContent[0];
  }

  isEmptyHeap() {
    return this.heapContent.length === 0;
  }

  currentSize() {
    return this.heapContent.length;
  }

  extractTop() {
    if (this.heapContent.length === 0) return null;
    if (this.heapContent.length === 1) return this.heapContent.pop();

    const itemToReturn = this.heapContent[0];
    this.heapContent[0] = this.heapContent.pop();
    this.bubbleDownElement();
    return itemToReturn;
  }

  insertElement(itemToInsert) {
    this.heapContent.push(itemToInsert);
    this.bubbleUpElement();
  }

  bubbleUpElement() {
    let currentIndex = this.heapContent.length - 1;
    while (
      this.hasParentOfElement(currentIndex) &&
      this.getParentElement(currentIndex) > this.heapContent[currentIndex]
    ) {
      this.swapElements(
        this.getParentIndexOfElement(currentIndex),
        currentIndex
      );
      currentIndex = this.getParentIndexOfElement(currentIndex);
    }
  }

  bubbleDownElement() {
    let elementIndex = 0;
    while (this.hasLeftChildOfElement(elementIndex)) {
      let smallestChildLocation = this.getLeftChildIndexOfElement(elementIndex);
      if (
        this.hasRightChildOfElement(elementIndex) &&
        this.getRightChildElement(elementIndex) <
          this.getLeftChildElement(elementIndex)
      ) {
        smallestChildLocation = this.getRightChildIndexOfElement(elementIndex);
      }

      if (
        this.heapContent[elementIndex] < this.heapContent[smallestChildLocation]
      ) {
        break;
      } else {
        this.swapElements(elementIndex, smallestChildLocation);
      }
      elementIndex = smallestChildLocation;
    }
  }
}

class MaxPQ {
  constructor() {
    this.heapData = [];
  }

  getSuperIndex(childIndexVal) {
    return Math.floor((childIndexVal - 1) / 2);
  }

  getLowerLeftChildIndex(parentIndexVal) {
    return 2 * parentIndexVal + 1;
  }

  getLowerRightChildIndex(parentIndexVal) {
    return 2 * parentIndexVal + 2;
  }

  hasSuperNode(indexPos) {
    return this.getSuperIndex(indexPos) >= 0;
  }

  hasLowerLeftChild(indexPos) {
    return this.getLowerLeftChildIndex(indexPos) < this.heapData.length;
  }

  hasLowerRightChild(indexPos) {
    return this.getLowerRightChildIndex(indexPos) < this.heapData.length;
  }

  getSuperNode(indexPos) {
    return this.heapData[this.getSuperIndex(indexPos)];
  }

  getLowerLeftChild(indexPos) {
    return this.heapData[this.getLowerLeftChildIndex(indexPos)];
  }

  getLowerRightChild(indexPos) {
    return this.heapData[this.getLowerRightChildIndex(indexPos)];
  }

  exchangeElements(idxOne, idxTwo) {
    [this.heapData[idxOne], this.heapData[idxTwo]] = [
      this.heapData[idxTwo],
      this.heapData[idxOne],
    ];
  }

  peekTop() {
    if (this.heapData.length === 0) return null;
    return this.heapData[0];
  }

  isHeapEmpty() {
    return this.heapData.length === 0;
  }

  currentSize() {
    return this.heapData.length;
  }

  extractTop() {
    if (this.heapData.length === 0) return null;
    if (this.heapData.length === 1) return this.heapData.pop();

    const extractedItem = this.heapData[0];
    this.heapData[0] = this.heapData.pop();
    this.siftDown();
    return extractedItem;
  }

  insertElement(itemForInsertion) {
    this.heapData.push(itemForInsertion);
    this.siftUp();
  }

  siftUp() {
    let currentPos = this.heapData.length - 1;
    while (
      this.hasSuperNode(currentPos) &&
      this.getSuperNode(currentPos) < this.heapData[currentPos]
    ) {
      this.exchangeElements(this.getSuperIndex(currentPos), currentPos);
      currentPos = this.getSuperIndex(currentPos);
    }
  }

  siftDown() {
    let currentPos = 0;
    while (this.hasLowerLeftChild(currentPos)) {
      let largestChildLocation = this.getLowerLeftChildIndex(currentPos);
      if (
        this.hasLowerRightChild(currentPos) &&
        this.getLowerRightChild(currentPos) > this.getLowerLeftChild(currentPos)
      ) {
        largestChildLocation = this.getLowerRightChildIndex(currentPos);
      }

      if (this.heapData[currentPos] > this.heapData[largestChildLocation]) {
        break;
      } else {
        this.exchangeElements(currentPos, largestChildLocation);
      }
      currentPos = largestChildLocation;
    }
  }
}

/**
 * Finding Mk Average
 * Intuition: Maintain a sliding window of m numbers split into the smallest k, largest k, and the middle m-2k whose sum is `currentMiddleSumValue`. Four heaps plus lazy deletion keep those partitions; the MKAverage is floor(middleSum / (m-2k)).
 * Approach: 1. `addElement` pushes into a middle heap and, once the window exceeds m, marks the oldest value in `removedElementTracker`. 2. `balanceAllPartitions` purges stale heap tops and moves values so sizes and order constraints hold. 3. `calculateMKAverage` returns -1 until the window is full, else floor of the middle average.
 * Dry Run: m=3, k=1; add 3,1,10. Window [3,1,10] drops min 1 and max 10, middle 3 → 3. Add 5 → window [1,10,5], middle 5 → 5.
 * Time Complexity: O(N log M) where N is the total number of addElement and calculateMKAverage calls, and M is the window size.
 *   Each addElement involves a constant number of heap operations (insert/extract/peek) which take O(log M) time.
 *   calculateMKAverage takes O(1) time.
 * Space Complexity: O(M) for storing elements in the stream queue, heaps, and the map for removed elements.
 */
var MKAverage = function (m, k) {
  this.mWindowSize = m;
  this.kDiscardCount = k;
  this.elementsInStream = [];
  this.removedElementTracker = new Map();

  this.smallestKPartition = new MaxPQ();
  this.middleLowerPartition = new MaxPQ();
  this.middleUpperPartition = new MinPQ();
  this.largestKPartition = new MinPQ();

  this.currentMiddleSumValue = 0;
};

MKAverage.prototype.purgeElementsFromHeap = function (targetHeap) {
  while (
    !targetHeap.isHeapEmpty() &&
    this.removedElementTracker.has(targetHeap.peekTop())
  ) {
    const valueToPurge = targetHeap.peekTop();
    const existingCount = this.removedElementTracker.get(valueToPurge);

    if (existingCount === 1) {
      this.removedElementTracker.delete(valueToPurge);
    } else {
      this.removedElementTracker.set(valueToPurge, existingCount - 1);
    }

    targetHeap.extractTop();
  }
};

MKAverage.prototype.transferValue = function (
  sourceHeap,
  destinationHeap,
  isSourceMiddle,
  isDestinationMiddle
) {
  const valueTransfer = sourceHeap.extractTop();
  if (isSourceMiddle) {
    this.currentMiddleSumValue -= valueTransfer;
  }
  if (isDestinationMiddle) {
    this.currentMiddleSumValue += valueTransfer;
  }
  destinationHeap.insertElement(valueTransfer);
};

MKAverage.prototype.balanceAllPartitions = function () {
  let hasChanged = true;
  while (hasChanged) {
    hasChanged = false;

    this.purgeElementsFromHeap(this.smallestKPartition);
    this.purgeElementsFromHeap(this.middleLowerPartition);
    this.purgeElementsFromHeap(this.middleUpperPartition);
    this.purgeElementsFromHeap(this.largestKPartition);

    // Ensure relative order: smallestKPartition.peek() <= middleLowerPartition.peek()
    if (
      !this.smallestKPartition.isHeapEmpty() &&
      !this.middleLowerPartition.isHeapEmpty() &&
      this.smallestKPartition.peekTop() > this.middleLowerPartition.peekTop()
    ) {
      this.transferValue(
        this.smallestKPartition,
        this.middleLowerPartition,
        false,
        true
      );
      this.transferValue(
        this.middleLowerPartition,
        this.smallestKPartition,
        true,
        false
      );
      hasChanged = true;
    }

    // Ensure relative order: middleLowerPartition.peek() <= middleUpperPartition.peek()
    if (
      !this.middleLowerPartition.isHeapEmpty() &&
      !this.middleUpperPartition.isHeapEmpty() &&
      this.middleLowerPartition.peekTop() > this.middleUpperPartition.peekTop()
    ) {
      this.transferValue(
        this.middleLowerPartition,
        this.middleUpperPartition,
        true,
        true
      );
      this.transferValue(
        this.middleUpperPartition,
        this.middleLowerPartition,
        true,
        true
      );
      hasChanged = true;
    }

    // Ensure relative order: middleUpperPartition.peek() <= largestKPartition.peek()
    if (
      !this.middleUpperPartition.isHeapEmpty() &&
      !this.largestKPartition.isHeapEmpty() &&
      this.middleUpperPartition.peekTop() > this.largestKPartition.peekTop()
    ) {
      this.transferValue(
        this.middleUpperPartition,
        this.largestKPartition,
        true,
        false
      );
      this.transferValue(
        this.largestKPartition,
        this.middleUpperPartition,
        false,
        true
      );
      hasChanged = true;
    }

    // Maintain sizes for smallestKPartition
    while (this.smallestKPartition.currentSize() > this.kDiscardCount) {
      this.transferValue(
        this.smallestKPartition,
        this.middleLowerPartition,
        false,
        true
      );
      hasChanged = true;
    }
    while (
      this.smallestKPartition.currentSize() < this.kDiscardCount &&
      !this.middleLowerPartition.isHeapEmpty()
    ) {
      this.transferValue(
        this.middleLowerPartition,
        this.smallestKPartition,
        true,
        false
      );
      hasChanged = true;
    }

    // Maintain sizes for largestKPartition
    while (this.largestKPartition.currentSize() > this.kDiscardCount) {
      this.transferValue(
        this.largestKPartition,
        this.middleUpperPartition,
        false,
        true
      );
      hasChanged = true;
    }
    while (
      this.largestKPartition.currentSize() < this.kDiscardCount &&
      !this.middleUpperPartition.isHeapEmpty()
    ) {
      this.transferValue(
        this.middleUpperPartition,
        this.largestKPartition,
        true,
        false
      );
      hasChanged = true;
    }

    // Maintain middle partitions total size (m - 2k)
    const targetMiddleTotalSize = this.mWindowSize - 2 * this.kDiscardCount;
    const currentMiddleTotalSize =
      this.middleLowerPartition.currentSize() +
      this.middleUpperPartition.currentSize();

    while (
      currentMiddleTotalSize < targetMiddleTotalSize &&
      !this.smallestKPartition.isHeapEmpty()
    ) {
      this.transferValue(
        this.smallestKPartition,
        this.middleLowerPartition,
        false,
        true
      );
      hasChanged = true;
    }
    while (
      currentMiddleTotalSize < targetMiddleTotalSize &&
      !this.largestKPartition.isHeapEmpty()
    ) {
      this.transferValue(
        this.largestKPartition,
        this.middleUpperPartition,
        false,
        true
      );
      hasChanged = true;
    }
    while (
      currentMiddleTotalSize > targetMiddleTotalSize &&
      !this.middleUpperPartition.isHeapEmpty()
    ) {
      // If middle is too large, move the largest from middle to largeKPartition
      this.transferValue(
        this.middleUpperPartition,
        this.largestKPartition,
        true,
        false
      );
      hasChanged = true;
    }
    while (
      currentMiddleTotalSize > targetMiddleTotalSize &&
      !this.middleLowerPartition.isHeapEmpty()
    ) {
      // If middle is too large, move the smallest from middle to smallKPartition
      this.transferValue(
        this.middleLowerPartition,
        this.smallestKPartition,
        true,
        false
      );
      hasChanged = true;
    }

    // Maintain balance within middle partitions: middleLower and middleUpper
    while (
      this.middleLowerPartition.currentSize() >
        this.middleUpperPartition.currentSize() + 1 &&
      !this.middleLowerPartition.isHeapEmpty()
    ) {
      this.transferValue(
        this.middleLowerPartition,
        this.middleUpperPartition,
        true,
        true
      );
      hasChanged = true;
    }
    while (
      this.middleUpperPartition.currentSize() >
        this.middleLowerPartition.currentSize() + 1 &&
      !this.middleUpperPartition.isHeapEmpty()
    ) {
      this.transferValue(
        this.middleUpperPartition,
        this.middleLowerPartition,
        true,
        true
      );
      hasChanged = true;
    }
  }
};

/**
 * @param {number} num
 * @return {void}
 */
MKAverage.prototype.addElement = function (num) {
  this.elementsInStream.push(num);

  // Add new element to a middle partition first for rebalancing
  this.middleUpperPartition.insertElement(num);
  this.currentMiddleSumValue += num;

  if (this.elementsInStream.length > this.mWindowSize) {
    const oldestElementValue = this.elementsInStream.shift();
    this.removedElementTracker.set(
      oldestElementValue,
      (this.removedElementTracker.get(oldestElementValue) || 0) + 1
    );
  }

  this.balanceAllPartitions();
};

/**
 * @return {number}
 */
MKAverage.prototype.calculateMKAverage = function () {
  if (this.elementsInStream.length < this.mWindowSize) {
    return -1;
  }

  const targetMiddleTotalSizeForCalculation =
    this.mWindowSize - 2 * this.kDiscardCount;

  // Rebalance one last time to ensure accurate state before calculation
  this.balanceAllPartitions();

  if (
    this.middleLowerPartition.currentSize() +
      this.middleUpperPartition.currentSize() !==
    targetMiddleTotalSizeForCalculation
  ) {
    // This indicates an error in balancing or not enough elements to fill middle partition.
    // Given problem constraints, this branch should ideally not be reached if mWindowSize >= 2 * kDiscardCount + 1
    // and elementsInStream.length >= mWindowSize.
    return Math.floor(
      this.currentMiddleSumValue / targetMiddleTotalSizeForCalculation
    );
  }

  return Math.floor(
    this.currentMiddleSumValue / targetMiddleTotalSizeForCalculation
  );
};
