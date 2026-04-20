/**
 * Merge Two Binary Trees
 * Time Complexity: O(min(m, n))
 * Space Complexity: O(min(m, n))
 */
var mergeTrees = function (treeA, treeB) {
  if (treeA === null && treeB === null) {
    return null;
  }

  let createdNode;

  if (treeA === null) {
    createdNode = treeB;
  } else if (treeB === null) {
    createdNode = treeA;
  } else {
    createdNode = new TreeNode(treeA.val + treeB.val);
    createdNode.left = mergeTrees(treeA.left, treeB.left);
    createdNode.right = mergeTrees(treeA.right, treeB.right);
  }

  return createdNode;
};
