/**
 * Maximum Binary Tree II
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var insertIntoMaxTree = function (root, val) {
  if (!root) {
    const freshNode = createTreeNode(val);
    return freshNode;
  }

  if (val > root.val) {
    const generatedNode = createTreeNode(val);
    generatedNode.left = root;
    return generatedNode;
  }

  root.right = insertIntoMaxTree(root.right, val);
  return root;

  function createTreeNode(nodeValue) {
    return new TreeNode(nodeValue);
  }
};
