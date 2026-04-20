/**
 * Convert Bst To Greater Tree
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
