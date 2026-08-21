/**
 * Search In A Binary Search Tree
 * Intuition: BST order: go left if val is smaller than the node, right if larger, return the node on match.
 * Approach: 1. Null → null. 2. `root.val === val` → root. 3. Else recurse `searchBST` on left or right.
 * Dry Run: tree 4 / 2 7 / 1 3, val=2. 2<4 go left; 2==2 return that node.
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
