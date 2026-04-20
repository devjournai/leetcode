/**
 * Binary Tree Maximum Path Sum
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var maxPathSum = function (root) {
  let maximumPathValue = -Infinity;

  function findMaximumBranchContribution(processingNode) {
    if (!processingNode) {
      return 0;
    }

    let leftPathContribution = findMaximumBranchContribution(processingNode.left);
    let rightPathContribution = findMaximumBranchContribution(processingNode.right);

    leftPathContribution = Math.max(0, leftPathContribution);
    rightPathContribution = Math.max(0, rightPathContribution);

    let currentTraversalPathSum = processingNode.val + leftPathContribution + rightPathContribution;
    maximumPathValue = Math.max(maximumPathValue, currentTraversalPathSum);

    let highestChildContribution = Math.max(leftPathContribution, rightPathContribution);
    return processingNode.val + highestChildContribution;
  }

  findMaximumBranchContribution(root);

  return maximumPathValue;
};