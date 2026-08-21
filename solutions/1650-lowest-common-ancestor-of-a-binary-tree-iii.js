/**
 * Lowest Common Ancestor Of A Binary Tree III
 * Intuition: Parent pointers make this the same as intersecting two linked lists: walk each node up, wrapping to the other start, until the pointers meet at the LCA.
 * Approach: 1. Two walkers at p and q. 2. While they differ, step to parent, or jump to the other node when parent is null. 3. Return the meeting node.
 * Dry Run: p and q under the same parent r.
 *   - Walkers climb and meet at r (or at the deeper node if one is ancestor of the other).
 * Time Complexity: O(H)
 * Space Complexity: O(1)
 */
var lowestCommonAncestor = function (p, q) {
  let firstNodeWalker = p;
  let secondNodeWalker = q;

  while (firstNodeWalker !== secondNodeWalker) {
    firstNodeWalker =
      firstNodeWalker.parent === null ? q : firstNodeWalker.parent;
    secondNodeWalker =
      secondNodeWalker.parent === null ? p : secondNodeWalker.parent;
  }

  return firstNodeWalker;
};
