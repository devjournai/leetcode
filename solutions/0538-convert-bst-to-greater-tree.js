/**
 * Convert Bst To Greater Tree
 * Intuition: Reverse inorder (right-root-left) visits keys from largest to smallest. A running sum of visited values is the new node value (greater-tree transform).
 * Approach: 1. `currentRunningSum` starts at 0. 2. Recurse right, add `currentNode.val` to the sum and write it back, then recurse left. 3. Return the mutated `root`.
 * Dry Run: BST 2 / 1 3.
 *   - Visit 3: sum=3, node=3. Visit 2: sum=5, node=5. Visit 1: sum=6, node=6. Tree 5 / 6 3.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var convertBST = function (root) {
  let currentRunningSum = 0;

  function processNodeRecursively(currentNode) {
    if (currentNode === null) {
      return;
    }

    processNodeRecursively(currentNode.right);

    currentRunningSum += currentNode.val;
    currentNode.val = currentRunningSum;

    processNodeRecursively(currentNode.left);
  }

  processNodeRecursively(root);
  return root;
};
