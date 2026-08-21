/**
 * Path Sum III
 * Intuition: Every node can start a downward path. Recurse on the whole tree, and from each node count downward paths whose values sum to the target.
 * Approach: 1. Null root → 0. 2. `countPathsFromNode` adds 1 if `val === remaining`, then recurses left/right with `remaining - val`. 3. `pathSum` adds paths from this root plus `pathSum` on left and right. 4. Return the total.
 * Dry Run: [10,5,-3,3,2,null,11], target 8. From 5: 5-3 and 5-2; from -3: -3+11. Total 3.
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
    currentRemainingSum - currentScanNode.val
  );
  let rightDescendantPaths = countPathsFromNode(
    currentScanNode.right,
    currentRemainingSum - currentScanNode.val
  );

  let combinedNodePaths =
    currentPathMatch + leftDescendantPaths + rightDescendantPaths;
  return combinedNodePaths;
}
