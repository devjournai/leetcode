/**
 * Lowest Common Ancestor Of Deepest Leaves
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var lcaDeepestLeaves = function (root) {
  function processNodeAndDepth(currentNodeElement) {
    if (!currentNodeElement) {
      return { maximumDepth: 0, deepestLca: null };
    }

    const leftSubtreeOutcome = processNodeAndDepth(currentNodeElement.left);
    const rightSubtreeOutcome = processNodeAndDepth(currentNodeElement.right);

    const leftLevel = leftSubtreeOutcome.maximumDepth;
    const rightLevel = rightSubtreeOutcome.maximumDepth;

    if (leftLevel === rightLevel) {
      const currentTotalDepth = leftLevel + 1;
      return {
        maximumDepth: currentTotalDepth,
        deepestLca: currentNodeElement,
      };
    } else if (leftLevel > rightLevel) {
      const extendedLeftDepth = leftLevel + 1;
      return {
        maximumDepth: extendedLeftDepth,
        deepestLca: leftSubtreeOutcome.deepestLca,
      };
    } else {
      const extendedRightDepth = rightLevel + 1;
      return {
        maximumDepth: extendedRightDepth,
        deepestLca: rightSubtreeOutcome.deepestLca,
      };
    }
  }

  const overallResult = processNodeAndDepth(root);
  return overallResult.deepestLca;
};
