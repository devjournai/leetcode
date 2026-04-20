/**
 * Lowest Common Ancestor Of A Binary Tree III
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
