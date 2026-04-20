/**
 * Binary Tree Level Order Traversal II
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var levelOrderBottom = function (root) {
  if (!root) {
    return [];
  }

  const intermediateLevels = [];
  const bfsQueue = [root];

  while (bfsQueue.length > 0) {
    const levelSize = bfsQueue.length;
    const levelValues = [];

    for (let elementCounter = 0; elementCounter < levelSize; elementCounter++) {
      const currentNodeFromQueue = bfsQueue.shift();
      levelValues.push(currentNodeFromQueue.val);

      if (currentNodeFromQueue.left) {
        bfsQueue.push(currentNodeFromQueue.left);
      }
      if (currentNodeFromQueue.right) {
        bfsQueue.push(currentNodeFromQueue.right);
      }
    }
    intermediateLevels.push(levelValues);
  }

  return intermediateLevels.reverse();
};
