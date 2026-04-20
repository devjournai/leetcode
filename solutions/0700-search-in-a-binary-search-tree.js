/**
 * Search In A Binary Search Tree
 * Time Complexity: O(H)
 * Space Complexity: O(H)
 */
var searchBST = function (root, val) {
  if (root === null) {
    return null;
  }

  if (root.val === val) {
    return root;
  }

  if (val < root.val) {
    let leftSubtreeResult = searchBST(root.left, val);
    return leftSubtreeResult;
  } else {
    let rightSubtreeResult = searchBST(root.right, val);
    return rightSubtreeResult;
  }
};
