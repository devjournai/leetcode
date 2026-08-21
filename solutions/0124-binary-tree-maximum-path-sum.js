/**
 * Binary Tree Maximum Path Sum
 * Intuition: A path may bend through a node using both children, but the value returned to the parent can use only one child (plus the node), ignoring negative branches.
 * Approach: 1. Global max starts at -Infinity. 2. Recurse: null contributes 0. 3. Clamp each child gain at 0. 4. Update global with node + leftGain + rightGain. Return node + max(leftGain, rightGain).
 * Dry Run: [-10,9,20,null,null,15,7]. At 20, path 15+20+7=42 updates the global max. Root’s one-sided return is 20+15; 42 remains the answer.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var maxPathSum = function (root) {
  let maximumPathValue = -Infinity;

  function findMaximumBranchContribution(processingNode) {
    if (!processingNode) {
      return 0;
    }

    let leftPathContribution = findMaximumBranchContribution(
      processingNode.left
    );
    let rightPathContribution = findMaximumBranchContribution(
      processingNode.right
    );

    leftPathContribution = Math.max(0, leftPathContribution);
    rightPathContribution = Math.max(0, rightPathContribution);

    let currentTraversalPathSum =
      processingNode.val + leftPathContribution + rightPathContribution;
    maximumPathValue = Math.max(maximumPathValue, currentTraversalPathSum);

    let highestChildContribution = Math.max(
      leftPathContribution,
      rightPathContribution
    );
    return processingNode.val + highestChildContribution;
  }

  findMaximumBranchContribution(root);

  return maximumPathValue;
};
