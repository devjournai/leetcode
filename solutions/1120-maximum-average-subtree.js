/**
 * Maximum Average Subtree
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
      currentTreeNode.left,
    );
    const [rightChildrenSum, rightChildrenCount] = processSubtree(
      currentTreeNode.right,
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
