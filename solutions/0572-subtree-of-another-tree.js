/**
 * Subtree Of Another Tree
 * Time Complexity: O(N * M)
 * Space Complexity: O(max(N, M))
 */
var isSubtree = function (root, subRoot) {
  if (!root) {
    return false;
  }

  function areTreesIdentical(treeOne, treeTwo) {
    if (!treeOne && !treeTwo) {
      return true;
    }
    if (!treeOne || !treeTwo) {
      return false;
    }

    let valueComparison = treeOne.val === treeTwo.val;
    let leftComparison = areTreesIdentical(treeOne.left, treeTwo.left);
    let rightComparison = areTreesIdentical(treeOne.right, treeTwo.right);

    return valueComparison && leftComparison && rightComparison;
  }

  let currentRootMatchesSub = areTreesIdentical(root, subRoot);
  if (currentRootMatchesSub) {
    return true;
  }

  let searchLeftBranch = isSubtree(root.left, subRoot);
  if (searchLeftBranch) {
    return true;
  }

  let searchRightBranch = isSubtree(root.right, subRoot);
  return searchRightBranch;
};
