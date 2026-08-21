/**
 * Binary Search Tree Iterator II
 * Intuition: Flatten inorder into an array and move a pointer for next/prev.
 * Approach: 1. Inorder push vals; pointer=-1. 2. hasNext/next increment. 3. hasPrev/prev decrement.
 * Dry Run: BST 7 with children 3 and 15.
 *   - Inorder [3,7,15]; next→3, next→7, prev→3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var BSTIterator = function (root) {
  this.allElements = [];
  this.pointerIndex = -1;

  const traverseAndStore = (currentNode) => {
    if (!currentNode) {
      return;
    }
    traverseAndStore(currentNode.left);
    this.allElements.push(currentNode.val);
    traverseAndStore(currentNode.right);
  };

  traverseAndStore(root);
};

BSTIterator.prototype.hasNext = function () {
  return this.pointerIndex + 1 < this.allElements.length;
};

BSTIterator.prototype.next = function () {
  this.pointerIndex++;
  return this.allElements[this.pointerIndex];
};

BSTIterator.prototype.hasPrev = function () {
  return this.pointerIndex > 0;
};

BSTIterator.prototype.prev = function () {
  this.pointerIndex--;
  return this.allElements[this.pointerIndex];
};
