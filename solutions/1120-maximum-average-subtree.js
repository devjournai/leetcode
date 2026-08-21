/**
 * Maximum Average Subtree
 * Intuition: Every subtree’s average is (sum of node values)/(node count). A postorder return of (sum, count) lets each node compute its average and a global max.
 * Approach: 1. Recurse left and right. 2. sum = leftSum+rightSum+val, count = leftCount+rightCount+1. 3. Update max average. 4. Return [sum, count]; answer is the max seen.
 * Dry Run: 5 / 6 1. Subtree 6 avg 6; 1 avg 1; root (5+6+1)/3=4. Max 6.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var maximumAverageSubtree = function (root) {
  let highestAverage = 0;

  function processSubtree(currentTreeNode) {
    if (!currentTreeNode) {
      return [0, 0];
    }

    const [leftChildrenSum, leftChildrenCount] = processSubtree(
      currentTreeNode.left
    );
    const [rightChildrenSum, rightChildrenCount] = processSubtree(
      currentTreeNode.right
    );

    const accumulatedSum =
      leftChildrenSum + rightChildrenSum + currentTreeNode.val;
    const accumulatedCount = leftChildrenCount + rightChildrenCount + 1;

    const calculatedAverage = accumulatedSum / accumulatedCount;

    highestAverage = Math.max(highestAverage, calculatedAverage);

    return [accumulatedSum, accumulatedCount];
  }

  processSubtree(root);

  return highestAverage;
};
