/**
 * Trim A Binary Search Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var trimBST = function (root, low, high) {
  if (!root) {
    return null;
  }

  let nodeToProcess = root;

  if (nodeToProcess.val < low) {
    return trimBST(nodeToProcess.right, low, high);
  } else if (nodeToProcess.val > high) {
    return trimBST(nodeToProcess.left, low, high);
  } else {
    nodeToProcess.left = trimBST(nodeToProcess.left, low, high);
    nodeToProcess.right = trimBST(nodeToProcess.right, low, high);
    return nodeToProcess;
  }
};
