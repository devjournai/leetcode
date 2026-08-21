/**
 * Minimum Absolute Difference In Bst
 * Intuition: Inorder traversal of a BST is sorted, so the global minimum gap is the minimum of consecutive inorder values. An explicit stack does inorder without recursion.
 * Approach: 1. Walk left while pushing onto `nodeTraversalStack`. 2. Pop, compare with `previousNodeValue`, update `minAbsoluteDifference`. 3. Continue to the right child. Return the min gap.
 * Dry Run: BST 4 / 2 6, 2 has 1 and 3.
 *   - Inorder 1,2,3,4,6. Consecutive diffs 1,1,1,2. Return 1.
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
        currentCalculatedDifference
      );
    }
    previousNodeValue = stackPoppedNode.val;

    processingNode = stackPoppedNode.right;
  }

  return minAbsoluteDifference;
};
