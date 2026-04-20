/**
 * Delete Leaves With A Given Value
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
