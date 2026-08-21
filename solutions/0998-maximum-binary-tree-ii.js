/**
 * Maximum Binary Tree II
 * Intuition: `val` was appended to the original array, so it belongs on the right spine: if `val > root.val` it becomes the new root with old tree as left; else recurse on `root.right`.
 * Approach: 1. Null → new `TreeNode(val)`. 2. If val > root.val, new node with `left = root`. 3. Else `root.right = insertIntoMaxTree(root.right, val)` and return root.
 * Dry Run: max tree [4,1,3,null,null,2], val=5. 5>4 so new root 5, left is old tree. Return [5,4,...].
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
