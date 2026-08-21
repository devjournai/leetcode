/**
 * Binary Search Tree Iterator
 * Intuition: Inorder traversal of a BST visits keys in sorted order. Keep a stack of the path down the left spine so next() can pop the next smallest node in amortized constant time.
 * Approach: 1. Constructor stores the root and an empty stack. 2. next() pushes all left children from the current node, pops the top (next smallest), then sets current to that node's right child. 3. hasNext() is true if current is non-null or the stack is non-empty.
 * Dry Run: tree 7 with left 3 and right 15 (15 has left 9, right 20).
 *   - First next(): push 7 then 3, pop 3, current = 3.right = null → 3.
 *   - Second next(): current is null so no extra lefts; pop 7, current = 15 → 7.
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
