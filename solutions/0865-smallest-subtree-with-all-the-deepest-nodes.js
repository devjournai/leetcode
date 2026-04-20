/**
 * Smallest Subtree With All The Deepest Nodes
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var subtreeWithAllDeepest = function (root) {
  function calculateSubtreeInfo(currentTreeNode) {
    if (!currentTreeNode) {
      return { currentHeight: 0, smallestDeepestRoot: null };
    }

    const leftBranchOutcome = calculateSubtreeInfo(currentTreeNode.left);
    const rightBranchOutcome = calculateSubtreeInfo(currentTreeNode.right);

    const leftTreeHeight = leftBranchOutcome.currentHeight;
    const rightTreeHeight = rightBranchOutcome.currentHeight;

    if (leftTreeHeight === rightTreeHeight) {
      const calculatedHeight = leftTreeHeight + 1;
      const identifiedRoot = currentTreeNode;
      return {
        currentHeight: calculatedHeight,
        smallestDeepestRoot: identifiedRoot,
      };
    } else if (leftTreeHeight > rightTreeHeight) {
      const higherHeight = leftTreeHeight + 1;
      const selectedRoot = leftBranchOutcome.smallestDeepestRoot;
      return { currentHeight: higherHeight, smallestDeepestRoot: selectedRoot };
    } else {
      // rightTreeHeight > leftTreeHeight
      const overallHeight = rightTreeHeight + 1;
      const chosenRoot = rightBranchOutcome.smallestDeepestRoot;
      return { currentHeight: overallHeight, smallestDeepestRoot: chosenRoot };
    }
  }

  const finalResult = calculateSubtreeInfo(root);
  return finalResult.smallestDeepestRoot;
};
