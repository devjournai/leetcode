/**
 * Diameter Of Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var diameterOfBinaryTree = function (root) {
  let currentMaximumDiameter = 0;

  const computeSubtreeDepth = (currentNode) => {
    if (!currentNode) {
      return 0;
    }

    const leftTreeDepth = computeSubtreeDepth(currentNode.left);
    const rightTreeDepth = computeSubtreeDepth(currentNode.right);

    const currentPathLength = leftTreeDepth + rightTreeDepth;
    currentMaximumDiameter = Math.max(
      currentMaximumDiameter,
      currentPathLength,
    );

    const maxChildDepth = Math.max(leftTreeDepth, rightTreeDepth);
    return maxChildDepth + 1;
  };

  computeSubtreeDepth(root);
  return currentMaximumDiameter;
};
