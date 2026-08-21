/**
 * Merge Bsts To Create Single Bst
 * Intuition: Each tree is a 2- or 3-node BST. Leaves that equal another tree's root can be replaced by that tree. There must be exactly one root that is never a child; after grafting every other tree exactly once, the result must still be a BST with unique values.
 * Approach: 1. Map root values to trees; collect all child values. Duplicate roots → null. 2. The unique tree whose root is not a child is the candidate global root (none or two → null). 3. Recursively replace a leaf whose value is a remaining tree root (referenced once) with that tree. 4. Require exactly one unused map entry (the global root) and a valid BST; otherwise null.
 * Dry Run: trees = [root 3 with left leaf 2, root 2 with left leaf 1].
 *   - Child set {2,1}; unique non-child root is 3. Graft tree 2 under 3, then tree 1 under 2. Map leftover size 1 and BST inorder 1,2,3 → return that tree.
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
        (childReferenceCounts.get(currentTreeIterated.left.val) || 0) + 1
      );
    }
    if (currentTreeIterated.right) {
      childReferenceCounts.set(
        currentTreeIterated.right.val,
        (childReferenceCounts.get(currentTreeIterated.right.val) || 0) + 1
      );
    }
  }

  if (!finalRootCandidate) {
    return null;
  }

  function processTreeNodes(
    currentProcessingNode,
    nodeValueMapArg,
    childReferenceCountsArg
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
        childReferenceCountsArg
      );
    }

    currentProcessingNode.left = processTreeNodes(
      currentProcessingNode.left,
      nodeValueMapArg,
      childReferenceCountsArg
    );
    currentProcessingNode.right = processTreeNodes(
      currentProcessingNode.right,
      nodeValueMapArg,
      childReferenceCountsArg
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
      validationNode.val
    );
    const rightSubtreeValid = validateBstIntegrity(
      validationNode.right,
      validationNode.val,
      maximumBound
    );
    return leftSubtreeValid && rightSubtreeValid;
  }

  const fullyMergedTree = processTreeNodes(
    finalRootCandidate,
    nodeValueMap,
    childReferenceCounts
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
