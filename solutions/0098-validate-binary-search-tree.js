/**
 * Validate Binary Search Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var isValidBST = function (root) {
  let nodeStack = [];
  let previousValue = null;
  let currentProcessingNode = root;

  while (currentProcessingNode !== null || nodeStack.length > 0) {
    while (currentProcessingNode !== null) {
      nodeStack.push(currentProcessingNode);
      currentProcessingNode = currentProcessingNode.left;
    }

    let nextTreeNode = nodeStack.pop();

    if (previousValue !== null && nextTreeNode.val <= previousValue) {
      return false;
    }

    previousValue = nextTreeNode.val;
    currentProcessingNode = nextTreeNode.right;
  }

  return true;
};