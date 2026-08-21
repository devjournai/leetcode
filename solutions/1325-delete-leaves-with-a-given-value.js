/**
 * Delete Leaves With A Given Value
 * Intuition: Deleting a target leaf can expose a new target leaf, so post-order prune after children are cleaned.
 * Approach: 1. Recurse left then right. 2. If the node is now a leaf with value target, return null. 3. Return the (possibly new) root.
 * Dry Run: root = [1,2,3,2,null,2,4], target=2. All 2-leaves drop; 4 stays → [1,null,3,null,4].
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var removeLeafNodes = function (root, target) {
  function processTreeForDeletion(currentPath) {
    if (currentPath === null) {
      return null;
    }

    let processedLeftSubtree = processTreeForDeletion(currentPath.left);
    let processedRightSubtree = processTreeForDeletion(currentPath.right);

    currentPath.left = processedLeftSubtree;
    currentPath.right = processedRightSubtree;

    let isTargetLeafCandidate =
      currentPath.left === null &&
      currentPath.right === null &&
      currentPath.val === target;

    if (isTargetLeafCandidate) {
      return null;
    } else {
      return currentPath;
    }
  }

  return processTreeForDeletion(root);
};
