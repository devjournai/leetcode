/**
 * Increasing Order Search Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var increasingBST = function (root) {
  const startNode = new TreeNode(0);
  let movePointer = startNode;

  function processTreeInorder(presentNode) {
    if (presentNode === null) {
      return;
    }

    processTreeInorder(presentNode.left);

    movePointer.right = new TreeNode(presentNode.val);
    movePointer = movePointer.right;

    processTreeInorder(presentNode.right);
  }

  processTreeInorder(root);

  return startNode.right;
};
