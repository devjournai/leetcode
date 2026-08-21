/**
 * Largest Bst Subtree
 * Intuition: A node roots a BST iff both children do and node.val sits strictly between the left max and right max. Postorder returns that fact plus size/min/max so the largest valid size can be tracked in one pass.
 * Approach: 1. Recurse on left and right. 2. If both are BSTs and val > left.max and val < right.min, size = left.size + right.size + 1, update largestBstNodesCount, and return combined min/max. 3. Otherwise return isBstCandidate false. 4. Null is a BST of size 0 with min Infinity and max -Infinity. Return the tracked max size.
 * Dry Run: root = [10, 5, 15, 1, 8, null, 7].
 *   - Subtree 5-1-8 is a BST of size 3; 15 with 7 is not.
 *   - Global max stays 3.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var largestBSTSubtree = function (root) {
  let largestBstNodesCount = 0;

  function calculateBstInfo(currentTree) {
    if (!currentTree) {
      return {
        isBstCandidate: true,
        subtreeNodeCount: 0,
        subtreeMinValue: Infinity,
        subtreeMaxValue: -Infinity,
      };
    }

    const leftSubtreeData = calculateBstInfo(currentTree.left);
    const rightSubtreeData = calculateBstInfo(currentTree.right);

    if (
      leftSubtreeData.isBstCandidate &&
      rightSubtreeData.isBstCandidate &&
      currentTree.val > leftSubtreeData.subtreeMaxValue &&
      currentTree.val < rightSubtreeData.subtreeMinValue
    ) {
      const combinedSize =
        leftSubtreeData.subtreeNodeCount +
        rightSubtreeData.subtreeNodeCount +
        1;

      largestBstNodesCount = Math.max(largestBstNodesCount, combinedSize);

      return {
        isBstCandidate: true,
        subtreeNodeCount: combinedSize,
        subtreeMinValue: Math.min(
          leftSubtreeData.subtreeMinValue,
          currentTree.val
        ),
        subtreeMaxValue: Math.max(
          rightSubtreeData.subtreeMaxValue,
          currentTree.val
        ),
      };
    } else {
      return {
        isBstCandidate: false,
        subtreeNodeCount: 0,
        subtreeMinValue: 0,
        subtreeMaxValue: 0,
      };
    }
  }

  calculateBstInfo(root);

  return largestBstNodesCount;
};
