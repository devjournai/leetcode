/**
 * Design Skiplist
 * Time Complexity: O(log N)
 * Space Complexity: O(N)
 */

class SkiplistNode {
  constructor(val, height) {
    this.val = val;
    this.nextNodes = new Array(height).fill(null);
  }
}

var Skiplist = function () {
  this.maximumLevels = 16;
  this.promotionProbability = 0.5;

  this.skipListHead = new SkiplistNode(-1, this.maximumLevels);
};

Skiplist.prototype.search = function (targetValue) {
  let currentSearchCursor = this.skipListHead;
  for (
    let currentLevelIndex = this.maximumLevels - 1;
    currentLevelIndex >= 0;
    --currentLevelIndex
  ) {
    while (
      currentSearchCursor.nextNodes[currentLevelIndex] !== null &&
      currentSearchCursor.nextNodes[currentLevelIndex].val < targetValue
    ) {
      currentSearchCursor = currentSearchCursor.nextNodes[currentLevelIndex];
    }
  }

  currentSearchCursor = currentSearchCursor.nextNodes[0];
  return (
    currentSearchCursor !== null && currentSearchCursor.val === targetValue
  );
};

Skiplist.prototype.add = function (valueToAdd) {
  let predecessorTracking = new Array(this.maximumLevels);
  let currentAddTraversalPointer = this.skipListHead;

  for (
    let levelIterator = this.maximumLevels - 1;
    levelIterator >= 0;
    --levelIterator
  ) {
    while (
      currentAddTraversalPointer.nextNodes[levelIterator] !== null &&
      currentAddTraversalPointer.nextNodes[levelIterator].val < valueToAdd
    ) {
      currentAddTraversalPointer =
        currentAddTraversalPointer.nextNodes[levelIterator];
    }
    predecessorTracking[levelIterator] = currentAddTraversalPointer;
  }

  let newNodeHeight = 1;
  while (
    Math.random() < this.promotionProbability &&
    newNodeHeight < this.maximumLevels
  ) {
    newNodeHeight++;
  }

  let newlyCreatedNode = new SkiplistNode(valueToAdd, newNodeHeight);

  for (let levelLinker = 0; levelLinker < newNodeHeight; ++levelLinker) {
    newlyCreatedNode.nextNodes[levelLinker] =
      predecessorTracking[levelLinker].nextNodes[levelLinker];
    predecessorTracking[levelLinker].nextNodes[levelLinker] = newlyCreatedNode;
  }
};

Skiplist.prototype.erase = function (valueToRemove) {
  let deletionPredecessors = new Array(this.maximumLevels);
  let currentErasePointer = this.skipListHead;

  for (
    let levelToTraverse = this.maximumLevels - 1;
    levelToTraverse >= 0;
    --levelToTraverse
  ) {
    while (
      currentErasePointer.nextNodes[levelToTraverse] !== null &&
      currentErasePointer.nextNodes[levelToTraverse].val < valueToRemove
    ) {
      currentErasePointer = currentErasePointer.nextNodes[levelToTraverse];
    }
    deletionPredecessors[levelToTraverse] = currentErasePointer;
  }

  let candidateNodeForDeletion = deletionPredecessors[0].nextNodes[0];
  if (
    candidateNodeForDeletion === null ||
    candidateNodeForDeletion.val !== valueToRemove
  ) {
    return false;
  }

  let nodeSpanHeight = candidateNodeForDeletion.nextNodes.length;
  for (
    let adjustmentLevel = 0;
    adjustmentLevel < nodeSpanHeight;
    ++adjustmentLevel
  ) {
    if (
      deletionPredecessors[adjustmentLevel].nextNodes[adjustmentLevel] ===
      candidateNodeForDeletion
    ) {
      deletionPredecessors[adjustmentLevel].nextNodes[adjustmentLevel] =
        candidateNodeForDeletion.nextNodes[adjustmentLevel];
    }
  }
  return true;
};
