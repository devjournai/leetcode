/**
 * Binary Tree Inorder Traversal
 * Intuition: Inorder is left subtree, then node value, then right subtree; a recursive helper collects values in that order.
 * Approach: 1. `processNode` returns on null. 2. Recurse left, push `currentNode.val`, recurse right. 3. Start from the root and return the array.
 * Dry Run: tree 1 / \ null 2 / 3 → visit 1, then 3, then 2 → [1,3,2]
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var inorderTraversal = function (initialNode) {
  const collectedValues = [];

  const processNode = (currentNode) => {
    if (currentNode === null) {
      return;
    }

    processNode(currentNode.left);
    collectedValues.push(currentNode.val);
    processNode(currentNode.right);
  };

  processNode(initialNode);

  return collectedValues;
};
