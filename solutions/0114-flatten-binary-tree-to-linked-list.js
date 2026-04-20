/**
 * Flatten Binary Tree To Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var flatten = function (root) {
  let currentHead = root;

  while (currentHead !== null) {
    if (currentHead.left !== null) {
      let leftSubtreeEndNode = currentHead.left;
      while (leftSubtreeEndNode.right !== null) {
        leftSubtreeEndNode = leftSubtreeEndNode.right;
      }

      let originalRightSubtree = currentHead.right;
      currentHead.right = currentHead.left;
      currentHead.left = null;
      leftSubtreeEndNode.right = originalRightSubtree;
    }
    currentHead = currentHead.right;
  }
};