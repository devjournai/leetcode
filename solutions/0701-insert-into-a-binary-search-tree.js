/**
 * Insert Into A Binary Search Tree
 * Time Complexity: O(H)
 * Space Complexity: O(1)
 */
var insertIntoBST = function (root, val) {
  if (!root) {
    let newRootNode = new TreeNode(val);
    return newRootNode;
  }

  let currentTraversalNode = root;

  while (true) {
    if (val < currentTraversalNode.val) {
      if (!currentTraversalNode.left) {
        let leftChildNode = new TreeNode(val);
        currentTraversalNode.left = leftChildNode;
        break;
      } else {
        currentTraversalNode = currentTraversalNode.left;
      }
    } else {
      // val > currentTraversalNode.val
      if (!currentTraversalNode.right) {
        let rightChildNode = new TreeNode(val);
        currentTraversalNode.right = rightChildNode;
        break;
      } else {
        currentTraversalNode = currentTraversalNode.right;
      }
    }
  }

  return root;
};
