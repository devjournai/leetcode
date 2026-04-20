/**
 * Maximum Sum Bst In Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var maxSumBST = function (root) {
  let maximumBstSum = 0;

  function processNode(currentNode) {
    if (!currentNode) {
      return {
        isValidBst: true,
        minimumElement: Infinity,
        maximumElement: -Infinity,
        sumOfElements: 0,
      };
    }

    const leftSubtreeInfo = processNode(currentNode.left);
    const rightSubtreeInfo = processNode(currentNode.right);

    const isCurrentNodeValidBst =
      leftSubtreeInfo.isValidBst &&
      rightSubtreeInfo.isValidBst &&
      currentNode.val > leftSubtreeInfo.maximumElement &&
      currentNode.val < rightSubtreeInfo.minimumElement;

    if (isCurrentNodeValidBst) {
      const currentSubtreeValueSum =
        currentNode.val +
        leftSubtreeInfo.sumOfElements +
        rightSubtreeInfo.sumOfElements;
      maximumBstSum = Math.max(maximumBstSum, currentSubtreeValueSum);
      return {
        isValidBst: true,
        minimumElement: Math.min(
          currentNode.val,
          leftSubtreeInfo.minimumElement,
        ),
        maximumElement: Math.max(
          currentNode.val,
          rightSubtreeInfo.maximumElement,
        ),
        sumOfElements: currentSubtreeValueSum,
      };
    } else {
      return {
        isValidBst: false,
        minimumElement: 0,
        maximumElement: 0,
        sumOfElements: 0,
      };
    }
  }

  processNode(root);
  return maximumBstSum;
};
