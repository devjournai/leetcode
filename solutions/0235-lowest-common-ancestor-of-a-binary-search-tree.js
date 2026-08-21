/**
 * Lowest Common Ancestor Of A Binary Search Tree
 * Intuition: In a BST the LCA is the first node that is not strictly left of both p and q and not strictly right of both. Walk from the root using value comparisons, O(1) extra space.
 * Approach: 1. Start at root. 2. If both p and q are greater, go right. 3. If both are smaller, go left. 4. Otherwise this node splits them (or is one of them) — return it.
 * Dry Run: BST rooted at 6 with left 2 and right 8; p=2, q=8.
 *   - 2 and 8 are not both > 6 or both < 6 → return 6.
 * Time Complexity: O(H)
 * Space Complexity: O(1)
 */
var lowestCommonAncestor = function (root, p, q) {
  let currentBranchNode = root;

  while (true) {
    const pValue = p.val;
    const qValue = q.val;
    const currentNodeValue = currentBranchNode.val;

    if (pValue > currentNodeValue && qValue > currentNodeValue) {
      currentBranchNode = currentBranchNode.right;
    } else if (pValue < currentNodeValue && qValue < currentNodeValue) {
      currentBranchNode = currentBranchNode.left;
    } else {
      return currentBranchNode;
    }
  }
};
