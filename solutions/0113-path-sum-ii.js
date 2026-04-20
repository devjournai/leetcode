/**
 * Path Sum II
 * Time Complexity: O(N * D)
 * Space Complexity: O(N * D)
 */
var pathSum = function (root, targetSum) {
  if (!root) {
    return [];
  }

  const allFoundPaths = [];
  const currentPathSegment = [];

  function exploreTreeDfs(currentNodeElement, remainingTargetValue) {
    if (!currentNodeElement) {
      return;
    }

    const nodeNumericalValue = currentNodeElement.val;
    currentPathSegment.push(nodeNumericalValue);
    const updatedTarget = remainingTargetValue - nodeNumericalValue;

    if (
      !currentNodeElement.left &&
      !currentNodeElement.right &&
      updatedTarget === 0
    ) {
      allFoundPaths.push([...currentPathSegment]);
    }

    if (currentNodeElement.left) {
      exploreTreeDfs(currentNodeElement.left, updatedTarget);
    }

    if (currentNodeElement.right) {
      exploreTreeDfs(currentNodeElement.right, updatedTarget);
    }

    currentPathSegment.pop();
  }

  exploreTreeDfs(root, targetSum);

  return allFoundPaths;
};
