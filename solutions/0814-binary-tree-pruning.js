/**
 * Binary Tree Pruning
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var pruneTree = function (root) {
  if (!root) {
    return null;
  }

  let updatedLeftSubtree = pruneTree(root.left);
  let updatedRightSubtree = pruneTree(root.right);

  root.left = updatedLeftSubtree;
  root.right = updatedRightSubtree;

  if (!root.left && !root.right && root.val === 0) {
    return null;
  }

  return root;
};
