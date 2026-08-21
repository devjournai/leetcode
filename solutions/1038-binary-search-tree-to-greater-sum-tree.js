/**
 * Binary Search Tree To Greater Sum Tree
 * Intuition: Reverse inorder (right, node, left) visits keys from largest to smallest, so a running sum is exactly the greater-sum for the current node.
 * Approach: 1. Recurse right. 2. Add node.val into runningTotal and write it back. 3. Recurse left. 4. Return the mutated root.
 * Dry Run: BST 4 / \ 1 6 with 6 having 5 and 7.
 *   - Visit 7,6,5,4,... values become 7,13,18,22,...
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var bstToGst = function (root) {
  let runningTotal = 0;

  function convertTree(currentNode) {
    if (currentNode === null) {
      return;
    }

    convertTree(currentNode.right);

    runningTotal += currentNode.val;
    currentNode.val = runningTotal;

    convertTree(currentNode.left);
  }

  convertTree(root);
  return root;
};
