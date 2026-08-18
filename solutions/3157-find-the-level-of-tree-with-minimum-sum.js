/**
 * Find The Level Of Tree With Minimum Sum
 * Intuition: BFS level by level, sum node values, and remember the 1-indexed level with the smallest sum (earliest on ties).
 * Approach: 1. Queue the root. 2. For each level accumulate the sum and enqueue children. 3. Update answer when the sum is strictly smaller.
 * Dry Run:
 *   Tree 1 / \ 7 0 with further nodes: compare level sums and return the min level.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumLevel = function (root) {
  let minLevelIndex = 1;
  let minLevelSum = Infinity;
  const nodeQueue = [root];
  let currentLevel = 1;
  while (nodeQueue.length > 0) {
    const levelSize = nodeQueue.length;
    let levelSum = 0;
    for (let index = 0; index < levelSize; index++) {
      const currentNode = nodeQueue.shift();
      levelSum += currentNode.val;
      if (currentNode.left) {
        nodeQueue.push(currentNode.left);
      }
      if (currentNode.right) {
        nodeQueue.push(currentNode.right);
      }
    }
    if (levelSum < minLevelSum) {
      minLevelSum = levelSum;
      minLevelIndex = currentLevel;
    }
    currentLevel++;
  }
  return minLevelIndex;
};
