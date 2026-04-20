/**
 * Lowest Common Ancestor Of A Binary Search Tree
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
