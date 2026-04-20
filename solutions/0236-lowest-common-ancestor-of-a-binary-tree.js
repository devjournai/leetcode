/**
 * Lowest Common Ancestor Of A Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var lowestCommonAncestor = function (root, p, q) {
  if (!root || root === p || root === q) {
    return root;
  }

  const leftTraversalResult = lowestCommonAncestor(root.left, p, q);
  const rightTraversalResult = lowestCommonAncestor(root.right, p, q);

  if (leftTraversalResult && rightTraversalResult) {
    return root;
  } else if (leftTraversalResult) {
    return leftTraversalResult;
  } else {
    return rightTraversalResult;
  }
};