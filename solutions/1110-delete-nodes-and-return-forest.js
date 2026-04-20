/**
 * Delete Nodes And Return Forest
 * Time Complexity: O(N + D)
 * Space Complexity: O(N + D)
 */
var delNodes = function (initialRoot, deleteValuesArray) {
  const deletionLookupSet = new Set(deleteValuesArray);
  const resultForest = [];

  function processSubtree(currentNodeElement, isCurrentRootCandidate) {
    if (currentNodeElement === null) {
      return null;
    }

    const isCurrentNodeMarkedForDeletion = deletionLookupSet.has(
      currentNodeElement.val,
    );

    if (isCurrentRootCandidate && !isCurrentNodeMarkedForDeletion) {
      resultForest.push(currentNodeElement);
    }

    currentNodeElement.left = processSubtree(
      currentNodeElement.left,
      isCurrentNodeMarkedForDeletion,
    );
    currentNodeElement.right = processSubtree(
      currentNodeElement.right,
      isCurrentNodeMarkedForDeletion,
    );

    if (isCurrentNodeMarkedForDeletion) {
      return null;
    } else {
      return currentNodeElement;
    }
  }

  processSubtree(initialRoot, true);

  return resultForest;
};
