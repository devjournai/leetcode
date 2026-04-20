/**
 * All Oone Data Structure
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var AllOne = function () {
  this.mappingKeyToNode = new Map();

  this.startBoundary = {
    valueCount: 0,
    associatedKeys: new Set(),
    previousEntry: null,
    nextElement: null,
  };
  this.endBoundary = {
    valueCount: Infinity,
    associatedKeys: new Set(),
    previousEntry: null,
    nextElement: null,
  };

  this.startBoundary.nextElement = this.endBoundary;
  this.endBoundary.previousEntry = this.startBoundary;
};

AllOne.prototype.inc = function (inputKeyString) {
  const existingNodeOrSentinel =
    this.mappingKeyToNode.get(inputKeyString) || this.startBoundary;
  const nextCountInteger = existingNodeOrSentinel.valueCount + 1;

  let targetNodeForInc;
  const nextNeighborNode = existingNodeOrSentinel.nextElement;

  if (nextNeighborNode.valueCount !== nextCountInteger) {
    const newNodeForInsertion = {
      valueCount: nextCountInteger,
      associatedKeys: new Set(),
      previousEntry: existingNodeOrSentinel,
      nextElement: nextNeighborNode,
    };
    nextNeighborNode.previousEntry = newNodeForInsertion;
    existingNodeOrSentinel.nextElement = newNodeForInsertion;
    targetNodeForInc = newNodeForInsertion;
  } else {
    targetNodeForInc = nextNeighborNode;
  }

  targetNodeForInc.associatedKeys.add(inputKeyString);
  existingNodeOrSentinel.associatedKeys.delete(inputKeyString);
  this.mappingKeyToNode.set(inputKeyString, targetNodeForInc);

  if (
    existingNodeOrSentinel !== this.startBoundary &&
    existingNodeOrSentinel.associatedKeys.size === 0
  ) {
    const nodeBeforeEmpty = existingNodeOrSentinel.previousEntry;
    const nodeAfterEmpty = existingNodeOrSentinel.nextElement;
    nodeBeforeEmpty.nextElement = nodeAfterEmpty;
    nodeAfterEmpty.previousEntry = nodeBeforeEmpty;
  }
};

AllOne.prototype.dec = function (inputKeyVal) {
  const currentActiveNode = this.mappingKeyToNode.get(inputKeyVal);
  const decreasedCountForDec = currentActiveNode.valueCount - 1;

  currentActiveNode.associatedKeys.delete(inputKeyVal);

  if (decreasedCountForDec === 0) {
    this.mappingKeyToNode.delete(inputKeyVal);
  } else {
    let targetNodeForDec;
    const prevNeighborNode = currentActiveNode.previousEntry;

    if (prevNeighborNode.valueCount !== decreasedCountForDec) {
      const anotherNodeForInsertion = {
        valueCount: decreasedCountForDec,
        associatedKeys: new Set(),
        previousEntry: prevNeighborNode,
        nextElement: currentActiveNode,
      };
      currentActiveNode.previousEntry = anotherNodeForInsertion;
      prevNeighborNode.nextElement = anotherNodeForInsertion;
      targetNodeForDec = anotherNodeForInsertion;
    } else {
      targetNodeForDec = prevNeighborNode;
    }
    targetNodeForDec.associatedKeys.add(inputKeyVal);
    this.mappingKeyToNode.set(inputKeyVal, targetNodeForDec);
  }

  if (currentActiveNode.associatedKeys.size === 0) {
    const decPreviousNode = currentActiveNode.previousEntry;
    const decNextNode = currentActiveNode.nextElement;
    decPreviousNode.nextElement = decNextNode;
    decNextNode.previousEntry = decPreviousNode;
  }
};

AllOne.prototype.getMaxKey = function () {
  const maxCountContainer = this.endBoundary.previousEntry;
  if (maxCountContainer === this.startBoundary) {
    return "";
  }
  const iteratorForMaxKeys = maxCountContainer.associatedKeys.values();
  const maxKeyStringResult = iteratorForMaxKeys.next().value;
  return maxKeyStringResult;
};

AllOne.prototype.getMinKey = function () {
  const minCountContainer = this.startBoundary.nextElement;
  if (minCountContainer === this.endBoundary) {
    return "";
  }
  const iteratorForMinKeys = minCountContainer.associatedKeys.values();
  const minKeyStringResult = iteratorForMinKeys.next().value;
  return minKeyStringResult;
};
