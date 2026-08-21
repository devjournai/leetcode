/**
 * Binary Tree Pruning
 * Intuition: Post-order: prune children first, then drop a leaf whose value is 0 (subtree has no 1).
 * Approach: 1. Null root → null. 2. Recurse left/right and assign back. 3. If both children null and `val === 0`, return null; else return root.
 * Dry Run: [1,null,0,0,1]. Right-left 0 leaf drops; right node 0 keeps right 1 → [1,null,0,null,1].
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
