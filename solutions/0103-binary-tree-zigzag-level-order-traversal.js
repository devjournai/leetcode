/**
 * Binary Tree Zigzag Level Order Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var zigzagLevelOrder = function (initialNode) {
  const finalResult = [];

  if (!initialNode) {
    return finalResult;
  }

  const nodeQueue = [initialNode];
  let isLeftToRight = true;

  while (nodeQueue.length > 0) {
    const levelSize = nodeQueue.length;
    const currentLevelValues = [];

    for (let idx = 0; idx < levelSize; idx++) {
      const processingNode = nodeQueue.shift();
      currentLevelValues.push(processingNode.val);

      if (processingNode.left) {
        nodeQueue.push(processingNode.left);
      }
      if (processingNode.right) {
        nodeQueue.push(processingNode.right);
      }
    }

    if (!isLeftToRight) {
      currentLevelValues.reverse();
    }

    finalResult.push(currentLevelValues);
    isLeftToRight = !isLeftToRight;
  }

  return finalResult;
};
