/**
 * Flip Binary Tree To Match Preorder Traversal
 * Intuition: Walk the tree in preorder against `voyage`. If the next voyage value is the right child, flip this node (record its val) then continue; otherwise fail.
 * Approach: 1. DFS: mismatch with `voyage[voyageIndex]` is false; then increment index. 2. If left is null or left.val equals next voyage, recurse left then right. 3. Else if right.val matches next, push val, swap children, recurse. 4. Return flips or `[-1]`.
 * Dry Run: root = [1,2], voyage = [1,2]. After 1, left.val===2, no flip. Return []. If voyage were [1] only leftover mismatch → [-1].
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
