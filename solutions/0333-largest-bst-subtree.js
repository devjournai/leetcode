/**
 * Largest Bst Subtree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var largestBSTSubtree = function (root) {
  let largestBstNodesCount = 0;

  function calculateBstInfo(currentTree) {
    if (!currentTree) {
      return { isBstCandidate: true, subtreeNodeCount: 0, subtreeMinValue: Infinity, subtreeMaxValue: -Infinity };
    }

    const leftSubtreeData = calculateBstInfo(currentTree.left);
    const rightSubtreeData = calculateBstInfo(currentTree.right);

    if (leftSubtreeData.isBstCandidate &&
      rightSubtreeData.isBstCandidate &&
      currentTree.val > leftSubtreeData.subtreeMaxValue &&
      currentTree.val < rightSubtreeData.subtreeMinValue) {

      const combinedSize = leftSubtreeData.subtreeNodeCount + rightSubtreeData.subtreeNodeCount + 1;

      largestBstNodesCount = Math.max(largestBstNodesCount, combinedSize);

      return {
        isBstCandidate: true,
        subtreeNodeCount: combinedSize,
        subtreeMinValue: Math.min(leftSubtreeData.subtreeMinValue, currentTree.val),
        subtreeMaxValue: Math.max(rightSubtreeData.subtreeMaxValue, currentTree.val)
      };
    } else {
      return { isBstCandidate: false, subtreeNodeCount: 0, subtreeMinValue: 0, subtreeMaxValue: 0 };
    }
  }

  calculateBstInfo(root);

  return largestBstNodesCount;
};