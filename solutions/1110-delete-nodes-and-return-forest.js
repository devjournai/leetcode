/**
 * Delete Nodes And Return Forest
 * Intuition: Deleting a node detaches it and makes each surviving child a new tree root. A preorder walk that knows whether the current node is a forest root records those roots and nulls out deleted nodes.
 * Approach: 1. Put delete values in a set. 2. DFS with a flag isRoot. 3. If the node is a root candidate and not deleted, push it. 4. Recurse children with isRoot=deleted. 5. Return null if deleted, else the node.
 * Dry Run: tree 1-2-4, 1-3; delete [2]. 2 is dropped, 4 becomes a root, 1 stays → forest [1,4].
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
      currentNodeElement.val
    );

    if (isCurrentRootCandidate && !isCurrentNodeMarkedForDeletion) {
      resultForest.push(currentNodeElement);
    }

    currentNodeElement.left = processSubtree(
      currentNodeElement.left,
      isCurrentNodeMarkedForDeletion
    );
    currentNodeElement.right = processSubtree(
      currentNodeElement.right,
      isCurrentNodeMarkedForDeletion
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
