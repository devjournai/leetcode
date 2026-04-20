/**
 * Binary Search Tree Iterator II
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
