/**
 * Count Complete Tree Nodes
 * Intuition: In a complete tree, if the left and right subtrees have equal left-spine height, the whole tree is perfect and has 2^(h+2)-1 nodes. Otherwise the right subtree is perfect and the left is counted recursively.
 * Approach: 1. Empty tree → 0. 2. Height = length of the left spine from a child (starting at -1). 3. If leftHeight === rightHeight, return (1 << (leftHeight+2)) - 1. 4. Else return 1 + (1 << (rightHeight+1)) - 1 + countNodes(left).
 * Dry Run: tree [1,2,3] (both children leaves).
 *   - Height(2)=0, height(3)=0, equal → (1 << 2) - 1 = 3.
 * Time Complexity: O((log N)^2)
 * Space Complexity: O(log N)
 */
var countNodes = function (rootNode) {
  if (rootNode === null) {
    return 0;
  }

  const calculateTreeDepth = (currentTreeNode) => {
    let depthCounter = -1;
    let depthTraversal = currentTreeNode;
    while (depthTraversal !== null) {
      depthTraversal = depthTraversal.left;
      depthCounter++;
    }
    return depthCounter;
  };

  let leftChildHeight = calculateTreeDepth(rootNode.left);
  let rightChildHeight = calculateTreeDepth(rootNode.right);

  if (leftChildHeight === rightChildHeight) {
    return (1 << (leftChildHeight + 2)) - 1;
  } else {
    let rightSubtreeTotal = (1 << (rightChildHeight + 1)) - 1;
    let leftSubtreeTotal = countNodes(rootNode.left);
    return 1 + rightSubtreeTotal + leftSubtreeTotal;
  }
};
