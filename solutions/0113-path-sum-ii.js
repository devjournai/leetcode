/**
 * Path Sum II
 * Intuition: DFS with a shared path buffer records every root-to-leaf whose values sum to target. Copy the buffer only when a matching leaf is found, then backtrack.
 * Approach: 1. Null root returns []. 2. Push the node value and subtract it from the remaining target. 3. Leaf with remaining 0 → copy the path into the answer. 4. Recurse left then right, then pop the value.
 * Dry Run: Same tree as Path Sum, target 22. Paths 5-4-11-2 and 5-8-4-5 both hit remaining 0 at a leaf; those two copies are returned.
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
