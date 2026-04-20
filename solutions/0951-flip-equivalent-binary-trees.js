/**
 * Flip Equivalent Binary Trees
 * Time Complexity: O(min(N, M))
 * Space Complexity: O(H)
 */
var flipEquiv = function (root1, root2) {
  function isFlipEquivalent(nodeA, nodeB) {
    if (!nodeA && !nodeB) {
      return true;
    }

    if (!nodeA || !nodeB || nodeA.val !== nodeB.val) {
      return false;
    }

    const matchWithoutFlip =
      isFlipEquivalent(nodeA.left, nodeB.left) &&
      isFlipEquivalent(nodeA.right, nodeB.right);
    const matchWithFlip =
      isFlipEquivalent(nodeA.left, nodeB.right) &&
      isFlipEquivalent(nodeA.right, nodeB.left);

    return matchWithoutFlip || matchWithFlip;
  }

  return isFlipEquivalent(root1, root2);
};
