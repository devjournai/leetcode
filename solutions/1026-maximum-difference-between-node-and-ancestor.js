/**
 * Maximum Difference Between Node And Ancestor
 * Intuition: For any path, the max |a-b| is max-min on that path. DFS carries the running max and min and records max-min at null children.
 * Approach: 1. Recurse with (node, pathMax, pathMin). 2. Null returns pathMax-pathMin. 3. Update max/min with node.val and take max of left and right.
 * Dry Run: root 8, left 3, right 10 with 3 having 1 and 6.
 *   - Path 8-3-1: max-min=7. Other paths smaller. Answer 7.
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
      updatedPathMinimum
    );

    const rightBranchDifference = calculateMaxDifference(
      currentNode.right,
      updatedPathMaximum,
      updatedPathMinimum
    );

    return Math.max(leftBranchDifference, rightBranchDifference);
  }

  return calculateMaxDifference(rootNode, rootNode.val, rootNode.val);
};
