/**
 * Merge Bsts To Create Single Bst
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var canMerge = function (trees) {
  const nodeValueMap = new Map();
  const presentChildValues = new Set();

  for (const currentTree of trees) {
    if (nodeValueMap.has(currentTree.val)) {
      return null;
    }
    nodeValueMap.set(currentTree.val, currentTree);
    if (currentTree.left) {
      presentChildValues.add(currentTree.left.val);
    }
    if (currentTree.right) {
      presentChildValues.add(currentTree.right.val);
    }
  }

  let finalRootCandidate = null;
  const childReferenceCounts = new Map();

  for (const currentTreeIterated of trees) {
    if (!presentChildValues.has(currentTreeIterated.val)) {
      if (finalRootCandidate) {
        return null;
      }
      finalRootCandidate = currentTreeIterated;
    }

    if (currentTreeIterated.left) {
      childReferenceCounts.set(
        currentTreeIterated.left.val,
        (childReferenceCounts.get(currentTreeIterated.left.val) || 0) + 1,
      );
    }
    if (currentTreeIterated.right) {
      childReferenceCounts.set(
        currentTreeIterated.right.val,
        (childReferenceCounts.get(currentTreeIterated.right.val) || 0) + 1,
      );
    }
  }

  if (!finalRootCandidate) {
    return null;
  }

  function processTreeNodes(
    currentProcessingNode,
    nodeValueMapArg,
    childReferenceCountsArg,
  ) {
    if (!currentProcessingNode) {
      return null;
    }

    if (
      !currentProcessingNode.left &&
      !currentProcessingNode.right &&
      nodeValueMapArg.has(currentProcessingNode.val) &&
      (childReferenceCountsArg.get(currentProcessingNode.val) || 0) === 1
    ) {
      const subtreeToAttach = nodeValueMapArg.get(currentProcessingNode.val);
      nodeValueMapArg.delete(currentProcessingNode.val);
      return processTreeNodes(
        subtreeToAttach,
        nodeValueMapArg,
        childReferenceCountsArg,
      );
    }

    currentProcessingNode.left = processTreeNodes(
      currentProcessingNode.left,
      nodeValueMapArg,
      childReferenceCountsArg,
    );
    currentProcessingNode.right = processTreeNodes(
      currentProcessingNode.right,
      nodeValueMapArg,
      childReferenceCountsArg,
    );
    return currentProcessingNode;
  }

  function validateBstIntegrity(validationNode, minimumBound, maximumBound) {
    if (!validationNode) {
      return true;
    }
    if (
      validationNode.val <= minimumBound ||
      validationNode.val >= maximumBound
    ) {
      return false;
    }
    const leftSubtreeValid = validateBstIntegrity(
      validationNode.left,
      minimumBound,
      validationNode.val,
    );
    const rightSubtreeValid = validateBstIntegrity(
      validationNode.right,
      validationNode.val,
      maximumBound,
    );
    return leftSubtreeValid && rightSubtreeValid;
  }

  const fullyMergedTree = processTreeNodes(
    finalRootCandidate,
    nodeValueMap,
    childReferenceCounts,
  );

  if (
    !fullyMergedTree ||
    nodeValueMap.size !== 1 ||
    !validateBstIntegrity(fullyMergedTree, -Infinity, Infinity)
  ) {
    return null;
  }

  return fullyMergedTree;
};
