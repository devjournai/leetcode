/**
 * Average Of Levels In Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var averageOfLevels = function (root) {
  if (!root) {
    return [];
  }

  const levelAverages = [];
  const nodeQueue = [root];

  while (nodeQueue.length > 0) {
    const currentLevelSize = nodeQueue.length;
    let sumOfCurrentLevel = 0;
    let countOfCurrentLevelNodes = 0;

    for (let idx = 0; idx < currentLevelSize; idx++) {
      const currentNode = nodeQueue.shift();
      sumOfCurrentLevel += currentNode.val;
      countOfCurrentLevelNodes++;

      if (currentNode.left) {
        nodeQueue.push(currentNode.left);
      }
      if (currentNode.right) {
        nodeQueue.push(currentNode.right);
      }
    }
    levelAverages.push(sumOfCurrentLevel / countOfCurrentLevelNodes);
  }

  return levelAverages;
};
