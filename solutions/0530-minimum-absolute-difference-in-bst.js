/**
 * Minimum Absolute Difference In Bst
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var getMinimumDifference = function (root) {
  let minAbsoluteDifference = Infinity;
  let previousNodeValue = null;
  const nodeTraversalStack = [];
  let processingNode = root;

  while (processingNode !== null || nodeTraversalStack.length > 0) {
    while (processingNode !== null) {
      nodeTraversalStack.push(processingNode);
      processingNode = processingNode.left;
    }

    const stackPoppedNode = nodeTraversalStack.pop();

    if (previousNodeValue !== null) {
      const currentCalculatedDifference =
        stackPoppedNode.val - previousNodeValue;
      minAbsoluteDifference = Math.min(
        minAbsoluteDifference,
        currentCalculatedDifference,
      );
    }
    previousNodeValue = stackPoppedNode.val;

    processingNode = stackPoppedNode.right;
  }

  return minAbsoluteDifference;
};
