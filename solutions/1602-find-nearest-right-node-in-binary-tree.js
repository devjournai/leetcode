/**
 * Find Nearest Right Node In Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findNearestRightNode = function (root, u) {
  if (!root) {
    return null;
  }

  const nodeAndLevelQueue = [[root, 0]];

  while (nodeAndLevelQueue.length > 0) {
    const currentQueueElement = nodeAndLevelQueue.shift();
    const processingNode = currentQueueElement[0];
    const processingLevel = currentQueueElement[1];

    if (processingNode === u) {
      if (nodeAndLevelQueue.length > 0) {
        const peekedElement = nodeAndLevelQueue[0];
        const peekedElementLevel = peekedElement[1];

        if (peekedElementLevel === processingLevel) {
          return peekedElement[0];
        }
      }
      return null;
    }

    const leftChildNode = processingNode.left;
    if (leftChildNode) {
      const leftChildEntry = [leftChildNode, processingLevel + 1];
      nodeAndLevelQueue.push(leftChildEntry);
    }

    const rightChildNode = processingNode.right;
    if (rightChildNode) {
      const rightChildEntry = [rightChildNode, processingLevel + 1];
      nodeAndLevelQueue.push(rightChildEntry);
    }
  }

  return null;
};
