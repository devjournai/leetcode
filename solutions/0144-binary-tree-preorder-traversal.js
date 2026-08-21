/**
 * Binary Tree Preorder Traversal
 * Intuition: Preorder is root, then left, then right. An explicit stack can simulate DFS if the right child is pushed before the left so the left is processed first.
 * Approach: 1. If `root` is null, return empty `collectedValues`. 2. Push `root` onto `traversalStack`. 3. While the stack is non-empty, pop `currentProcessor`, append `currentProcessor.val`, then push `right` if present and `left` if present. 4. Return `collectedValues`.
 * Dry Run: tree [1,null,2,3] (1's right is 2, 2's left is 3)
 * Stack: [1] → visit 1, push 2 → visit 2, push 3 → visit 3
 * Result: [1,2,3]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var preorderTraversal = function (root) {
  const collectedValues = [];
  if (!root) {
    return collectedValues;
  }

  const traversalStack = [];
  traversalStack.push(root);

  while (traversalStack.length > 0) {
    const currentProcessor = traversalStack.pop();
    collectedValues.push(currentProcessor.val);

    const rightChild = currentProcessor.right;
    if (rightChild) {
      traversalStack.push(rightChild);
    }

    const leftChild = currentProcessor.left;
    if (leftChild) {
      traversalStack.push(leftChild);
    }
  }

  return collectedValues;
};
