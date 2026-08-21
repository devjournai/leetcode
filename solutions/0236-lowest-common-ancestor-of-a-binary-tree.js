/**
 * Lowest Common Ancestor Of A Binary Tree
 * Intuition: Recurse into both subtrees. If p and q are found on different sides, the current node is the LCA; if only one side returns a node, that node is the ancestor (or the node itself).
 * Approach: 1. Base: null, or root is p or q, return root. 2. Recurse left and right. 3. If both sides are non-null, return root. 4. Else return the non-null side (or null).
 * Dry Run: tree 3 with left 5 and right 1; p=5, q=1.
 *   - Left returns 5, right returns 1 → both non-null → return 3.
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
