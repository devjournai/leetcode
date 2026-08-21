/**
 * Flip Equivalent Binary Trees
 * Intuition: Two nodes match if they share a value and their children pair either in the same order or swapped (`matchWithoutFlip` vs `matchWithFlip`).
 * Approach: 1. Recurse with `isFlipEquivalent(nodeA, nodeB)`. 2. Empty/empty is true; one missing or unequal `val` is false. 3. Return the OR of pairing left-left/right-right and left-right/right-left. 4. Start from `root1` and `root2`.
 * Dry Run: root1 = [1,2,3], root2 = [1,3,2]. Roots both 1. Same-order children fail (2 vs 3). Flip pairing: 2 with 2, 3 with 3, both leaves. True.
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
