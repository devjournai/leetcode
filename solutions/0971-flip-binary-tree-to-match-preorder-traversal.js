/**
 * Flip Binary Tree To Match Preorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var flipMatchVoyage = function (root, voyage) {
  const flippedNodeValues = [];
  let voyageIndex = 0;

  function depthFirstMatch(currentTreeNode) {
    if (currentTreeNode === null) {
      return true;
    }

    if (currentTreeNode.val !== voyage[voyageIndex]) {
      return false;
    }

    voyageIndex++;

    const currentLeftChild = currentTreeNode.left;
    const currentRightChild = currentTreeNode.right;

    if (
      currentLeftChild === null ||
      currentLeftChild.val === voyage[voyageIndex]
    ) {
      const leftSubtreeMatches = depthFirstMatch(currentLeftChild);
      if (!leftSubtreeMatches) {
        return false;
      }
      const rightSubtreeMatches = depthFirstMatch(currentRightChild);
      if (!rightSubtreeMatches) {
        return false;
      }
      return true;
    } else if (
      currentRightChild !== null &&
      currentRightChild.val === voyage[voyageIndex]
    ) {
      flippedNodeValues.push(currentTreeNode.val);
      const tempReference = currentTreeNode.left;
      currentTreeNode.left = currentTreeNode.right;
      currentTreeNode.right = tempReference;

      const newLeftSubtreeMatches = depthFirstMatch(currentTreeNode.left);
      if (!newLeftSubtreeMatches) {
        return false;
      }
      const newRightSubtreeMatches = depthFirstMatch(currentTreeNode.right);
      if (!newRightSubtreeMatches) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  const overallPreorderMatch = depthFirstMatch(root);
  if (overallPreorderMatch) {
    return flippedNodeValues;
  } else {
    return [-1];
  }
};
