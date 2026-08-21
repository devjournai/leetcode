/**
 * Minimum Distance Between Bst Nodes
 * Intuition: Inorder traversal of a BST yields sorted values, so the minimum gap is between some consecutive inorder pair. Walk iteratively with a stack.
 * Approach: 1. Push left spine onto `nodeStack`. 2. Pop `poppedNode`; if `lastProcessedValue` is set, update `minDifferenceValue` with `poppedNode.val - lastProcessedValue`. 3. Set last to current val and go to `poppedNode.right`. 4. Return `minDifferenceValue`.
 * Dry Run: tree 4 / 2 6 / 1 3.
 *   - Inorder 1,2,3,4,6. Gaps 1,1,1,2. Return 1.
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
        poppedNode.val - lastProcessedValue
      );
    }

    lastProcessedValue = poppedNode.val;
    currentTraversalNode = poppedNode.right;
  }

  return minDifferenceValue;
};
