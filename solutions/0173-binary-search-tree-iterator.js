/**
 * Binary Search Tree Iterator
 * Time Complexity: O(1)
 * Space Complexity: O(H)
 */
var BSTIterator = function (root) {
  this.nodeStackContents = [];
  this.currentSearchNode = root;
};

BSTIterator.prototype.next = function () {
  while (this.currentSearchNode !== null) {
    this.nodeStackContents.push(this.currentSearchNode);
    this.currentSearchNode = this.currentSearchNode.left;
  }

  let nextSmallestNode = this.nodeStackContents.pop();
  let extractedValue = nextSmallestNode.val;
  this.currentSearchNode = nextSmallestNode.right;

  return extractedValue;
};

BSTIterator.prototype.hasNext = function () {
  return this.currentSearchNode !== null || this.nodeStackContents.length > 0;
};
