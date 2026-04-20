/**
 * Maximum Difference Between Node And Ancestor
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var maxAncestorDiff = function (rootNode) {
  if (!rootNode) {
    return 0;
  }

  function calculateMaxDifference(currentNode, pathMaximum, pathMinimum) {
    if (!currentNode) {
      return pathMaximum - pathMinimum;
    }

    const updatedPathMaximum = Math.max(pathMaximum, currentNode.val);
    const updatedPathMinimum = Math.min(pathMinimum, currentNode.val);

    const leftBranchDifference = calculateMaxDifference(
      currentNode.left,
      updatedPathMaximum,
      updatedPathMinimum,
    );

    const rightBranchDifference = calculateMaxDifference(
      currentNode.right,
      updatedPathMaximum,
      updatedPathMinimum,
    );

    return Math.max(leftBranchDifference, rightBranchDifference);
  }

  return calculateMaxDifference(rootNode, rootNode.val, rootNode.val);
};
