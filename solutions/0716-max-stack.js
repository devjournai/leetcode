/**
 * Max Stack
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var MaxStack = function () {
  this.mainStack = [];
  this.maximumHeap = new PriorityQueue((elementA, elementB) => {
    if (elementA.value === elementB.value) {
      return elementB.identifier - elementA.identifier;
    }
    return elementB.value - elementA.value;
  });
  this.currentIdentifier = 0;
  this.removedElements = new Set();
};

MaxStack.prototype.push = function (x) {
  const uniqueId = this.currentIdentifier++;
  const dataNode = { value: x, identifier: uniqueId };
  this.mainStack.push(dataNode);
  this.maximumHeap.enqueue(dataNode);
};

MaxStack.prototype.pop = function () {
  this.pruneStack();
  const poppedElement = this.mainStack.pop();
  this.removedElements.add(poppedElement.identifier);
  return poppedElement.value;
};

MaxStack.prototype.top = function () {
  this.pruneStack();
  const topStackNode = this.mainStack[this.mainStack.length - 1];
  return topStackNode.value;
};

MaxStack.prototype.peekMax = function () {
  this.pruneMaxHeap();
  const topHeapElement = this.maximumHeap.front();
  return topHeapElement.value;
};

MaxStack.prototype.popMax = function () {
  this.pruneMaxHeap();
  const maxExtractedNode = this.maximumHeap.dequeue();
  this.removedElements.add(maxExtractedNode.identifier);
  return maxExtractedNode.value;
};

MaxStack.prototype.pruneStack = function () {
  while (
    this.mainStack.length > 0 &&
    this.removedElements.has(
      this.mainStack[this.mainStack.length - 1].identifier,
    )
  ) {
    this.mainStack.pop();
  }
};

MaxStack.prototype.pruneMaxHeap = function () {
  while (
    this.maximumHeap.size() > 0 &&
    this.removedElements.has(this.maximumHeap.front().identifier)
  ) {
    this.maximumHeap.dequeue();
  }
};
