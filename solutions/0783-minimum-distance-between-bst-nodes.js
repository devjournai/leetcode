/**
 * Minimum Distance Between Bst Nodes
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var minDiffInBST = function (rootNodeParam) {
  let minDifferenceValue = Infinity;
  let lastProcessedValue = null;
  let nodeStack = [];
  let currentTraversalNode = rootNodeParam;

  while (currentTraversalNode || nodeStack.length > 0) {
    while (currentTraversalNode) {
      nodeStack.push(currentTraversalNode);
      currentTraversalNode = currentTraversalNode.left;
    }

    let poppedNode = nodeStack.pop();

    if (lastProcessedValue !== null) {
      minDifferenceValue = Math.min(
        minDifferenceValue,
        poppedNode.val - lastProcessedValue,
      );
    }

    lastProcessedValue = poppedNode.val;
    currentTraversalNode = poppedNode.right;
  }

  return minDifferenceValue;
};
