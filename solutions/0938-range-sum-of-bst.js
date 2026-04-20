/**
 * Range Sum Of Bst
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var rangeSumBST = function (root, low, high) {
  if (!root) {
    return 0;
  }

  let currentTotalSum = 0;
  const nodeExplorationStack = [root];

  while (nodeExplorationStack.length > 0) {
    const currentNodeForProcessing = nodeExplorationStack.pop();

    if (currentNodeForProcessing === null) {
      continue;
    }

    const nodeValueExtracted = currentNodeForProcessing.val;

    if (nodeValueExtracted >= low && nodeValueExtracted <= high) {
      currentTotalSum += nodeValueExtracted;
    }

    if (nodeValueExtracted > low) {
      nodeExplorationStack.push(currentNodeForProcessing.left);
    }

    if (nodeValueExtracted < high) {
      nodeExplorationStack.push(currentNodeForProcessing.right);
    }
  }

  return currentTotalSum;
};
