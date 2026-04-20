/**
 * Binary Tree Right Side View
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var rightSideView = function (root) {
  if (!root) {
    return [];
  }

  const rightmostValues = [];
  const nodeProcessingQueue = [root];

  while (nodeProcessingQueue.length > 0) {
    let levelElementCount = nodeProcessingQueue.length;
    let currentNodeForLevel = null;

    for (
      let currentLevelIndex = 0;
      currentLevelIndex < levelElementCount;
      currentLevelIndex++
    ) {
      currentNodeForLevel = nodeProcessingQueue.shift();

      if (currentLevelIndex === levelElementCount - 1) {
        rightmostValues.push(currentNodeForLevel.val);
      }

      if (currentNodeForLevel.left) {
        nodeProcessingQueue.push(currentNodeForLevel.left);
      }

      if (currentNodeForLevel.right) {
        nodeProcessingQueue.push(currentNodeForLevel.right);
      }
    }
  }

  return rightmostValues;
};
