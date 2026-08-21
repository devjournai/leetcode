/**
 * Construct Binary Tree From Preorder And Inorder Traversal
 * Intuition: Preorder lists the root first; inorder splits that root’s left and right subtrees. Recursively rebuild each side from the matching slices of both arrays.
 * Approach: 1. Empty preorder or inorder returns null. 2. preorder[0] is the current root. 3. Find that value in inorder (indexOf) to size the left subtree. 4. Slice left/right inorder and preorder ranges and recurse to attach left then right.
 * Dry Run: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]. Root 3 splits inorder into [9] | [15,20,7]. Left is leaf 9. Right rebuilds 20 with children 15 and 7. Tree is 3 / 9, 20 / 15, 7.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length === 0 || inorder.length === 0) {
    return null;
  }

  const currentRootValue = preorder[0];
  const currentRootNode = new TreeNode(currentRootValue);

  const rootInorderIndex = inorder.indexOf(currentRootValue);

  const leftSubtreeInorder = inorder.slice(0, rootInorderIndex);
  const leftSubtreePreorder = preorder.slice(1, rootInorderIndex + 1);

  currentRootNode.left = buildTree(leftSubtreePreorder, leftSubtreeInorder);

  const rightSubtreeInorder = inorder.slice(rootInorderIndex + 1);
  const rightSubtreePreorder = preorder.slice(rootInorderIndex + 1);

  currentRootNode.right = buildTree(rightSubtreePreorder, rightSubtreeInorder);

  return currentRootNode;
};
