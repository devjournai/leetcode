/**
 * Count Complete Tree Nodes
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
