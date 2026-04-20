/**
 * Last Stone Weight
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var lastStoneWeight = function (stonesInput) {
  class MaxPriorityQueue {
    constructor(initialElements) {
      this.internalStorage = [];
      for (let currentElement of initialElements) {
        this.addEntry(currentElement);
      }
    }

    _getParentIndex(childPosition) {
      return Math.floor((childPosition - 1) / 2);
    }

    _getLeftChildIndex(parentPosition) {
      return 2 * parentPosition + 1;
    }

    _getRightChildIndex(parentPosition) {
      return 2 * parentPosition + 2;
    }

    _swapPositions(indexAlpha, indexBeta) {
      [this.internalStorage[indexAlpha], this.internalStorage[indexBeta]] = [
        this.internalStorage[indexBeta],
        this.internalStorage[indexAlpha],
      ];
    }

    _siftValueUp() {
      let currentItemIndex = this.internalStorage.length - 1;
      let currentParentIndex = this._getParentIndex(currentItemIndex);

      while (
        currentParentIndex >= 0 &&
        this.internalStorage[currentParentIndex] <
          this.internalStorage[currentItemIndex]
      ) {
        this._swapPositions(currentParentIndex, currentItemIndex);
        currentItemIndex = currentParentIndex;
        currentParentIndex = this._getParentIndex(currentItemIndex);
      }
    }

    _siftValueDown(startLocation) {
      let rootNodeIndex = startLocation;
      let leftChildNodeIndex = this._getLeftChildIndex(rootNodeIndex);
      let rightChildNodeIndex = this._getRightChildIndex(rootNodeIndex);

      while (leftChildNodeIndex < this.internalStorage.length) {
        let largestElementIdentifier = rootNodeIndex;

        if (
          this.internalStorage[leftChildNodeIndex] >
          this.internalStorage[largestElementIdentifier]
        ) {
          largestElementIdentifier = leftChildNodeIndex;
        }

        if (
          rightChildNodeIndex < this.internalStorage.length &&
          this.internalStorage[rightChildNodeIndex] >
            this.internalStorage[largestElementIdentifier]
        ) {
          largestElementIdentifier = rightChildNodeIndex;
        }

        if (largestElementIdentifier === rootNodeIndex) {
          break;
        }

        this._swapPositions(rootNodeIndex, largestElementIdentifier);
        rootNodeIndex = largestElementIdentifier;
        leftChildNodeIndex = this._getLeftChildIndex(rootNodeIndex);
        rightChildNodeIndex = this._getRightChildIndex(rootNodeIndex);
      }
    }

    addEntry(itemValue) {
      this.internalStorage.push(itemValue);
      this._siftValueUp();
    }

    extractTopValue() {
      if (this.internalStorage.length === 0) {
        return undefined;
      }
      if (this.internalStorage.length === 1) {
        return this.internalStorage.pop();
      }

      const peakValue = this.internalStorage[0];
      this.internalStorage[0] = this.internalStorage.pop();
      this._siftValueDown(0);
      return peakValue;
    }

    peekTopValue() {
      return this.internalStorage.length > 0
        ? this.internalStorage[0]
        : undefined;
    }

    getCurrentSize() {
      return this.internalStorage.length;
    }
  }

  const stonePriorityQueue = new MaxPriorityQueue(stonesInput);

  while (stonePriorityQueue.getCurrentSize() > 1) {
    const firstHeaviestStone = stonePriorityQueue.extractTopValue();
    const secondHeaviestStone = stonePriorityQueue.extractTopValue();

    if (firstHeaviestStone !== secondHeaviestStone) {
      const differenceWeight = firstHeaviestStone - secondHeaviestStone;
      stonePriorityQueue.addEntry(differenceWeight);
    }
  }

  return stonePriorityQueue.getCurrentSize() === 1
    ? stonePriorityQueue.peekTopValue()
    : 0;
};
