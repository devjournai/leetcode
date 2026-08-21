/**
 * Smallest Subtree With All The Deepest Nodes
 * Intuition: Postorder: if left and right depths match, this node is the LCA of deepest leaves; else the deeper child's recorded root wins.
 * Approach: 1. `calculateSubtreeInfo` returns `{currentHeight, smallestDeepestRoot}`. Null → height 0, root null. 2. Equal heights → this node. 3. Else take the deeper child's root and height+1. 4. Return root field of the tree result.
 * Dry Run: Balanced children of 3 (5 and 1) same height → answer 3. If 5's subtree is deeper, answer is 5's deepest LCA (node 2 in the classic example).
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
