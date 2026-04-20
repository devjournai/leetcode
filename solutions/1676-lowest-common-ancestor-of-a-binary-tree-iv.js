/**
 * Lowest Common Ancestor Of A Binary Tree Iv
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
