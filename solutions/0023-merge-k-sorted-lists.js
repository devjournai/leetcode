/**
 * Merge K Sorted Lists
 * Time Complexity: O(N log k)
 * Space Complexity: O(k)
 */

function MinHeapClass(comparisonFunction) {
  this.heapElements = [];
  this.compareItems = comparisonFunction;
}

MinHeapClass.prototype.addNode = function (nodeToAdd) {
  this.heapElements.push(nodeToAdd);
  this.bubbleUpNode(this.heapElements.length - 1);
};

MinHeapClass.prototype.extractMin = function () {
  if (this.heapElements.length === 0) {
    return undefined;
  }
  if (this.heapElements.length === 1) {
    return this.heapElements.pop();
  }
  const smallestNode = this.heapElements[0];
  this.heapElements[0] = this.heapElements.pop();
  this.bubbleDownNode(0);
  return smallestNode;
};

MinHeapClass.prototype.peekMin = function () {
  return this.heapElements.length > 0 ? this.heapElements[0] : undefined;
};

MinHeapClass.prototype.getCurrentSize = function () {
  return this.heapElements.length;
};

MinHeapClass.prototype.bubbleUpNode = function (indexVal) {
  let parentVal = Math.floor((indexVal - 1) / 2);
  while (
    indexVal > 0 &&
    this.compareItems(
      this.heapElements[indexVal],
      this.heapElements[parentVal],
    ) < 0
  ) {
    this.swapNodes(indexVal, parentVal);
    indexVal = parentVal;
    parentVal = Math.floor((indexVal - 1) / 2);
  }
};

MinHeapClass.prototype.bubbleDownNode = function (currentIdx) {
  const totalLength = this.heapElements.length;
  while (true) {
    let leftChildIdx = 2 * currentIdx + 1;
    let rightChildIdx = 2 * currentIdx + 2;
    let smallestCurrent = currentIdx;

    if (
      leftChildIdx < totalLength &&
      this.compareItems(
        this.heapElements[leftChildIdx],
        this.heapElements[smallestCurrent],
      ) < 0
    ) {
      smallestCurrent = leftChildIdx;
    }

    if (
      rightChildIdx < totalLength &&
      this.compareItems(
        this.heapElements[rightChildIdx],
        this.heapElements[smallestCurrent],
      ) < 0
    ) {
      smallestCurrent = rightChildIdx;
    }

    if (smallestCurrent !== currentIdx) {
      this.swapNodes(currentIdx, smallestCurrent);
      currentIdx = smallestCurrent;
    } else {
      break;
    }
  }
};

MinHeapClass.prototype.swapNodes = function (pos1, pos2) {
  [this.heapElements[pos1], this.heapElements[pos2]] = [
    this.heapElements[pos2],
    this.heapElements[pos1],
  ];
};

var mergeKLists = function (lists) {
  const nodeValueComparator = (nodeA, nodeB) => nodeA.val - nodeB.val;
  const minHeapInstance = new MinHeapClass(nodeValueComparator);

  for (let currentListHead of lists) {
    if (currentListHead !== null) {
      minHeapInstance.addNode(currentListHead);
    }
  }

  const dummyHeadNode = new ListNode();
  let pointerToCurrent = dummyHeadNode;

  while (minHeapInstance.getCurrentSize() > 0) {
    const smallestExtractedNode = minHeapInstance.extractMin();
    pointerToCurrent.next = smallestExtractedNode;
    pointerToCurrent = pointerToCurrent.next;

    if (smallestExtractedNode.next !== null) {
      minHeapInstance.addNode(smallestExtractedNode.next);
    }
  }

  return dummyHeadNode.next;
};
