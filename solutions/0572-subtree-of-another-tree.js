/**
 * Subtree Of Another Tree
 * Intuition: `subRoot` is a subtree if some node of `root` is the root of an identical tree. Check identity at the current node, else search left then right.
 * Approach: 1. Null `root` → false. 2. `areTreesIdentical`: both null true; one null false; else equal vals and both children identical. 3. If current matches, true. 4. Else `isSubtree(left)` or `isSubtree(right)`.
 * Dry Run: root 3-4-5 with 4 having 1,2; subRoot 4-1-2.
 *   - Root 3 ≠ match; left 4 matches identically. Return true.
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
