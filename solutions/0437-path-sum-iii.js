/**
 * Path Sum III
 * Time Complexity: O(N^2)
 * Space Complexity: O(H)
 */
var pathSum = function (treeRoot, targetSumValue) {
  if (!treeRoot) {
    return 0;
  }

  let pathsStartingAtRoot = countPathsFromNode(treeRoot, targetSumValue);
  let pathsInLeftSubtree = pathSum(treeRoot.left, targetSumValue);
  let pathsInRightSubtree = pathSum(treeRoot.right, targetSumValue);

  let totalPathsOverall =
    pathsStartingAtRoot + pathsInLeftSubtree + pathsInRightSubtree;
  return totalPathsOverall;
};

function countPathsFromNode(currentScanNode, currentRemainingSum) {
  if (!currentScanNode) {
    return 0;
  }

  let currentPathMatch = currentScanNode.val === currentRemainingSum ? 1 : 0;
  let leftDescendantPaths = countPathsFromNode(
    currentScanNode.left,
    currentRemainingSum - currentScanNode.val,
  );
  let rightDescendantPaths = countPathsFromNode(
    currentScanNode.right,
    currentRemainingSum - currentScanNode.val,
  );

  let combinedNodePaths =
    currentPathMatch + leftDescendantPaths + rightDescendantPaths;
  return combinedNodePaths;
}
