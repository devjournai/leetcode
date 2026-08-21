/**
 * Average Of Levels In Binary Tree
 * Intuition: BFS processes one depth at a time; the average is that level's value sum divided by its node count.
 * Approach: 1. If root is null, return []. 2. Queue starts with root. 3. For each level, dequeue `currentLevelSize` nodes, accumulate `sumOfCurrentLevel`, enqueue children. 4. Push sum/count onto `levelAverages`.
 * Dry Run: [3,9,20,null,null,15,7].
 *   - Level 3 → 3. Level 9,20 → 14.5. Level 15,7 → 11. Return [3, 14.5, 11].
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
