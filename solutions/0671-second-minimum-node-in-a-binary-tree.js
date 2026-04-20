/**
 * Second Minimum Node In A Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var findSecondMinimumValue = function (root) {
  if (!root) {
    return -1;
  }

  let overallMinimum = root.val;

  function processTreeForSecondMin(currentTreeNode) {
    if (!currentTreeNode) {
      return Infinity;
    }

    if (currentTreeNode.val > overallMinimum) {
      return currentTreeNode.val;
    }

    let firstCandidate = processTreeForSecondMin(currentTreeNode.left);
    let secondCandidate = processTreeForSecondMin(currentTreeNode.right);

    return Math.min(firstCandidate, secondCandidate);
  }

  let resultingSecondMinimum = processTreeForSecondMin(root);

  return resultingSecondMinimum === Infinity ? -1 : resultingSecondMinimum;
};
