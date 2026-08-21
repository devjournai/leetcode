/**
 * Lowest Common Ancestor Of A Binary Tree Iv
 * Intuition: Generalize binary LCA to a set of nodes: if the current node is a target, return it; if both subtrees return hits, current is the LCA of the set.
 * Approach: 1. Put all targets in a Set. 2. Recurse: null → null; node in the set → node. 3. If left and right both non-null, return current; else return the non-null side.
 * Dry Run: targets are two leaves under different children of r → r is returned when both sides hit.
 * Time Complexity: O(N)
 * Space Complexity: O(H + M)
 */
var lowestCommonAncestor = function (binaryRoot, targetNodesArray) {
  const nodeSetForTargets = new Set(targetNodesArray);

  function lcaSearcher(currentPosition) {
    if (!currentPosition) {
      return null;
    }

    if (nodeSetForTargets.has(currentPosition)) {
      return currentPosition;
    }

    const resultFromLeft = lcaSearcher(currentPosition.left);
    const resultFromRight = lcaSearcher(currentPosition.right);

    if (resultFromLeft && resultFromRight) {
      return currentPosition;
    }

    return resultFromLeft ? resultFromLeft : resultFromRight;
  }

  return lcaSearcher(binaryRoot);
};
